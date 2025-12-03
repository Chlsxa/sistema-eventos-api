const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del evento es requerido'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha del evento es requerida']
  },
  lugar: {
    type: String,
    required: [true, 'El lugar del evento es requerido']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad es requerida'],
    enum: ['San Salvador', 'Santa Tecla', 'La Libertad', 'San Miguel', 'Santa Ana', 'Sonsonate']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['música', 'deporte', 'teatro', 'conferencia', 'festival', 'arte', 'gastronomía', 'literatura']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  estado: {
    type: String,
    enum: ['activo', 'cancelado', 'completo'],
    default: 'activo'
  },
  descripcion: {
    type: String,
    default: ''
  },
  capacidad: {
    type: Number,
    default: 100,
    min: [1, 'La capacidad debe ser al menos 1']
  },
  organizador: {
    type: String,
    default: 'Anónimo'
  }
  
}, {
  timestamps: true
});

// Índices para búsquedas rápidas 
eventoSchema.index({ fecha: 1 });                    // Para consulta 1 y 7
eventoSchema.index({ ciudad: 1, categoria: 1 });     // Para consulta 2
eventoSchema.index({ precio: 1 });                   // Para consulta 3
eventoSchema.index({ categoria: 1 });                // Para consultas 4 y 8
eventoSchema.index({ estado: 1 });                   // Para consulta 5

module.exports = mongoose.model('Evento', eventoSchema);