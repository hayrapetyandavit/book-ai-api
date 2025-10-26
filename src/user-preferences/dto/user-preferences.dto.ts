import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserPreferenceDto {
  @Expose()
  id: number;

  @Expose()
  genres: string[];

  constructor(partial: Partial<UserPreferenceDto>) {
    Object.assign(this, partial);
  }
}
