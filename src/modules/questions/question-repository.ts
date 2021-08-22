import { EntityRepository } from 'typeorm';
import { Question } from './entities/question';
import { BaseRepository } from '../../abs/base-repository';

@EntityRepository(Question)
export class QuestionRepository extends BaseRepository<Question> {}
