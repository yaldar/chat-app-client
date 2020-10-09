import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';
import AlertBanner from './components/AlertBanner';
import Logo from './components/Logo';
import './App.css';

const App = () => (
  <div className="App">
    <Logo/>
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

    <AlertBanner />
  </div>
);

export default App;
