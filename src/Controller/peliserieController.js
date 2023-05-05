import { Router } from 'express';
import { PeliSerieService } from '../services/PeliSerieService.js';
const router = Router();
const peliserieService = new PeliSerieService();

router.get('', async (req, res) => {
  const peliserie = await peliserieService.getPeliserie();
  return res.status(200).json(peliserie);
});
router.get('/:id', async (req, res) => {
    const peliserie = await peliserieService.getPeliserieById(req.params.id);
    return res.status(200).json(peliserie);
});
router.post('', async (req, res) => {
    const peliserie = await peliserieService.createPeliserie(req.body);
    return res.status(201).json(peliserie);
});
router.put('/:id', async (req, res) => {
    const peliserie = await peliserieService.updatePeliserieById(req.body);
    return res.status(200).json(peliserie);
});
router.delete('/:id', async (req, res) => {
    const peliserie = await peliserieService.deletePeliserieById(req.params.id);
    return res.status(200).json(peliserie);
});
export default router;