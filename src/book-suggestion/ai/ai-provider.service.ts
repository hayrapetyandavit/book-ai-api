import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { BookLength } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AIProviderService {
  private readonly logger = new Logger(AIProviderService.name);
  private readonly openAiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openAiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async generateBookSuggestions(preferences: {
    genres: string[];
    authors: string[];
    length?: string;
    count: number;
  }) {
    const prompt = `
    You are a book recommendation assistant.
    Suggest ${preferences.count} books that match the following preferences:

    Genres: ${preferences.genres.join(', ')}
    Favorite authors: ${preferences.authors.join(', ')}
    Preferred length: ${preferences.length || 'any length'}

    Return a JSON array like:
    [
      { "title": "Book Title", "author": "Author Name", "length": "book length", "reason": "Why this fits" }
    ]
    `;

    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openAiKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    try {
      const text = data.choices?.[0]?.message?.content || '[]';
      return JSON.parse(text);
    } catch (error) {
      this.logger.error('Failed to parse AI response', error);
      return [];
    }
  }
}
