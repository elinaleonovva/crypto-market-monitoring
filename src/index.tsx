import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles';

import { Provider } from 'react-redux';
import { store } from './store/store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
