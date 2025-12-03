const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

// Ruta de prueba simple
router.get('/test', (req, res) => {
  res.json({ 
    message: '✅ Rutas de eventos funcionando correctamente',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Ruta básica GET todos los eventos
router.get('/', eventosController.getAllEventos);

// Las 10 consultas requeridas para el proyecto
// 1. Eventos con fecha mayor a específica
router.get('/fecha-mayor/:fecha', eventosController.getEventosFechaMayor);

// 2. Eventos por categoría Y ciudad (AND)
router.get('/filtro', eventosController.getEventosPorCategoriaCiudad);

// 3. Eventos con precio entre dos valores
router.get('/precio-entre', eventosController.getEventosPrecioEntre);

// 4. Eventos por múltiples categorías (IN)
router.get('/categorias-multiples', eventosController.getEventosCategoriasMultiples);

// 5. Eventos activos excluyendo cancelados
router.get('/activos', eventosController.getEventosActivos);

// 6. Solo nombre, fecha y lugar (PROJECT)
router.get('/proyectados', eventosController.getEventosProyectados);

// 7. Ordenar eventos por fecha
router.get('/ordenados', eventosController.getEventosOrdenados);

// 8. Contar eventos por categoría
router.get('/estadisticas/categorias', eventosController.getEstadisticasCategorias);

// 9. Tickets vendidos por evento
router.get('/tickets-vendidos', eventosController.getTicketsVendidosPorEvento);

// 10. Evento con más tickets vendidos
router.get('/mas-vendido', eventosController.getEventoMasVendido);

// Ruta POST para crear eventos (para pruebas)
router.post('/', eventosController.crearEvento);

// Ruta POST para crear tickets (para pruebas)
router.post('/tickets', eventosController.crearTicket);

module.exports = router;