const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const hashedPassword = await hash(password, 8);

    const emailAlreadyInUse = await knex("users").where({ email }).first();
    if (emailAlreadyInUse) {
      throw new AppError("Este email já está em utilização.");
    }
    const minimumPasswordLength = password.length >= 6;
    if (!minimumPasswordLength) {
      throw new AppError("A senha deve possuir ao menos 6 caracteres.");
    }

    await knex("users").insert({ name, email, password: hashedPassword });
    return response.json({ message: "Cadastro finalizado com sucesso." });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, oldPassword, newPassword } = request.body;

    const user = await knex("users").where({ id }).first();

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    const matchedPassword = await compare(oldPassword, user.password);
    if (!matchedPassword) {
      throw new AppError("A senha antiga não confere!");
    }

    user.password = await hash(newPassword, 8);

    await knex("users").where({ id }).update(user);

    return response
      .status(200)
      .json({ message: "Perfil atualizado com sucesso!" });
  }
}

module.exports = UsersController;
