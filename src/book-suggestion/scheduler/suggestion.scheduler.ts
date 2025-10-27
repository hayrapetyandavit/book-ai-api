import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BookSuggestionService } from '../book-suggestion.service';
import { Frequency } from '../book-suggestion.service';

// TODO: temporary scheduler, later should use external job scheduler like Bull
@Injectable()
export class SuggestionScheduler {
  constructor(private readonly suggestionService: BookSuggestionService) {}

  @Cron('0 8 * * 0') // every Sunday 8 AM
  async weeklySuggestions() {
    await this.suggestionService.generateForFrequency(Frequency.WEEKLY);
  }

  @Cron('0 8 1 * *') // first day of month
  async monthlySuggestions() {
    await this.suggestionService.generateForFrequency(Frequency.MONTHLY);
  }
}
