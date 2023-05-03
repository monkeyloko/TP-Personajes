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

    getPeliserie = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${peliserieTabla} where id = @id`);
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
            .query(`INSERT INTO ${peliserieTabla}(Nombre, Imagen, Edad, Peso, Historia) VALUES (@Nombre, @Imagen, @Edad, @Peso, @Historia)`);
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
            .query(`UPDATE ${peliserieTabla} SET Nombre = @Nombre, Imagen = @Imagen, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${peliserieTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}
