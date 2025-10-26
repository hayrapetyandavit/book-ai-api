import { Test, TestingModule } from '@nestjs/testing';
import { BookSuggestionService } from './book-suggestion.service';

describe('BookSuggestionService', () => {
  let service: BookSuggestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookSuggestionService],
    }).compile();

    service = module.get<BookSuggestionService>(BookSuggestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
