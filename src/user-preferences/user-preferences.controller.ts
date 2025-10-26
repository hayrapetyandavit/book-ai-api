import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preferences.dto';
import { JwtAuthGuard } from 'src/auth/utils/Guards';
import { UserPreferenceDto } from './dto/user-preferences.dto';

@Controller('user-preferences')
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Post()
  create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferencesService.create(createUserPreferenceDto);
  }

  @Get()
  findAll() {
    return this.userPreferencesService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    // serialization example
    const preference = await this.userPreferencesService.findOne(+id);
    return new UserPreferenceDto(preference);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferencesService.update(+id, updateUserPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPreferencesService.remove(+id);
  }
}
