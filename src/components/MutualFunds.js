import React, { useState, useEffect } from 'react';
import { Table} from 'antd'
function MutualFunds() {

    const [mfData, setMfData] = useState([]);
    const rowItems = mfData.map((d) => <tr key={d.id}><td><a href={'https://api.mfapi.in/mf/'+d.schemeCode}>{d.schemeCode}</a></td><td> {d.schemeName}</td></tr>);
    

    const columns = [
      {
        title: 'Scheme Code',
        dataIndex: 'schemeCode',
        sorter: (a, b) => a.schemeCode - b.schemeCode,
        sortDirections: ['descend'],
        render: text => <a href={'https://api.mfapi.in/mf/'+text}>{text}</a>
      },
      {
        title: 'Scheme Name',
        dataIndex: 'schemeName',
        sorter: (a, b) =>{
          if (a.schemeName > b.schemeName) {
            return -1;
        }
        if (b.schemeName > a.schemeName) {
            return 1;
        }
        return 0;

        },
        sortDirections: ['descend'],

      },
    ];

    useEffect(() => {
      console.log("MF data");
        fetch('https://api-backend-service.herokuapp.com/api/v1/getAllMutualFunds')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          data.forEach((record,index)=>{
            record.id=index
            })
          setMfData(data);
        });
      }, []);

  return (
    <div >
      <p>MF data </p>
      <Table dataSource={mfData} columns={columns} />;
        {/* <Table  bordered hover  responsive='sm'>
        <thead>
            <tr>
                <th>Scheme Code</th>
                <th>Scheme Name</th>
            </tr>
        </thead>
        <tbody>
        { rowItems}
        </tbody>
        </Table> */}
    </div>
  );
}


export default MutualFunds;