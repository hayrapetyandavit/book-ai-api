import { PartialType } from '@nestjs/mapped-types';
import { CreateBookSuggestionDto } from './create-book-suggestion.dto';

export class UpdateBookSuggestionDto extends PartialType(CreateBookSuggestionDto) {}
