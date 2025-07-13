
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Terapias Génicas', 'Fase 1': 4, 'Fase 2': 2, 'Fase 3': 1 },
  { name: 'Inmunoterapias', 'Fase 1': 5, 'Fase 2': 3, 'Fase 3': 1 },
  { name: 'Terapias Celulares', 'Fase 1': 3, 'Fase 2': 1, 'Fase 3': 0 },
  { name: 'Neuroprotección', 'Fase 1': 6, 'Fase 2': 4, 'Fase 3': 2 },
  { name: 'Reposicionamiento', 'Fase 1': 8, 'Fase 2': 5, 'Fase 3': 3 },
];

const PipelineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" label={{ value: 'Número de Ensayos Clínicos', position: 'insideBottom', offset: -10, fontSize: 14 }} />
        <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
        <Tooltip wrapperClassName="bg-white p-2 border rounded shadow-sm text-sm" />
        <Legend wrapperStyle={{top: 0, fontSize: "14px"}}/>
        <Bar dataKey="Fase 1" stackId="a" fill="#F2CC8F" />
        <Bar dataKey="Fase 2" stackId="a" fill="#81B29A" />
        <Bar dataKey="Fase 3" stackId="a" fill="#3D405B" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PipelineChart;
