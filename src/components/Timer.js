import React, { useState, useEffect } from 'react';
import { List, Row, Col, Divider } from 'antd';

function Timer() {
    const [currentTime, setCurrentTime] = useState(new Date().toGMTString())

    useEffect(() => {
        console.log("timer useeffect")
        // returned function will be called on component unmount 
        // return () => {
        //     console.log("unmount")
        //     clearTimeout(myTimeout);
        // }
    }, [])
    const myTimeout = setTimeout(() => {
        setCurrentTime(new Date().toGMTString());
    }, 1000)


    return (
        <div >
            <Row>
                <Col span={8} offset={8}>
                    <div>{currentTime}</div>
                </Col>
            </Row>
        </div>
    );
}


export default Timer;