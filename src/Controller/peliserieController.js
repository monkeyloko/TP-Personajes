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
  
    
    DOCUMENTACION DE POSTMAN (?????)
*/




router.get('', Authenticate, async (req, res) => {
    const peliserie = await peliserieService.listadoPelicula(req.query.name, req.query.order);
    return res.status(200).json(peliserie);
});

router.post('',Authenticate,  async (req, res) => {
    const peliserie = await peliserieService.createPeliserie(req.body);
    const Calificacion = req.body.Calificacion
    if(Calificacion <1 || Calificacion > 5){
        return res.status(400).send
    } 
    return res.status(201).json(peliserie);
});

router.put('/:id',Authenticate,  async (req, res) => {
    const id = req.params.id;
    const Calificacion = req.body.Calificacion

    console.log(id);

    if(id != req.body.Id){
        return res.status(400).send();
    }
    if(Calificacion <1 || Calificacion > 5){
        return res.status(400).send();
    }
    const peliserie = await peliserieService.updatePeliserieById(Id, );
    return res.status(200).json(peliserie);
});

router.delete('/:id',Authenticate,  async (req, res) => {
    const id = req.params.id;
    const peliserie = await peliserieService.deletePeliserieById(id);
    return res.status(200).json(peliserie);
});

router.get('/:id',Authenticate,  async (req, res) => {
    const id = req.params.id;
    if(id < 1){
        return res.status(400).send();
    }
    const peliserie = await peliserieService.detallePeliserie(id);
    if(!peliserie){
        return res.status(404).send();
    }
    return res.status(200).json(peliserie);
});


export default router;