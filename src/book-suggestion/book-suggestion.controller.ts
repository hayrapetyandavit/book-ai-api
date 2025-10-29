import { Controller, Get } from '@nestjs/common';
import { BookSuggestionService } from './book-suggestion.service';

@Controller('book-suggestion')
export class BookSuggestionController {
  constructor(private readonly bookSuggestionService: BookSuggestionService) {}

  @Get()
  findOne() {
    return this.bookSuggestionService.generateForFrequency(7);
  }
}
