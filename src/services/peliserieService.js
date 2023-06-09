import sql from 'mssql'
import 'dotenv/config'
import config from '../models/db.js'

const peliserieTabla = process.env.DB_TABLA_PELISERIE;
const personajeTabla = process.env.DB_TABLA_PERSONAJES;
const intermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class PeliSerieService {
/*
    REVISAR INNER VS OUTER JOIN
*/
    getPeliserie = async () => {
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT * from ${peliserieTabla}`);
        console.log(response)
        return response.recordset;
    }

    getPeliserieById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT * from ${peliserieTabla} where Id = @id`);
        console.log(response)
        return response.recordset[0];
    }

    createPeliserie = async (peliserie
        ) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, peliserie?.Imagen ?? '')
            .input('Titulo',sql.NChar, peliserie?.Titulo ?? '')
            .input('FechaCreacion',sql.NChar, peliserie?.FechaCreacion ?? '')
            .input('Calificacion',sql.Float, peliserie?.Calificacion ?? 0)
            .query(`INSERT INTO ${peliserieTabla}(Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@Imagen, @Titulo, @FechaCreacion, @Calificacion)`);
        console.log(response)
        return response.recordset;
    }

    updatePeliserieById = async (id, peliserie) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .input('Imagen',sql.NChar, peliserie?.Imagen ?? '')
            .input('Titulo',sql.NChar, peliserie?.Titulo ?? '')
            .input('FechaCreacion',sql.Date, peliserie?.FechaCreacion ?? null)
            .input('Calificacion',sql.Float, peliserie?.Calificacion ?? 0)
            .query(`UPDATE ${peliserieTabla} SET Imagen = @Imagen, Titulo = @Titulo, FechaCreacion = @FechaCreacion, Calificacion = @Calificacion WHERE Id = @Id`);
        console.log(response)
        return response.recordset;
    }

    deletePeliserieById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`DELETE FROM ${peliserieTabla} WHERE Id = @id`);
        console.log(response)
        return response.recordset;
    }
    
    listadoPelicula = async (Nombre, order) => {
        const pool = await sql.connect(config);
        let append = "WHERE ";
        if(Nombre){
            append += `${peliserieTabla}.Titulo = @Nombre`;
        }
        if(order == "ASC" || order == "DESC"){
            append += " ORDER BY " + order;
        }
        if(append == "WHERE "){
            append = "";
        }
        const response = await pool.request()
        .input('Nombre',sql.NChar, Nombre ?? '')
        .query(`SELECT Id, Titulo, FechaCreacion from ${peliserieTabla} ` + append);
        console.log(response.recordset)

        return response.recordset;

    }

    detallePeliserie = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id',sql.Int, id)
        .query(`SELECT  ${peliserieTabla}.*, STRING_AGG(${personajeTabla}.Nombre, ', ') AS Personajes
        FROM ${peliserieTabla}
        LEFT OUTER JOIN ${intermediaTabla}
        ON ${peliserieTabla}.Id = ${intermediaTabla}.fkPeliSeries LEFT OUTER JOIN ${personajeTabla} ON ${intermediaTabla}.fkPersonaje = ${personajeTabla}.Id WHERE ${peliserieTabla}.Id = @id GROUP BY ${peliserieTabla}.Id, ${peliserieTabla}.Imagen, ${peliserieTabla}.Titulo, ${peliserieTabla}.FechaCreacion, ${peliserieTabla}.Calificacion`);
        console.log(response);
        return response.recordset;
    }
    
}
