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

}

export { SettingsController };