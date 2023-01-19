import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import './i18n'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        {/*<React.StrictMode>*/}
        <React.Suspense fallback={"loading"}>
            <App/>
        </React.Suspense>
        {/*</React.StrictMode>*/}
    </Provider>
);
