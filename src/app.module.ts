import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LearningController } from './learning/learning.controller';

@Module({
  imports: [],
  controllers: [AppController, LearningController],
  providers: [AppService],
})
export class AppModule {}
