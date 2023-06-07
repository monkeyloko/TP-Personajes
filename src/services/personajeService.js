import sql from 'mssql'
import 'dotenv/config'
import config from '../models/db.js'

const personajeTabla = process.env.DB_TABLA_PERSONAJES;
const peliserieTabla = process.env.DB_TABLA_PELISERIE;
const intermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class PersonajeService {

    getPersonajeById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${personajeTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    createPersonaje = async (personaje) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Nombre',sql.NChar, personaje?.Nombre ?? '')
            .input('Imagen',sql.NChar, personaje?.Imagen ?? '')
            .input('Edad',sql.Int, personaje?.Edad ?? 0)
            .input('Peso',sql.Float, personaje?.Peso ?? 0)
            .input('Historia',sql.NChar, personaje?.Historia ?? '')
            .query(`INSERT INTO ${personajeTabla}(Nombre, Imagen, Edad, Peso, Historia) VALUES (@Nombre, @Imagen, @Edad, @Peso, @Historia)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (id, personaje) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Nombre',sql.NChar, personaje?.Nombre ?? '')
            .input('Imagen',sql.NChar, personaje?.Imagen ?? '')
            .input('Edad',sql.Int, personaje?.Edad ?? 0)
            .input('Peso',sql.Float, personaje?.Peso ?? 0)
            .input('Historia',sql.NChar, personaje?.Historia ?? '')
            .query(`UPDATE ${personajeTabla} SET Nombre = @Nombre, Imagen = @Imagen, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
    listadoPersonaje = async (Nombre, Edad, Peso, Pelicula) => {
        const pool = await sql.connect(config);
        let append = "WHERE ";
        if(Nombre){
            console.log("fortnite")
            append += `${personajeTabla}.Nombre = @Nombre, `;
        }
        if(Edad){
            append += `${personajeTabla}.Edad = @Edad, `;
        }
        if(Peso){
            append += `${personajeTabla}.Peso = @Peso, `;
        }
        if(Pelicula){
            append += `${peliserieTabla}.Id = @Pelicula, `;
        }
        if(append == "WHERE "){
            append = "";
        }
        else{
            append = append.substring(0,append.length-2);
        }
        append += " GROUP BY Personajes.Id, Personajes.Edad, Personajes.Imagen, Personajes.Nombre, Personajes.Peso";
        console.log(`${personajeTabla}.Imagen, ${personajeTabla}.Peso, ${personajeTabla}.Edad, ${personajeTabla}.Nombre, ${personajeTabla}.Id, STRING_AGG(${peliserieTabla}.Titulo, ', ') AS Movies 
        FROM ${personajeTabla} LEFT JOIN ${intermediaTabla}
    ON ${personajeTabla}.Id = ${intermediaTabla}.fkPersonaje LEFT JOIN ${peliserieTabla} ON ${intermediaTabla}.fkPeliSeries = ${peliserieTabla}.Id ` + append)
        const response = await pool.request()
        .input('Nombre',sql.NChar, Nombre ?? '')
        .input('Edad',sql.Int, Edad ?? 0)
        .input('Peso',sql.Float, Peso ?? 0)
        .input('Pelicula', sql.Int, Pelicula ?? 0)
        .query(`SELECT ${personajeTabla}.Imagen, ${personajeTabla}.Peso, ${personajeTabla}.Edad, ${personajeTabla}.Nombre, ${personajeTabla}.Id, STRING_AGG(${peliserieTabla}.Titulo, ', ') AS Movies 
        FROM ${personajeTabla} LEFT JOIN ${intermediaTabla}
        ON ${personajeTabla}.Id = ${intermediaTabla}.fkPersonaje LEFT JOIN ${peliserieTabla} ON ${intermediaTabla}.fkPeliSeries = ${peliserieTabla}.Id ` + append);
        
        return response.recordset;
    }
    detallePersonaje = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id',sql.Int, id)
        .query(`SELECT ${personajeTabla}.*, STRING_AGG(${peliserieTabla}.Titulo, ', ') AS Movies
        FROM ${personajeTabla}
        LEFT OUTER JOIN ${intermediaTabla}
        ON ${personajeTabla}.Id = ${intermediaTabla}.fkPersonaje LEFT OUTER JOIN ${peliserieTabla} ON ${intermediaTabla}.fkPeliSeries = ${peliserieTabla}.Id WHERE Personajes.Id = @id GROUP BY ${personajeTabla}.Id, ${personajeTabla}.Edad, ${personajeTabla}.Imagen, ${personajeTabla}.Historia, ${personajeTabla}.Nombre, ${personajeTabla}.Peso`);
        console.log(response);
        return response.recordset;
    }

        

}

