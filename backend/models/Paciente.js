const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
}, {
  timestamps: true
});

pacienteSchema.index({ nome: 1, telefone: 1 }, { unique: true });

module.exports = mongoose.model('Paciente', pacienteSchema);
