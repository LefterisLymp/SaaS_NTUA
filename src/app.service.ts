import { Injectable } from '@nestjs/common'
import { Question} from "./questions/question.entity";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
