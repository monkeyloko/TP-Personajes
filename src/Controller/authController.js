import { Router } from 'express';
import { getSignedToken } from "../services/authService.js"
const router = Router();
router.get('', async (req, res) => {
    return res.json(getSignedToken());
});
export default router;