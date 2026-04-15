import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import  Cadastro from './pages/Cadastro';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cadastro/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
