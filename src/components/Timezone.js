import React, { useState, useEffect } from 'react';
import { List, Row, Col, Divider, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CityList from './CityList';
import * as Constants from '../constants/Constants'

function Timezone() {

  const [fromCity, setFromCity] = useState('');
  const [fromCities, setFromCities] = useState([]);
  const [cityData, setCityData] = useState(new Map());
  const [toCities, setToCities] = useState([]);
  const [toCity, setToCity] = useState('');
  const [message, setMessage] = useState([]);

  const handleFromCityOnChange = event => {
    setFromCity(event.target.value);
  };

  const handleToCityOnChange = event => {
    setToCity(event.target.value);
  };

  const getTimeDifference = () => {
    console.log(fromCity, toCity)
    console.log(cityData.get(fromCity), cityData.get(toCity))
    var fromCityId = cityData.get(fromCity);
    var toCityId = cityData.get(toCity);
    //Constants.backendServiceTimeDifference
    fetch(Constants.backendServiceTimeDifference + fromCityId + '/' + toCityId)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
      });

  };

  const timeZoneApiCall = cityname => {
    return fetch('https://24timezones.com/converter/suggest?term=' + cityname + '&lang=en')
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          data.items.forEach(rec => {
            setCityData(map => new Map(map.set(rec.text, rec.id)))
          })
        }
        return data.items ? data.items : [];
      });
  }


  useEffect(() => {
    timeZoneApiCall(fromCity).then(response => {
      setFromCities(response)
    });
  }, [fromCity]);

  useEffect(() => {
    timeZoneApiCall(toCity).then(response => {
      setToCities(response)
    });
  }, [toCity]);

  return (
    <div >
      <Row>
        <Col offset={8}>
          <p>Timezone data </p>
          <Space direction="vertical">
            <Row>
              <Space>
                <Col flex={4}>
                  <Input.Search size="large" placeholder="Your/From City" enterButton
                    value={fromCity} name="fromCity" list="fromcities" onChange={handleFromCityOnChange} autoFocus autoComplete="off" />
                  <CityList list={fromCities} id="fromcities"></CityList>
                </Col>
                <Col flex={4}>
                  <Input.Search size="large" placeholder="Destination City" enterButton
                    value={toCity} name="toCity" list="tocities" onChange={handleToCityOnChange} autoComplete="off" />
                  <CityList list={toCities} id="tocities"></CityList>
                </Col>
              </Space>
            </Row>
            <Row justify="center">
              <Col flex={4}>
                <Button type="primary" icon={<SearchOutlined />} onClick={getTimeDifference}>Find Time Difference </Button>
                <p><b> {fromCity} to {toCity}</b></p>
              </Col>
            </Row>
          </Space>
        </Col>


      </Row>


      <Row>
        <Col flex="auto">
          <Divider orientation="left">Note</Divider>
          <List
            size="small"
            bordered
            dataSource={message}
            renderItem={item => <List.Item><p>{item}</p></List.Item>}
          />

        </Col>
      </Row>


    </div>
  );
}


export default Timezone;