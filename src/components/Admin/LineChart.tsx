
"use client"

import React, {  useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const  LineChartComponet=({chartData,XAxisData,YAxisData}:{
  chartData: unknown[];
  XAxisData: string;
  YAxisData: string;
})=> {
  




    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={XAxisData} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={YAxisData} stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    );

}


export default LineChartComponet