import { Router } from 'express';

import requestController from '../controllers/request';

/**
 * Contains all API routes for the v1 path.
 */
let router = Router();

router.use('/', requestController);

export default router;
