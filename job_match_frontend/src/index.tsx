import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.common['Authorization'] = 'Bearer token';

axios.interceptors.request.use((request)=>{
  console.log(request)
  return request
})

axios.interceptors.response.use((response)=>{
  console.log(response)
  return response
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
