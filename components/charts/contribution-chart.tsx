"use client";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

interface ContributionChartProps {
	data: {
		createdAt: Date;
		_sum: {
			amount: number;
		};
	}[];
}

export default function ContributionChart({ data }: ContributionChartProps) {
	const chartData = data.map((item) => ({
		date: new Date(item.createdAt).toLocaleDateString("en-US", {
			month: "short",
		}),
		amount: item._sum.amount,
	}));

	return (
		<div className="h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip
						formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
					/>
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#3b82f6"
						strokeWidth={2}
						dot={{ fill: "#3b82f6" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
