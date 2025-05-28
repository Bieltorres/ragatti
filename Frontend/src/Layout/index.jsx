import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../Pages/Login';
import { Container } from './Container';
import { Agendamentos } from '../Pages/Agendamentos';
import { ErrorBoundary } from '../Components/Error';
import { Horarios } from '../Pages/Horarios';

export const Layout = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/login" element={<Login />} />

    <Route path="/horarios-disponiveis" element={<Container icon={'fa-solid fa-book'} title={'Dashboard'} />}>
      <Route index element={<Horarios />} />
    </Route>

    <Route path="/agendamentos" element={<Container icon={'fa-solid fa-book'} title={'Dashboard'} />}>
      <Route index element={<Agendamentos />} />
    </Route>

    <Route path="*" element={<ErrorBoundary />} />
  </Routes>
);
