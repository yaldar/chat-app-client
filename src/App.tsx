import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/LandingPage';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import AlertBanner from './components/AlertBanner';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';

const App = () => {
  const state = useSelector((state: RootState) => state);

  useEffect(() => {}, []);
  const log = () => {
    console.log(state);
  };
  return (
    <div className="App">
      <AlertBanner />
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
      <button onClick={log}>log state</button>
    </div>
  );
};

export default App;
