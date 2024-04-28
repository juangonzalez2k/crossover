const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'crossover',
});

db.connect(err => {
    if(err) throw err;
    console.log('Conectado a la base de datos');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

// CRUD //
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

app.post('/api/usuarios', (req, res) => {
    const { name, email } = req.body;

    // Pequeña validación para verificar que se ingresó tanto el nombre como el email //

    if(!name || !email){
        return res.status(400).send('El nombre y el correo electrónico son obligatorios');
    }

    const sql = 'INSERT INTO user (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if(err) {
            console.error('Error al intentar crear un usuario');
            return res.status(500).send('Error al intentar crear el usuario');
        }
        res.send('Usuario creado con exito')
    });
});


app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if(err) {
            console.error(' Error al obtener usuarios', err);
            return res.status(500).send('Error al obtener usuarios de la base de datos');
        }
        //console.log(result)
        res.json(result);
    })

});

app.get('/api/usuarios/:id', (req, res) => {

    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.error(' Error al obtener usuarios', err);
            return res.status(500).send('Error al obtener usuarios de la base de datos');
        }
        //console.log(result)
        res.json(result);
    })

});

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const checksql = 'SELECT * FROM user WHERE email = ? AND id != ?'

    db.query(checksql, [email, id], (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error al verificar el usuario');
        }
        if(results.length > 0){
            return res.status(409).send('El correo electronico ya está en uso por otro usuario')
        }
        const sql  = 'UPDATE user SET name = ?, email = ? WHERE id = ?';

        db.query(sql, [name, email, id], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).send('Error al editar el usuario de la base de datos');
            }

            res.send('Usuario editado con exito')

        });
    })

});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM user WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el usuario de la base de datos');
        }

        if(results.affectedRows === 0){
            return res.status(404).send('Usuario no encontrado');
        }

        res.send('Usuario eliminado correctamente')

    });

});

