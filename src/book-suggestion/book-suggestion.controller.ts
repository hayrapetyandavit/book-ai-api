import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookSuggestionService } from './book-suggestion.service';
import { CreateBookSuggestionDto } from './dto/create-book-suggestion.dto';
import { UpdateBookSuggestionDto } from './dto/update-book-suggestion.dto';

@Controller('book-suggestion')
export class BookSuggestionController {
  constructor(private readonly bookSuggestionService: BookSuggestionService) {}

  @Post()
  create(@Body() createBookSuggestionDto: CreateBookSuggestionDto) {
    return this.bookSuggestionService.create(createBookSuggestionDto);
  }

  @Get()
  findAll() {
    return this.bookSuggestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookSuggestionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookSuggestionDto: UpdateBookSuggestionDto) {
    return this.bookSuggestionService.update(+id, updateBookSuggestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookSuggestionService.remove(+id);
  }
}
