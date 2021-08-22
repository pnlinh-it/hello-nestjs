import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizQuestion } from '../quiz-question/entities/quiz-question';
import { QuestionRepository } from '../questions/question-repository';
import { QuizRepository } from './quiz-repository';
import { QuizQuestionRepository } from '../quiz-question/quiz-question-repository';

@Injectable()
export class QuizService {
  constructor(
    private quizzes: QuizRepository,
    private questions: QuestionRepository,
    private quizQuestions: QuizQuestionRepository,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const quizId = await this.quizzes.insertGetId(createQuizDto);

    const questions = createQuizDto.questions || [];
    if (questions.length > 0) {
      const questionIds = [];
      for (const question of questions) {
        questionIds.push(await this.questions.insertGetId(question));
      }

      const quizQuestions = questionIds.map((questionId) =>
        QuizQuestion.create(quizId, questionId),
      );

      await this.quizQuestions.insertGetId(quizQuestions);
    }

    return this.quizzes.findOne(quizId, {
      relations: ['quizQuestions', 'quizQuestions.question'],
    });
  }

  findAll() {
    return this.quizzes.find();
  }

  findOne(id: number) {
    return this.quizzes.findOneOrFail(id, {
      relations: ['quizQuestions', 'quizQuestions.question'],
    });
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const newQuiz = await this.quizzes.preload({ ...updateQuizDto, id: id });

    if (!newQuiz) {
      throw new NotFoundException();
    }

    // return this.quizzes.update(newQuiz.id, newQuiz);
    return this.quizzes.save(newQuiz, { transaction: false });
  }

  remove(id: number) {
    return this.quizzes.delete(id);
  }
}
