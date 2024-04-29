const express = require('express');
const bcrypt = require('bcrypt');
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

// Expresion para regular la contraseña y pueda utilizar solo letras y numeros
const passwordRegex = /^[a-zA-Z0-9]+$/;

// CRUD //
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

app.post('/api/usuarios',async (req, res) => {
    const { name, email, password } = req.body;

    // Pequeña validación para verificar que se ingresó tanto el nombre como el email y la contraseña //

    if(!name || !email || !password){
        return res.status(400).send('El nombre, el correo electrónico y la contraseña son obligatorios y no pueden estar vacios');
    }

    // Validación para verificar que se ingresó una contraseña con el formato correcto //
    if(!passwordRegex.test(password)){
        return res.status(401).send('La contraseña no cumple con el formato requerido el cual solo permite letras y numeros')
    }

    // Ultima Validación para que la contraeña sea mayor a 8 caracteres //
    if(password.length < 8){
        return res.status(401).send('La contraseña debe ser mayor a 8 digitos')
    }

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        //console.log(hashedPassword)
        const sql = 'INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hashedPassword], (err, result) =>{
            if(err){
                console.error('Error al intentar crear un usuario', err);
                return res.status(500).send('Error al intentar crear el usuario')
            }
            res.send('Usuario creado con éxito');
        });
    } catch (error) {
        console.error('Error al encriptar la contraseña', error);
        res.status(500).send('Error al encriptar la contraseña');
    }
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

app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if(!name || !email){
        return res.status(400).send('El nombre, el correo electrónico y la contraseña son obligatorios y no pueden estar vacios');
    }

    try {
        const checksql = 'SELECT * FROM user WHERE email = ? AND id != ?'
        const [checkResults] = await db.promise().query(checksql, [email,id]);
        if(checkResults.length > 0){
            return res.status(409).send('El correo ya está en uso por otro usuario')
        }
        if(!password){
            const sql = 'UPDATE user SET name = ?, email = ? WHERE ID = ?'
            const [updateResults] = await db.promise().query(sql, [name, email, id]);
            if(updateResults.affectedRows === 0){
                return res.status(404).send('El usuario no ha sido encontrado');
            }
            res.send('Usuario editado con exito')
        }
        else {
            // Validación para verificar que se ingresó una contraseña con el formato correcto //
            if(!passwordRegex.test(password)){
                return res.status(401).send('La contraseña no cumple con el formato requerido el cual solo permite letras y numeros')
            }

            // Ultima Validación para que la contraeña sea mayor a 8 caracteres //
            if(password.length < 8){
                return res.status(401).send('La contraseña debe ser mayor a 8 digitos')
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const sql = 'UPDATE user SET name = ?, email = ?, password_hash = ? WHERE ID = ?'
            const [updateResults] = await db.promise().query(sql, [name, email, hashedPassword, id]);
            if(updateResults.affectedRows === 0){
                return res.status(404).send('El usuario no ha sido encontrado');
            }
            res.send('Usuario editado con exito')
        }
    }
    catch {
        console.error(err)
        res.status(500).send('Error al editar el usuario en la base de datos')
    }

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

