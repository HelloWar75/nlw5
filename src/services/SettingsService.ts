import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsServices {

  private settingRepository: Repository<Setting>;

  constructor() {
    this.settingRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {

    const userAlreadyExists = await this.settingRepository.findOne({ username: username });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = this.settingRepository.create({
      chat,
      username
    });

    await this.settingRepository.save(settings);

    return settings;

  }

  async findByUsername(username: string) {
    const settings = await this.settingRepository.findOne({
      username,
    });

    return settings;
  }

  async update(username: string, chat: boolean) {
    await this.settingRepository.createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      }).execute();
  }

}

export { SettingsServices };