import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import TodoProvider from './Context/TodoContext';
import {CookiesProvider} from "react-cookie"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
    <AuthProvider>
    <TodoProvider>
    <App />
    </TodoProvider>
    </AuthProvider>
    </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);


