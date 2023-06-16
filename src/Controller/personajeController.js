import { Router } from 'express';
import { PersonajeService } from '../services/PersonajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';
import { Personaje } from '../models/personaje.js';
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
router.get('',Authenticate,  async (req, res) => {
    
    const personaje = await personajeService.listadoPersonaje(req.query.name, req.query.age, req.query.weight, req.query.movies );
    return res.status(200).json(personaje);
});

router.get('/:id',Authenticate,  async (req, res) => {
    const personaje = await personajeService.detallePersonaje(req.params.id);
    return res.status(200).json(personaje)
});

router.post('',Authenticate,  async (req, res) => {
    const personaje = await personajeService.createPersonaje(req.body);
    return res.status(201).json(personaje);
});

router.put('/:id',Authenticate,  async (req, res) => {
    const id = req.params.id;
    let Imagen = req.body.Imagen
    let Nombre = req.body.Nombre
    let Edad = req.body.Edad
    let Peso = req.body.Peso
    let Historia= req.body.Historia

    if(id != req.body.Id){
        return res.status(400).send();
    }
    const personaje = await personajeService.detallePersonaje(id);
    if (!personaje) {
        return res.status(404).send();
    }
    if (!Imagen){
        Imagen = personaje.Imagen;
    }
     if (!Nombre){
        Nombre = personaje.Nombre;
     }
     if (!Edad && Edad != 0){
        Edad = personaje.Edad;
     }
     if (!Peso && Peso != 0){
        Peso = personaje.Peso;
     }
     if(!Historia){
        Historia = personaje.Historia;
     }
     

    const newPersonaje = new Personaje();

    newPersonaje.Imagen = Imagen;
    newPersonaje.Nombre = Nombre;
    newPersonaje.Edad = Edad;
    newPersonaje.Peso = Peso;
    newPersonaje.Historia = Historia;

    const result = await personajeService.updatePersonajeById(id, newPersonaje);
    return res.status(200).json(result);
});
router.delete('/:id',Authenticate,  async (req, res) => {
    const id = req.params.id
    if (id < 1){
       return res.status(400).send();
    }
    const result = await personajeService.deletePersonajeById(req.params.id);
    if(result.rowsAffected[0] == 0){
        return res.status(404).json(result);
    }   
    return res.status(200).json(result);
});




export default router;