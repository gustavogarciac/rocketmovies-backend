const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const ratingLimits = rating <= 5 && rating >= 0;
    if (!ratingLimits) {
      throw new AppError("A nota do filme deve estar avaliada entre 0 e 5.");
    }

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((tag) => {
      return {
        movie_id,
        user_id,
        name: tag,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.status(201).json({ message: "Filme criado com sucesso." });
  }

  async update(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id, user_id } = request.params;

    const movie = await knex("movies").where({ id }).first();

    movie.title = title ?? movie.title;
    movie.description = description ?? movie.description;
    movie.rating = rating ?? movie.rating;

    if (tags && tags.length !== 0) {
      await knex("tags").where({ movie_id: id }).delete();
      const tagsInsert = tags.map((tag) => {
        return {
          user_id,
          movie_id: id,
          name: tag,
        };
      });
      await knex("tags").insert(tagsInsert);
    }

    await knex("movies").where({ id }).update(movie);

    return response
      .status(200)
      .json({ message: "Filme atualizado com sucesso!" });
  }

  async show(request, response) {
    const { id } = request.params;
    const movie = await knex("movies").where({ id }).first();

    if (!movie) {
      throw new AppError("Não foi possível encontrar o filme!", 404);
    }

    return response.status(200).json(movie);
  }

  async index(request, response) {
    const { title } = request.query;

    const movies = await knex("movies")
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    const moviesWithTags = await Promise.all(
      movies.map(async (movie) => {
        const moviesTags = await knex("tags").where({ movie_id: movie.id });

        return {
          ...movie,
          tags: moviesTags,
        };
      })
    );

    return response.status(200).json(moviesWithTags);
  }
}

module.exports = MoviesController;