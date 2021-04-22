import { Request, Response } from "express";
import { SettingsServices } from "../services/SettingsService";

class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingService = new SettingsServices();

    try {
      const settings = await settingService.create({ chat, username });
      return response.json(settings);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;
    const settingService = new SettingsServices();
    const settings = await settingService.findByUsername(username);
    return response.json(settings)
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingService = new SettingsServices();

    const settings = await settingService.update(username, chat);

    return response.json(settings)
  }

}

export { SettingsController };