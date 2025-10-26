import { IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { BookLength } from '@prisma/client';

export class CreateBookSuggestionDto {
  @IsInt()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsEnum(BookLength)
  length?: BookLength;
}
