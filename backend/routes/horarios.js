const express = require('express');
const router = express.Router();

let horariosDisponiveis = {
  horarios: [
    {
      "id": 1,
      "data": "27/05/2025",
      "horario": "09:00",
      "status": "disponivel"
    },
    {
      "id": 2,
      "data": "27/05/2025",
      "horario": "10:00",
      "status": "disponivel"
    },
    {
      "id": 3,
      "data": "27/05/2025",
      "horario": "11:00",
      "status": "disponivel"
    },
  ]
};

router.get('/', (req, res) => {
  res.json(horariosDisponiveis);
});

router.post('/', (req, res) => {
  const { horario } = req.body;
  res.status(200).json(horario);

  if (horario && !horariosDisponiveis.includes(horario)) {
    horariosDisponiveis.push(horario);
  }
});

module.exports = router;
