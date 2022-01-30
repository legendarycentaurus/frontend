import logo from './logo.svg';
import { Button, Col, Collapse,Row } from 'antd'
import React, { useState, useEffect } from 'react';
import MutualFunds from './components/MutualFunds';
import Timezone from './components/Timezone';
import Timer from './components/Timer';
import './App.css';
import Hello from './components/Hello';

const { Panel } = Collapse;

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('https://api-backend-service.herokuapp.com/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="outline-primary">Time </Button>
        <p>The current time as listed by heroku App {currentTime}.</p>
      </header>
      <Row>
        <Col span={20} offset={2}>
          <Collapse defaultActiveKey={['1']} >
            <Panel header="Hello Componet" key="1">
              <Hello></Hello>
            </Panel>
            <Panel header="List of Mutual fund component" key="2" forceRender={true}>
              <MutualFunds></MutualFunds>
            </Panel>
            <Panel header="Find Time difference between any two cities" key="3">
              <Timezone></Timezone>
            </Panel>
            <Panel header="Timer" key="4">
              <Timer></Timer>
            </Panel>
            
          </Collapse>
        </Col>
      </Row>







    </div>
  );
}


export default App;
