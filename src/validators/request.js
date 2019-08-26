import Joi from 'joi';

import validate from '../utils/validate';

const SCHEMA = {
  tx_id: Joi.string()
    .label('tx_id')
    .max(255)
    .required(),
  cryptocurrency: Joi.string()
    .label('cryptocurrency')
    .max(255)
    .required(),
  confirmations: Joi.number()
    .label('confirmations')
    .integer()
    .required(),
  webhook: Joi.string()
    .label('webhook')
    .max(255)
    .required()
};

/**
 * Validate create/update request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function createValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

export { createValidator };
