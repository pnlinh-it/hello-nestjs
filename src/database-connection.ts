import { M1Service } from './modules/module1/m1.service';

export class DatabaseConnection {
  constructor(public m1Service: M1Service) {
    console.log('dd');
  }
}
