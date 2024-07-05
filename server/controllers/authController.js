const bcrypt = require('bcrypt');
const db = require('../db');

exports.register = (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash de la contraseña antes de guardar en la base de datos
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Insertar el nuevo usuario en la base de datos con la contraseña hasheada
            db.query('INSERT INTO users (username, password) VALUES (?, ?)',
                [username, hashedPassword], (err, results) => {
                    if (err) {
                        console.error('Database error:', err.message);
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                });
        });
    });
};
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario por nombre de usuario en la base de datos
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];

        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Error comparing passwords' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            res.json({ message: 'Login successful' });
        });
    });
};