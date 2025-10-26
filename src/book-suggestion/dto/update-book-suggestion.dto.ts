import { PartialType } from '@nestjs/mapped-types';
import { CreateBookSuggestionDto } from './create-book-suggestion.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { SuggestionStatus } from '@prisma/client';

export class UpdateBookSuggestionDto extends PartialType(
  CreateBookSuggestionDto,
) {
  @IsOptional()
  @IsEnum(SuggestionStatus)
  status?: SuggestionStatus;
}
