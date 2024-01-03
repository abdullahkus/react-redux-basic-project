import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import { RoutesProvider } from './providers/routes.jsx';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RoutesProvider></RoutesProvider>
        </Provider>
    </React.StrictMode>,
);
