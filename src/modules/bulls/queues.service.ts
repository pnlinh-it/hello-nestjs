import { Injectable } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';

type AddQueue = (queue: BullAdapter) => void;

@Injectable()
export class QueuesService {
  private serverAdapter = new ExpressAdapter();
  private readonly addQueue: AddQueue;

  constructor() {
    const bullBoard = createBullBoard({
      queues: [],
      serverAdapter: this.serverAdapter,
    });

    this.addQueue = bullBoard.addQueue;
  }

  addNewQueue(queue: BullAdapter) {
    this.addQueue(queue);
  }

  getServerAdapter() {
    return this.serverAdapter;
  }
}
