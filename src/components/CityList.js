import React, { useState, useEffect } from 'react';
const CityList =  React.memo( (props) => {
    return (
      <datalist id={props.id}>
      {props.list?props.list.map((d) => <option key={d.id}  >{d.text}</option>):[]}
    </datalist>
    );
  });

  export default CityList;