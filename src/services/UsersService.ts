import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UserService {

  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {

    const userExists = await this.userRepository.findOne({ email: email });

    if (userExists) {
      return userExists;
    }

    const user = this.userRepository.create({
      email,
    });

    await this.userRepository.save(user);

    return user;

  }

}

export { UserService };