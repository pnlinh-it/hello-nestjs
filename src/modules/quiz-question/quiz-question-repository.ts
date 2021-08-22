import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { QuizQuestion } from './entities/quiz-question';

@EntityRepository(QuizQuestion)
export class QuizQuestionRepository extends BaseRepository<QuizQuestion> {}
