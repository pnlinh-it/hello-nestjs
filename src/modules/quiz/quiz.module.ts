import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '../questions/question-repository';
import { QuizRepository } from './quiz-repository';
import { QuizQuestionRepository } from '../quiz-question/quiz-question-repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository, QuestionRepository, QuizQuestionRepository])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
