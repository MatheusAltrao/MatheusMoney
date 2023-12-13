import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import TransactionsProvider from './context/TransactionsContext.tsx';

ReactDOM.render(
    <React.StrictMode>
        <TransactionsProvider>
            <App />
        </TransactionsProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
