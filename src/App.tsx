import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';
import AlertBanner from './components/AlertBanner';

const App = () => (
  <div className="App">
    <AlertBanner />
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/chat">
          <ChatPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
