import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import * as requestService from '../services/requestService';
import { createValidator } from '../validators/request';

const router = Router();

/**
 * POST /api/v1/suscribe
 */
router.post('/suscribe', createValidator, (req, res, next) => {
  requestService
    .createRequest(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
