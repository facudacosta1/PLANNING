const express = require('express');
const app = express();
const puerto = 3000;
app.use(express.json());

const mariadb = require('mariadb'); 
const pool = mariadb.createPool({host: "localhost", user: "root", password: "admin", database: "planning", connectionLimit: 5});

console.log('corriendo el servidor.')

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});


//PETICIÓN GET 

app.get('/tareas', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT id, name, description, created_at, updated_at, status FROM todo");
        res.json({ message: "petición realizada", data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo realizar la consulta" });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});

//PETICIÓN POST	

app.post('/tareas', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Supongamos que los datos del cuerpo de la solicitud contienen name, description y status.
        const { name, description, status } = req.body;

        // Realizamos la inserción en la base de datos.
        const result = await conn.query("INSERT INTO todo (name, description, status) VALUES (?, ?, ?)", [name, description, status]);

        res.json({ message: "Tarea agregada correctamente", insertedId: result.insertId });
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo agregar la tarea" });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});


//PETICIÓN PUT

app.put('/tareas/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("UPDATE todo SET name = ?, description = ?, status = ? WHERE id = ?", [req.body.name, req.body.description, req.body.status, req.params.id]);
        if (response.affectedRows === 0) {
            res.status(404).json({ message: "Tarea no encontrada" });
        } else {
            res.json({ message: "Tarea actualizada correctamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo actualizar la tarea" });
    }
})

//PETICIÓN DELETE

app.delete('/tareas/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("DELETE FROM todo WHERE id = ?", [req.params.id]);
        if (response.affectedRows === 0) {
            res.status(404).json({ message: "Tarea no encontrada" });
        } else {
            res.json({ message: "Tarea eliminada correctamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo eliminar la tarea" });
    }
})

