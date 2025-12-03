const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const eventosRoutes = require('./routes/eventosRoutes');

// conexión a MongoDB
connectDB();

// inicializanos Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/api/eventos', eventosRoutes);

// Ruta de prueba principal
app.get('/', (req, res) => {
  res.json({ 
    message: '🎟️ API de Sistema de Eventos - FUNCIONANDO',
    version: '1.0.0',
    author: 'Tu Nombre',
    database: 'MongoDB Atlas',
    status: 'online',
    timestamp: new Date().toISOString(),
    endpoints: {
      eventos: '/api/eventos',
      consultas: [
        'GET /api/eventos/fecha-mayor/:fecha',
        'GET /api/eventos/filtro?categoria=XX&ciudad=XX',
        'GET /api/eventos/precio-entre?min=X&max=X',
        'GET /api/eventos/categorias-multiples?categorias=X,Y,Z',
        'GET /api/eventos/activos',
        'GET /api/eventos/proyectados',
        'GET /api/eventos/ordenados?orden=asc|desc',
        'GET /api/eventos/estadisticas/categorias',
        'GET /api/eventos/tickets-vendidos',
        'GET /api/eventos/mas-vendido'
      ]
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.url
  });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀  Servidor iniciado`);
  console.log(`📍  URL: http://localhost:${PORT}`);
  console.log(`🕐  Hora: ${new Date().toLocaleTimeString()}`);
  console.log(`=================================`);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto: ${PORT}`);
});