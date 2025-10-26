import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookSuggestionService } from './book-suggestion.service';
import { BookSuggestionController } from './book-suggestion.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BookSuggestionController],
  providers: [BookSuggestionService],
})
export class BookSuggestionModule {}
