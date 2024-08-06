import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStateProvider } from './Components/myContexts/GlobalStateContext';
import { SearchProvider } from './Components/myContexts/SearchContext';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <SearchProvider>
      <GlobalStateProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </Provider>
      </GlobalStateProvider>
    </SearchProvider>
  </React.StrictMode>,
)
