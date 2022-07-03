import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import 'antd/dist/antd.css'
import './index.css'
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
   </Provider>
  </React.StrictMode>
)
