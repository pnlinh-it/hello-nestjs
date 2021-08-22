import { CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { NullablString } from '../../../decorators/typeorm/nullable-string';
import { QuizQuestion } from '../../quiz-question/entities/quiz-question';

@Entity('quizzes')
export class Quiz {
  @Primary()
  id: number;

  @String('name')
  name: string;

  @NullablString('description')
  description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  // https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495
  @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.quiz)
  quizQuestions: QuizQuestion[];
}
