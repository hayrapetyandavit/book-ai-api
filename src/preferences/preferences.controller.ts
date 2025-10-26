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
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { JwtAuthGuard } from 'src/auth/utils/Guards';
import { ConfigService } from '@nestjs/config';
import { PreferenceDto } from './dto/preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(
    private readonly preferencesService: PreferencesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get()
  findAll() {
    return this.preferencesService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    // serialization example
    const preference = await this.preferencesService.findOne(+id);
    return new PreferenceDto(preference);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(+id);
  }
}
