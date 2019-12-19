import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import * as requestsService from '../services/requestsService';
import { createValidator } from '../validators/request';

const router = Router();

/**
 * POST /api/v1/suscribe
 */
router.post('/suscribe', createValidator, (req, res, next) => {
  requestsService
    .createRequest(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
