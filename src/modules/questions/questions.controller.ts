import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question';
import { Repository, Transaction } from 'typeorm';
import { Answer } from './entities/answer';

@Controller('questions')
export class QuestionsController {
  constructor(
    @InjectRepository(Question) private questions: Repository<Question>,
    @InjectRepository(Answer) private answers: Repository<Answer>,
  ) {}

  // Add config for database
  // Or use separate class
  // Loading entities

  // Role here
  // Policy will use at service
  @Get()
  async allQuestions() {
    // const question = await this.questions.findOne(2);
    // question.answers = await this.answers.find({ where: { questionId: 2 } });
    //const ability = this.abilityFactory.createForUser({});
    // ForbiddenError.from(ability).throwUnlessCan(Action.Read);
    return await this.questions.find({ relations: ['answers'] });
  }

  @Get('answers')
  async allAnswers() {
    return await this.answers.find({
      // where: { questionId: 1 },
      relations: ['question'],
    });
  }

  @Post()
  @Transaction()
  async store() {
    const question = { content: 'What your name' };
    const newQuestion = await this.questions.save(question, { transaction: false });

    const answer: Partial<Answer> = {
      content: 'Linh Pham',
      //questionId: newQuestion.id,
      question: newQuestion,
    };

    await this.answers.save(answer, { transaction: false });

    // https://github.com/typeorm/typeorm/issues/5694
    return await this.questions.findOne(newQuestion.id, {
      relations: ['answers'],
    });
  }
}
