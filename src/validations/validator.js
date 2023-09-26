const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string(),
});

const mongoIdSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string().length(12), Joi.string().length(24)),
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().positive().optional(),
  perPage: Joi.number().integer().positive().optional(),
});

exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

exports.validateUserId = (req, res, next) => {
  const { error } = mongoIdSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: "id not valid" });
  }
  next();
};

exports.validateList = (req, res, next) => {
  let { page = 1, perPage = 1 } = req.query;
  page = Number(page);
  perPage = Number(perPage);
  const { error } = paginationSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ error: "page and perPage must be positive if supplied" });
  }
  req.query = { page, perPage };
  next();
};
