const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

router.post('/login', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    let paciente = await Paciente.findOne({ nome });

    if (!paciente) {
      paciente = await Paciente.create({
        nome,
        telefone: 'Não informado'
      });
    }

    res.status(200).json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar login', details: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const novoPaciente = new Paciente(req.body);
    const pacienteSalvo = await novoPaciente.save();
    res.status(201).json(pacienteSalvo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar paciente', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pacientes', details: err.message });
  }
});

module.exports = router;
