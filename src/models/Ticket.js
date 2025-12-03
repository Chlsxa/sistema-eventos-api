const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: [true, 'El ID del evento es requerido']
  },
  nombreComprador: {
    type: String,
    required: [true, 'El nombre del comprador es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    lowercase: true
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [1, 'Debe comprar al menos 1 ticket']
  },
  total: {
    type: Number,
    required: [true, 'El total es requerido']
  },
  fechaCompra: {
    type: Date,
    default: Date.now
  }
});

// Índice para consultas 9 y 10
ticketSchema.index({ eventoId: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);