import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPreferences } from '@prisma/client';
import { catchError, firstValueFrom } from 'rxjs';

const AI_URL = 'http://localhost:4891/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

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

  async generateBookSuggestions(preferences: UserPreferences): Promise<
    {
      title: string;
      author: string;
      length: number;
    }[]
  > {
    // "reason": "Why this fits"
    const prompt = `
        You are a book recommendation assistant.

        User preferences:
        - Genres: ${preferences.genres.join(', ')}
        - Favorite authors: ${preferences.authors.join(', ')}
        - Preferred length: ${preferences.preferredBookLength || 'any length'}

        Return exactly ${preferences.suggestionCount} recommendation${preferences.suggestionCount > 1 ? 's' : ''}.

        Respond with ONLY valid JSON — no comments, no code blocks, no text before or after.
        Every object must be wrapped in an array like:
        [
            { "title": "Book Title", "author": "Author Name", "length": 350 }
        ]
        If you cannot produce valid JSON, return an empty array [].
    `;

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          AI_URL,
          {
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 500,
          },
          // {
          //   headers: {
          //     Authorization: `Bearer ${this.openAiKey}`,
          //     'Content-Type': 'application/json',
          //   },
          // },
        )
        .pipe(
          catchError((e) => {
            this.logger.error(e.message);
            this.logger.error(e.response?.data);
            // TODO: implement InterceptableError
            throw new Error(e);
          }),
        ),
    );

    const content = data.choices[0].message?.content || '[]';

    try {
      return JSON.parse(content);
    } catch (e) {
      this.logger.error('Failed to parse AI response', e);
      // TODO: implement InterceptableError
      throw new Error('Failed to parse AI response');
    }
  }
}
