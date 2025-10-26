import { Injectable } from '@nestjs/common';
import { CreateBookSuggestionDto } from './dto/create-book-suggestion.dto';
import { UpdateBookSuggestionDto } from './dto/update-book-suggestion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookSuggestionService {
  constructor(private prisma: PrismaService) {}

  create(createBookSuggestionDto: CreateBookSuggestionDto) {
    return this.prisma.bookSuggestion.create({
      data: createBookSuggestionDto,
    });
  }

  findAll() {
    return this.prisma.bookSuggestion.findMany();
  }

  findOne(id: number) {
    return this.prisma.bookSuggestion.findUnique({ where: { id } });
  }

  update(id: number, updateBookSuggestionDto: UpdateBookSuggestionDto) {
    return this.prisma.bookSuggestion.update({
      where: { id },
      data: updateBookSuggestionDto,
    });
  }
}
