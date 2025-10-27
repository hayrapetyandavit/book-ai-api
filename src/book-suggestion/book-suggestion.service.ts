import { Injectable } from '@nestjs/common';
import { CreateBookSuggestionDto } from './dto/create-book-suggestion.dto';
import { UpdateBookSuggestionDto } from './dto/update-book-suggestion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AIProviderService } from './ai/ai-provider.service';
import { SuggestionStatus } from '@prisma/client';

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

  create(createBookSuggestionDto: CreateBookSuggestionDto) {
    return this.prisma.bookSuggestion.create({
      data: createBookSuggestionDto,
    });
  }

  findAll() {
    return this.prisma.bookSuggestion.findMany();
  }

  findOne(id: number) {
    return this.prisma.bookSuggestion.findUnique({ where: { id } });
  }

  update(id: number, updateBookSuggestionDto: UpdateBookSuggestionDto) {
    return this.prisma.bookSuggestion.update({
      where: { id },
      data: updateBookSuggestionDto,
    });
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
    // TODO: find better approach if users are too many
    for (const user of users) {
      const prefs = user.preferences;
      const aiSuggestions = await this.aiProvider.generateBookSuggestions({
        genres: prefs.genres,
        authors: prefs.authors,
        length: prefs.preferredBookLength,
        count: prefs.suggestionCount,
      });

      for (const suggestion of aiSuggestions) {
        await this.prisma.bookSuggestion.create({
          data: {
            userId: user.id,
            title: suggestion.title,
            author: suggestion.author,
            length: suggestion.length || null,
            status: SuggestionStatus.PENDING,
            // suggestedAt: new Date(), // TODO: set when cron send notification
          },
        });
      }

      // this.logger.log(
      //   `Generated ${aiSuggestions.length} suggestions for user ${user.id}`,
      // );
    }
  }
}
