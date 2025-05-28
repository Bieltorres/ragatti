const mongoose = require("mongoose");

const agendamentoSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true
  },
  especialidade: { type: String, required: true },
  data: { type: String, required: true },
  horario: { type: String, required: true },
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'reprovado'],
    default: 'pendente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Agendamento", agendamentoSchema);
