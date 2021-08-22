import { Body, Controller, Post } from '@nestjs/common';
import { AttemptsDto } from './dto/attempts.dto';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private quizQuestionService: QuizQuestionService) {}

  @Post('')
  store(@Body() attempts: CreateQuizQuestionDto) {
    return this.quizQuestionService.attachQuestions(attempts);
  }

  @Post('attempt')
  attempt(@Body() attempts: AttemptsDto) {
    return this.quizQuestionService.attempt(attempts);
  }
}
