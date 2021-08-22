import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question';
import { InjectRepository } from '@nestjs/typeorm';
import { AttemptsDto } from './dto/attempts.dto';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { AttachQuestions } from './actions/attach-questions';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion) private quizQuestions: Repository<QuizQuestion>,
    private attachQuestion: AttachQuestions,
  ) {}

  attempt(attempts: AttemptsDto) {
    return attempts;
  }

  async attachQuestions(payload: CreateQuizQuestionDto) {
    return this.attachQuestion.execute(payload);
  }
}
