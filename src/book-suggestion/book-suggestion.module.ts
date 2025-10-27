import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookSuggestionService } from './book-suggestion.service';
import { BookSuggestionController } from './book-suggestion.controller';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { SuggestionScheduler } from './scheduler/suggestion.scheduler';
import { AIProviderService } from './ai/ai-provider.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule, HttpModule, ScheduleModule.forRoot()],
  controllers: [BookSuggestionController],
  providers: [
    BookSuggestionService,
    SuggestionScheduler,
    AIProviderService,
    PrismaService,
  ],
})
export class BookSuggestionModule {}
