import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PreferenceDto {
  @Expose() // include in output
  id: number;

  @Expose()
  genres: string[];

  constructor(partial: Partial<PreferenceDto>) {
    Object.assign(this, partial);
  }
}
