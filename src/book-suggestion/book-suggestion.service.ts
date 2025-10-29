import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AIProviderService } from './ai/ai-provider.service';
import { BookLength, SuggestionStatus } from '@prisma/client';

// TODO: move to the types/enums or prisma(from prisma can use UI too)
export enum Frequency {
  WEEKLY = 7,
  MONTHLY = 30,
}

@Injectable()
export class BookSuggestionService {
  constructor(
    private prisma: PrismaService,
    private readonly aiProvider: AIProviderService,
  ) {}

  findAll() {
    return this.prisma.bookSuggestion.findMany();
  }

  findOne(id: number) {
    return this.prisma.bookSuggestion.findUnique({ where: { id } });
  }

  async generateForFrequency(frequency: Frequency) {
    const users = await this.prisma.user.findMany({
      where: {
        preferences: {
          suggestionFrequency: frequency,
        },
      },
      include: {
        preferences: true,
      },
    });

    if (!users.length) return;
    // Limit concurrency to avoid overwhelming AI API
    const CONCURRENCY = 5;
    const chunks: (typeof users)[] = [];

    for (let i = 0; i < users.length; i += CONCURRENCY) {
      chunks.push(users.slice(i, i + CONCURRENCY));
    }

    for (const chunk of chunks) {
      // Process each chunk in parallel
      await Promise.all(
        chunk.map(async (user) => {
          const prefs = user.preferences;
          const suggestions =
            await this.aiProvider.generateBookSuggestions(prefs);
          console.log(suggestions, 'suggestions');
          if (!suggestions.length) return;

          // Q: where should be suggestedAt? as create timestamp or whe status updates to seen
          await this.prisma.bookSuggestion.createMany({
            data: suggestions.map((s) => ({
              userId: user.id,
              title: s.title,
              author: s.author,
              length: this.getBookLengthCategory(s.length),
              status: SuggestionStatus.PENDING,
            })),
          });
        }),
      );
    }
  }

  // TODO: move to utils
  private getBookLengthCategory(pages: number): BookLength {
    if (pages < 200) return BookLength.SHORT;
    if (pages <= 400) return BookLength.MEDIUM;
    if (pages <= 700) return BookLength.LONG;
    return BookLength.EPIC;
  }
}
