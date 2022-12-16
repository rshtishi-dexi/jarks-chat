import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LogInPage from './Pages/login/LogIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const isLoggedIn = ()=>false;
root.render(
  <React.StrictMode>
    {isLoggedIn()?
     <>hello</>:
     <LogInPage/>
    }
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
