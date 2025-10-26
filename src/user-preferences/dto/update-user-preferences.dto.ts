import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserPreferenceDto } from './create-user-preferences.dto';

export class UpdateUserPreferenceDto extends PartialType(
  OmitType(CreateUserPreferenceDto, ['userId'] as const),
) {}
