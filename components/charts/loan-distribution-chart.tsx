"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LoanDistributionChartProps {
  data: {
    status: string;
    _sum: {
      amount: number;
    };
  }[];
}

const COLORS = {
  ACTIVE: "#3b82f6",    // blue
  PENDING: "#eab308",   // yellow
  PAID: "#22c55e",      // green
  REJECTED: "#ef4444",  // red
};

export default function LoanDistributionChart({ data }: LoanDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.status,
    value: item._sum.amount,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={entry.name} 
                fill={COLORS[entry.name as keyof typeof COLORS]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value.toLocaleString()}`} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 