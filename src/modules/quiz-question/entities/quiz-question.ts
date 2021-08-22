import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Question } from '../../questions/entities/question';

@Entity('quiz_question')
export class QuizQuestion {
  @Primary()
  id: number;

  @Column({ name: 'quiz_id', type: 'int', unsigned: true })
  quizId: number;

  @Column({ name: 'question_id', type: 'int', unsigned: true })
  questionId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  // https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495
  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  static create(quizId: number, questionId: number): Partial<QuizQuestion> {
    return {
      questionId: questionId,
      quizId: quizId,
    };
  }
}
