# Sistema de Agendamento de Consultas

Sistema de agendamento de consultas desenvolvido com React (Frontend) e Node.js (Backend).

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- NPM ou Yarn

## Configuração do Ambiente

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
```
MONGODB_URI=sua_url_do_mongodb
PORT=3001
```

4. Inicie o servidor:
```bash
npm run dev
```

### Frontend

1. Em outro terminal, entre na pasta do frontend:
```bash
cd Frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Funcionalidades

### Usuário Normal
- Login com nome de usuário
- Visualização de horários disponíveis
- Agendamento de consultas
- Visualização dos próprios agendamentos

### Administrador
- Login com nome "admin"
- Visualização de todos os agendamentos(pacientes veem e conseguem apenas agendar pra si mesmo)
- Aprovação/reprovação de agendamentos

## Tecnologias Utilizadas

### Frontend
- React
- Redux Toolkit
- React Router
- SCSS Modules

### Backend
- Node.js
- Express
- Mongoose
- MongoDB 