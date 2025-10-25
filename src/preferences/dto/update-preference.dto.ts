import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreatePreferenceDto } from './create-preference.dto';

export class UpdatePreferenceDto extends PartialType(
  OmitType(CreatePreferenceDto, ['userId'] as const),
) {}
