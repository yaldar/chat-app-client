import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import {Layout} from 'antd';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';
import AlertBanner from './components/AlertBanner';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const App = () => (
  <div className="App">
    <Content className="site-layout" >
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

    </Content>
  </div>

);

export default App;
