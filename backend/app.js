const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const horariosRouter = require('./routes/horarios');
const pacientesRouter = require('./routes/pacientes');
const agendamentosRouter = require('./routes/agendamentos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/horarios', horariosRouter);
app.use('/pacientes', pacientesRouter);
app.use('/agendamentos', agendamentosRouter);

mongoose.connect('mongodb://localhost:27017/rigatti', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log('Erro MongoDB:', err));

module.exports = app;
