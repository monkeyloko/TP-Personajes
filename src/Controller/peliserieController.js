import { Router } from 'express';
import express from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PeliSerieService } from '../services/PeliSerieService.js';
const router = Router();
const peliserieService = new PeliSerieService();
const app = express();
app.use(express.json());
/*
    Hacer validaciones de status

        Hacer validaciones de status

            Hacer validaciones de status

                Hacer validaciones de status

                    Hacer validaciones de status
            
                Hacer validaciones de status

            Hacer validaciones de status

        Hacer validaciones de status

    Hacer validaciones de status
    
*/
router.get('', Authenticate, async (req, res) => {
    const peliserie = await peliserieService.listadoPelicula();
    return res.status(200).json(peliserie);
});

router.post('',Authenticate,  async (req, res) => {
    const peliserie = await peliserieService.createPeliserie(req.body);
    return res.status(201).json(peliserie);
});

router.put('/:id',Authenticate,  async (req, res) => {
    const peliserie = await peliserieService.updatePeliserieById(req.body);
    return res.status(200).json(peliserie);
});

router.delete('/:id',Authenticate,  async (req, res) => {
    const peliserie = await peliserieService.deletePeliserieById(req.params.id);
    return res.status(200).json(peliserie);
});

router.get('/:id',Authenticate,  async (req, res) => {
    const peliserie = await peliserieService.detallePeliserieById(req.params.id);
    return res.status(200).json(peliserie);
});


export default router;