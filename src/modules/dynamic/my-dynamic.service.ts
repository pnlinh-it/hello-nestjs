import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTION } from '../../constant/constant';

@Injectable()
export class MyDynamicService {
  constructor(@Inject(CONFIG_OPTION) private readonly option) {
    console.log(option);
  }
}
