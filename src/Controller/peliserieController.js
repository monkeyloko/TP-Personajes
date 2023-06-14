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

router.post('', Authenticate, async (req, res) => {
    const peliserie = await peliserieService.createPeliserie(req.body);
    const Calificacion = req.body.Calificacion
    if(Calificacion <1 || Calificacion > 5){
        return res.status(400).send
    } 
    return res.status(201).json(peliserie);
});

router.put('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if(id != req.body.Id){
        return res.status(400).send();
    }
    const Calificacion = req.body.Calificacion
    if(Calificacion<1 || Calificacion > 5){
        return res.status(400).send();
    }
    //Hacer que si cambiamos solo un atributo se cambie solo eso y no todo JI!
    const peliserie = await peliserieService.detallePeliserie(id);       
    
    const result = await peliserieService.updatePeliserieById(id, fortnite );
    if(update.rowsAffected[0] == 0){
        res.status(404).send();
    }
    return res.status(200).json(result);
});

router.delete('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    if(id < 1){
        return res.status(400).send();
    }
    const result = await peliserieService.deletePeliserieById(id);
    console.log(result);
    if(result.rowsAffected[0] == 0){
        return res.status(404).json(result);
    }   
    return res.status(200).json(result);
});

router.get('/:id', Authenticate, async (req, res) => {
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