import sql from 'mssql'
import 'dotenv/config'

const peliserieTabla = process.env.DB_TABLA_PELISERIE;

export class PeliSerieService {

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
            .input('FechaCreacion',sql.Int, peliserie?.FechaCreacion ?? null)
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
            .input('FechaCreacion',sql.Int, peliserie?.FechaCreacion ?? null)
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
    
    listadoPelicula = async () => {
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Id, Titulo, FechaCreacion from ${peliserieTabla}`);
        console.log(response)
        return response.recordset;
    }
}
