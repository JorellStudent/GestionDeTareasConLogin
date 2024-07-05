const express = require('express');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Reemplaza bodyParser.json() con express.json() para versiones recientes de Express

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación

// Ruta para manejar todas las demás solicitudes y servir index.html para Vue Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
