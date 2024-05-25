import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes';
import { Spin } from 'antd';
import useStore from './store';

function App() {

  const { is_page_loading } = useStore(state => state);

  return (
    <div className="App">
      <Spin spinning={is_page_loading} fullscreen />
      <Router />
    </div>
  );
}

export default App;
