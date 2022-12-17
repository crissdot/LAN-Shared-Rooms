import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Main } from './components/Main';
import { Home } from './components/Home';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Logout />
          <Routes>
            <Route path='/' element={<Main/>}>
              <Route element={<Home/>} />
              <Route path='login/' element={<Login/>} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
