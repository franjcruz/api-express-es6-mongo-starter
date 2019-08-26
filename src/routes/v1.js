import { Router } from 'express';

import requestsController from '../controllers/requests';

/**
 * Contains all API routes for the v1 path.
 */
let router = Router();

router.use('/', requestsController);

export default router;
