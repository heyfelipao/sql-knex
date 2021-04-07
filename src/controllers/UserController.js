const knex = require('../helpers/Database');

module.exports = {
  async index(req, res, next) {
    try {
      const results = await knex('users').where('deleted_at', null);

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const { username } = req.body;
      await knex('users').insert({
        username
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { username } = req.body;
      const { id } = req.params;
      await knex('users')
        .update({ username })
        .where({ id });

      return res.send();
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      
      await knex('users')
        .where({ id })
        .update('deleted_at', new Date());

      return res.send();
    } catch (error) {
      next(error);
    }
  }
}