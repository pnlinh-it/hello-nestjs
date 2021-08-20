import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questions: Repository<Question>,
    @InjectRepository(Answer) private answers: Repository<Answer>,
  ) {}
}
