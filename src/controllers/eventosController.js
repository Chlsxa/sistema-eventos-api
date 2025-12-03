const Evento = require('../models/Evento');
const Ticket = require('../models/Ticket');

// 1. GET todos los eventos
exports.getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json({
      success: true,
      count: eventos.length,
      data: eventos,
      message: `${eventos.length} eventos encontrados en El Salvador 2025`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 1: Eventos con fecha mayor a específica
exports.getEventosFechaMayor = async (req, res) => {
  try {
    const { fecha } = req.params;
    const eventos = await Evento.find({ 
      fecha: { $gt: new Date(fecha) } 
    }).sort({ fecha: 1 });
    
    res.json({
      success: true,
      count: eventos.length,
      filtro: `fecha > ${fecha}`,
      operador: '$gt',
      data: eventos,
      message: `${eventos.length} eventos después del ${fecha}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 2: Eventos por categoría Y ciudad (AND)
exports.getEventosPorCategoriaCiudad = async (req, res) => {
  try {
    const { categoria, ciudad } = req.query;
    
    if (!categoria || !ciudad) {
      return res.status(400).json({
        success: false,
        error: 'Se requieren ambos: categoria y ciudad',
        ejemplo: '?categoria=música&ciudad=San Salvador'
      });
    }
    
    const eventos = await Evento.find({ 
      categoria: categoria,
      ciudad: ciudad
    });
    
    res.json({
      success: true,
      count: eventos.length,
      filtros: { categoria, ciudad },
      operador: 'AND',
      data: eventos,
      message: `${eventos.length} eventos de ${categoria} en ${ciudad}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 3: Eventos con precio entre dos valores
exports.getEventosPrecioEntre = async (req, res) => {
  try {
    const { min, max } = req.query;
    
    if (!min || !max) {
      return res.status(400).json({
        success: false,
        error: 'Se requieren ambos: min y max',
        ejemplo: '?min=10&max=50'
      });
    }
    
    const eventos = await Evento.find({ 
      precio: { $gte: Number(min), $lte: Number(max) } 
    }).sort({ precio: 1 });
    
    res.json({
      success: true,
      count: eventos.length,
      rango: { min: Number(min), max: Number(max) },
      operador: '$gte y $lte',
      data: eventos,
      message: `${eventos.length} eventos entre $${min} y $${max}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 4: Eventos por múltiples categorías (IN)
exports.getEventosCategoriasMultiples = async (req, res) => {
  try {
    const { categorias } = req.query;
    
    if (!categorias) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere parámetro categorias',
        ejemplo: '?categorias=música,deporte'
      });
    }
    
    const categoriasArray = categorias.split(',');
    const eventos = await Evento.find({ 
      categoria: { $in: categoriasArray } 
    });
    
    res.json({
      success: true,
      count: eventos.length,
      categorias: categoriasArray,
      operador: '$in',
      data: eventos,
      message: `${eventos.length} eventos en categorías: ${categoriasArray.join(', ')}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 5: Eventos activos excluyendo cancelados
exports.getEventosActivos = async (req, res) => {
  try {
    const eventos = await Evento.find({ 
      estado: { $ne: "cancelado" } 
    }).sort({ fecha: 1 });
    
    res.json({
      success: true,
      count: eventos.length,
      filtro: 'estado ≠ "cancelado"',
      operador: '$ne',
      data: eventos,
      message: `${eventos.length} eventos activos disponibles`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 6: Solo nombre, fecha y lugar (PROJECT)
exports.getEventosProyectados = async (req, res) => {
  try {
    const eventos = await Evento.find({}, {
      nombre: 1,
      fecha: 1,
      lugar: 1,
      ciudad: 1,
      _id: 0
    }).sort({ fecha: 1 });
    
    res.json({
      success: true,
      count: eventos.length,
      campos: ['nombre', 'fecha', 'lugar', 'ciudad'],
      operador: 'PROJECT',
      data: eventos,
      message: 'Lista simplificada de eventos'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 7: Ordenar eventos por fecha
exports.getEventosOrdenados = async (req, res) => {
  try {
    const { orden = 'asc' } = req.query;
    const sortOrder = orden === 'desc' ? -1 : 1;
    
    const eventos = await Evento.find().sort({ fecha: sortOrder });
    
    res.json({
      success: true,
      count: eventos.length,
      orden: orden === 'desc' ? 'descendente' : 'ascendente',
      operador: 'SORT',
      data: eventos,
      message: `Eventos ordenados por fecha (${orden})`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 8: Contar eventos por categoría
exports.getEstadisticasCategorias = async (req, res) => {
  try {
    const estadisticas = await Evento.aggregate([
      { 
        $group: { 
          _id: "$categoria", 
          totalEventos: { $sum: 1 },
          precioPromedio: { $avg: "$precio" }
        }
      },
      { $sort: { totalEventos: -1 } }
    ]);
    
    res.json({
      success: true,
      count: estadisticas.length,
      operador: 'GROUP + SUM',
      data: estadisticas,
      message: 'Estadísticas de eventos por categoría'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 9: Tickets vendidos por evento
exports.getTicketsVendidosPorEvento = async (req, res) => {
  try {
    const ticketsPorEvento = await Ticket.aggregate([
      { 
        $group: { 
          _id: "$eventoId", 
          ticketsVendidos: { $sum: "$cantidad" },
          totalRecaudado: { $sum: "$total" }
        }
      },
      {
        $lookup: {
          from: "eventos",
          localField: "_id",
          foreignField: "_id",
          as: "eventoInfo"
        }
      },
      {
        $project: {
          nombreEvento: { $arrayElemAt: ["$eventoInfo.nombre", 0] },
          ticketsVendidos: 1,
          totalRecaudado: 1,
          _id: 0
        }
      },
      { $sort: { ticketsVendidos: -1 } }
    ]);
    
    res.json({
      success: true,
      count: ticketsPorEvento.length,
      operador: 'AGGREGATE + LOOKUP + PROJECT',
      data: ticketsPorEvento,
      message: 'Tickets vendidos por evento'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CONSULTA 10: Evento con más tickets vendidos
exports.getEventoMasVendido = async (req, res) => {
  try {
    const eventoMasVendido = await Ticket.aggregate([
      { 
        $group: { 
          _id: "$eventoId", 
          totalTickets: { $sum: "$cantidad" }
        }
      },
      { $sort: { totalTickets: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "eventos",
          localField: "_id",
          foreignField: "_id",
          as: "eventoInfo"
        }
      },
      {
        $project: {
          nombreEvento: { $arrayElemAt: ["$eventoInfo.nombre", 0] },
          ciudad: { $arrayElemAt: ["$eventoInfo.ciudad", 0] },
          categoria: { $arrayElemAt: ["$eventoInfo.categoria", 0] },
          totalTickets: 1,
          _id: 0
        }
      }
    ]);
    
    res.json({
      success: true,
      operador: 'SORT + LIMIT',
      data: eventoMasVendido,
      message: 'Evento con más tickets vendidos'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear evento (para pruebas)
exports.crearEvento = async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.status(201).json({ success: true, data: evento });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Crear ticket (para pruebas)
exports.crearTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};