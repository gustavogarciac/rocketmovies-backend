const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const knex = require("../database/knex");

class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado!", 401);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFileName);
    user.avatar = filename;

    await knex("users").where({ id: user_id }).update(user);
    return response.json(user);
  }
}

module.exports = UsersAvatarController;
