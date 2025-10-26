import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreferencesModule } from './preferences/preferences.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookSuggestionModule } from './book-suggestion/book-suggestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PreferencesModule,
    AuthModule,
    BookSuggestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
