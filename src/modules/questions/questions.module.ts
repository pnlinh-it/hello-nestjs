import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer';
import { Question } from './entities/question';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
