import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/LandingPage';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';

function App() {

  useEffect(() => {}, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
