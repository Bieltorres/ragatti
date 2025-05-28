const express = require("express");
const router = express.Router();
const Agendamento = require("../models/Agendamento");
const Paciente = require("../models/Paciente");

router.post("/criar", async (req, res) => {
  const { nome, telefone, especialidade, dataHora } = req.body;

  if (!nome || !telefone || !especialidade || !dataHora) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const [data, horario] = dataHora.split(' ');

    const agendamentoExistente = await Agendamento.findOne({
      data: data,
      horario: horario,
      status: 'aprovado'
    });

    if (agendamentoExistente) {
      return res.status(400).json({
        error: "Já existe um agendamento aprovado para este horário e data. Por favor, escolha outro horário."
      });
    }

    let paciente = await Paciente.findOne({
      $or: [
        { nome: nome, telefone: telefone },
        { telefone: telefone }
      ]
    });

    if (!paciente) {
      paciente = await Paciente.create({
        nome,
        telefone
      });
    } else if (paciente.nome !== nome) {
      paciente = await Paciente.create({
        nome,
        telefone
      });
    }

    const novoAgendamento = new Agendamento({
      paciente: paciente._id,
      especialidade,
      data,
      horario,
      status: 'pendente'
    });

    const agendamentoSalvo = await novoAgendamento.save();

    const agendamentoCompleto = await Agendamento.findById(agendamentoSalvo._id)
      .populate('paciente', 'nome telefone');

    res.status(201).json(agendamentoCompleto);
  } catch (err) {
    console.error("Erro ao salvar agendamento:", err);
    res.status(500).json({ error: "Erro ao salvar agendamento" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { nome } = req.query;

    let query = {};

    if (nome !== 'admin') {
      const paciente = await Paciente.findOne({ nome });
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }
      query.paciente = paciente._id;
    }

    const agendamentos = await Agendamento.find(query)
      .populate('paciente', 'nome telefone')
      .sort({ data: 1, horario: 1 });

    const agendamentosFormatados = agendamentos.map(agendamento => {
      return {
        _id: agendamento._id,
        nome: agendamento.paciente.nome,
        telefone: agendamento.paciente.telefone,
        especialidade: agendamento.especialidade,
        data: agendamento.data,
        horario: agendamento.horario,
        status: agendamento.status,
      };
    });

    res.status(200).json(agendamentosFormatados);
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
});

router.patch("/aprovar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const agendamento = await Agendamento.findByIdAndUpdate(
      id,
      { status: 'aprovado' },
      { new: true }
    ).populate('paciente', 'nome telefone');

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.error("Erro ao aprovar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao aprovar agendamento" });
  }
});

router.patch("/reprovar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const agendamento = await Agendamento.findByIdAndUpdate(
      id,
      { status: 'reprovado' },
      { new: true }
    ).populate('paciente', 'nome telefone');

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.error("Erro ao reprovar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao reprovar agendamento" });
  }
});

module.exports = router;