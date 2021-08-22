import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { Quiz } from './entities/quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends BaseRepository<Quiz> {}
