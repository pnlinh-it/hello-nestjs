import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question';
import { In, Like, Repository } from 'typeorm';
import { Answer } from './entities/answer';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability-factory';
import { ForbiddenError } from '@casl/ability';
import { Article } from '../../auth/casl/article';
import { Action } from '../../auth/casl/action';

@Controller('questions')
export class QuestionsController {
  constructor(
    @InjectRepository(Question) private questions: Repository<Question>,
    @InjectRepository(Answer) private answers: Repository<Answer>,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  // Add config for database
  // Or use separate class
  // Loading entities

  @Get()
  // Role here
  // Policy will use at service
  //
  async allQuestions() {
    const question = await this.questions.findOne(2);
    question.answers = await this.answers.find({ where: { questionId: 2 } });
    //const ability = this.abilityFactory.createForUser({});
    // ForbiddenError.from(ability).throwUnlessCan(Action.Read);
    return '';
    // return await this.questions.find({ relations: ['answers'] });
  }

  @Get('answers')
  async allAnswers() {
    return await this.answers.find({
      where: { questionId: 1 },
      relations: ['question'],
    });
  }

  @Post()
  async store() {
    const question = { content: 'What your name' };
    const newQuestion = await this.questions.save(question);

    const answer: Partial<Answer> = {
      content: 'Linh Pham',
      questionId: newQuestion.id,
    };

    await this.answers.save(answer);

    return await this.questions.findOne({
      where: { id: newQuestion.id },
      relations: ['answers'],
    });
  }
}
