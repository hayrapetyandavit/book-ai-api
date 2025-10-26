import { Test, TestingModule } from '@nestjs/testing';
import { BookSuggestionController } from './book-suggestion.controller';
import { BookSuggestionService } from './book-suggestion.service';

describe('BookSuggestionController', () => {
  let controller: BookSuggestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookSuggestionController],
      providers: [BookSuggestionService],
    }).compile();

    controller = module.get<BookSuggestionController>(BookSuggestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
