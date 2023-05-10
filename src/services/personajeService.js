import sql from 'mssql'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const peliserieTabla = process.env.DB_TABLA_PELISERIE;
const intermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class PersonajeService {

    getPersonaje = async () => {
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT * from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }

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
    listadoPersonaje = async () => {
        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Imagen, Nombre, Id from ${personajeTabla}`);
        console.log(response)

        return response.recordset;
    }
    detallePersonaje = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id',sql.Int, id)
        .query(`SELECT ${personajeTabla}.Id, ${personajeTabla}.Nombre, ${personajeTabla}.Imagen, ${personajeTabla}.Peso, ${personajeTabla}.Edad, ${personajeTabla}.Historia, ${peliserieTabla}.Titulo
        FROM ${personajeTabla}
        INNER JOIN ${intermediaTabla}
        ON ${personajeTabla}.Id = ${intermediaTabla}.fkPersonaje INNER JOIN ${peliserieTabla} ON ${intermediaTabla}.fkPeliSeries = ${peliserieTabla}.Id WHERE ${personajeTabla}.Id = @id`);
        console.log(response);
        return response.recordset;
    }
        

}
