import { Router } from 'express';
import { PersonajeService } from '../services/PersonajeService.js';
const router = Router();
const personajeService = new PersonajeService();
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
router.get('/:id', async (req, res) => {
    const personaje = await personajeService.detallePersonaje(req.params.id);
    return res.status(200).json(personaje)
});
router.post('', async (req, res) => {
    const personaje = await personajeService.createpersonaje(req.body);
    return res.status(201).json(personaje);
});
router.put('/:id', async (req, res) => {
    const personaje = await personajeService.updatepersonajeById(req.body);
    return res.status(200).json(personaje);
});
router.delete('/:id', async (req, res) => {
    const personaje = await personajeService.deletepersonajeById(req.params.id);
    return res.status(200).json(personaje);
});
router.get('', async (req, res) => {
    
    const personaje = await personajeService.listadoPersonaje();
    return res.status(200).json(personaje);
});



export default router;