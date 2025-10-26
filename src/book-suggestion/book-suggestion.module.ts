import { Module } from '@nestjs/common';
import { BookSuggestionService } from './book-suggestion.service';
import { BookSuggestionController } from './book-suggestion.controller';

@Module({
  controllers: [BookSuggestionController],
  providers: [BookSuggestionService],
})
export class BookSuggestionModule {}
