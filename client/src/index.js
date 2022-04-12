import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


// components
import SignIn from './components/signIn';
import MainPage from './components/MainPage';
import Notifications from './components/notifications';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

