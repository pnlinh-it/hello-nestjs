import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question';
import { QuizQuestionController } from './quiz-question.controller';
import { AttachQuestions } from './actions/attach-questions';

@Module({
  imports: [TypeOrmModule.forFeature([QuizQuestion])],
  providers: [QuizQuestionService, AttachQuestions],
  controllers: [QuizQuestionController],
})
export class QuizQuestionModule {}
