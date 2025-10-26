import { BookLength } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserPreferenceDto {
  @IsString()
  userId: number;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsOptional()
  @IsEnum(BookLength)
  preferredBookLength?: BookLength;

  @IsInt()
  @Min(1)
  suggestionFrequency: number;

  @IsInt()
  @Min(1)
  suggestionCount: number;
}
