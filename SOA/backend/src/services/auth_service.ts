import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";

@Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async create(data: any): Promise<User> {
      return this.userRepository.save(data)
    }

    async findOne(condition: any): Promise<User>{
      return this.userRepository.findOne(condition);
    }
}
