import { Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from '../entities/quiz-question';
import { Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class AttachQuestions {
  constructor(@InjectRepository(QuizQuestion) private quizQuestions: Repository<QuizQuestion>) {}

  async execute(payload: CreateQuizQuestionDto) {
    const requestIds = payload.questionIds;

    const currentIds = await this.currentQuestionIds();

    const diffIds = requestIds.filter((id) => !currentIds.includes(id));

    const quizQuestions = diffIds.map((questionId) => QuizQuestion.create(1, questionId));

    await this.quizQuestions
      .createQueryBuilder()
      .insert()
      .values(quizQuestions)
      .updateEntity(false)
      .execute();

    return diffIds;
  }

  private async currentQuestionIds() {
    const option: FindManyOptions<QuizQuestion> = {
      select: ['questionId'],
      where: { quizId: 1 },
    };

    const quizQuestions = await this.quizQuestions.find(option);

    return quizQuestions.map((quizQuestion) => quizQuestion.questionId);
  }
}
