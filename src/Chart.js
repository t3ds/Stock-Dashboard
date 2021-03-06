import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(Date, Price) {
  return { Date, Price };
}

var data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart({graphData}) {
  const theme = useTheme();

  React.useEffect(()=>{
   if(!graphData){
     console.log("ayo")
    }

  else{

    var new_data = [];

    for(var i=0; i<graphData.length; i++){
      new_data.push(createData(graphData[i]["Date"], graphData[i]["Price"]))
    }

  {/*data = new_data*/}
    console.log(graphData.length)
  }
  },[graphData]);

  if(graphData !== null){
    data = graphData
  }

  return (
    <React.Fragment>
      <Title>Past 30 Days</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="Date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Price
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="Price" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}