const Evento = require('../models/Evento');
const Ticket = require('../models/Ticket');

// 1. GET todos los eventos
exports.getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json({
      success: true,
      count: eventos.length,
      data: eventos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener eventos',
      message: error.message
    });
  }
};

// CONSULTA 1: Eventos con fecha mayor a específica
exports.getEventosFechaMayor = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 1: Fecha mayor funcionando',
      fecha: req.params.fecha
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 2: Eventos por categoría Y ciudad
exports.getEventosPorCategoriaCiudad = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 2: Filtro por categoría y ciudad funcionando',
      query: req.query
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 3: Precio entre
exports.getEventosPrecioEntre = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 3: Precio entre funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 4: Categorías múltiples
exports.getEventosCategoriasMultiples = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 4: Categorías múltiples funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 5: Eventos activos
exports.getEventosActivos = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 5: Eventos activos funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 6: Proyectados
exports.getEventosProyectados = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 6: Proyectados funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 7: Ordenados
exports.getEventosOrdenados = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 7: Ordenados funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 8: Estadísticas categorías
exports.getEstadisticasCategorias = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 8: Estadísticas funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 9: Tickets vendidos
exports.getTicketsVendidosPorEvento = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 9: Tickets vendidos funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA 10: Más vendido
exports.getEventoMasVendido = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Consulta 10: Más vendido funcionando'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear evento
exports.crearEvento = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Crear evento funcionando',
      body: req.body
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear ticket
exports.crearTicket = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Crear ticket funcionando',
      body: req.body
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};