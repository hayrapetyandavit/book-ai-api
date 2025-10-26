import { Injectable } from '@nestjs/common';
import { CreateBookSuggestionDto } from './dto/create-book-suggestion.dto';
import { UpdateBookSuggestionDto } from './dto/update-book-suggestion.dto';

@Injectable()
export class BookSuggestionService {
  create(createBookSuggestionDto: CreateBookSuggestionDto) {
    return 'This action adds a new bookSuggestion';
  }

  findAll() {
    return `This action returns all bookSuggestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookSuggestion`;
  }

  update(id: number, updateBookSuggestionDto: UpdateBookSuggestionDto) {
    return `This action updates a #${id} bookSuggestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookSuggestion`;
  }
}
