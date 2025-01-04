'use client'

import StatsCard from "@/components/common/statsCard";
import Graph from "@/components/common/graph";
import TransactionsList from "@/components/common/transactionList";
import Card from "@/components/common/card";

/* If you want to fetch real data, you can do so here using server logic:
export const revalidate = 60; // optional SSG revalidation
*/

export default function Dashboard() {
  // If you had server logic, it would go here:
  // const stats = await getStatsFromDB();

  return (
    <div className="space-y-6">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Pool" value="$12,000" />
        <StatsCard title="Total Loans" value="$3,500" />
        <StatsCard title="Total Contributions" value="$15,700" />
      </div>

      {/* Main Content: Graph + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph section (span 2 cols on lg) */}
        <Card className="lg:col-span-2 p-4">
          <Graph />
        </Card>

        {/* Recent transactions */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <TransactionsList />
        </Card>
      </div>
    </div>
  );
}