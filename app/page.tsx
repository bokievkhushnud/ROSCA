import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import ContributionChart from "@/components/charts/contribution-chart";
import LoanDistributionChart from "@/components/charts/loan-distribution-chart";
import { 
  BanknotesIcon, 
  UserGroupIcon, 
  ArrowTrendingUpIcon,
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

async function getStatistics() {
  // Get total contributions
  const prisma = new PrismaClient();
  const totalContributions = await prisma.contribution.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "RECEIVED",
    },
  });

  // Get total active loans
  const activeLoans = await prisma.loan.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "ACTIVE",
    },
  });

  // Get total interest earned
  const totalInterest = await prisma.loan.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "PAID",
    },
  });

  // Get total members
  const totalMembers = await prisma.user.count({
    where: {
      status: "ACTIVE",
      role: "USER",
    },
  });

  // Get recent activities
  const recentActivities = await prisma.contribution.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  const monthlyContributions = await prisma.contribution.groupBy({
    by: ['createdAt'],
    _sum: {
      amount: true,
    },
    where: {
      status: "RECEIVED",
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 6)), // Last 6 months
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Get loan distribution data
  const loanDistribution = await prisma.loan.groupBy({
    by: ['status'],
    _sum: {
      amount: true,
    },
  });


  return {
    totalContributions: totalContributions._sum.amount || 0,
    activeLoans: activeLoans._sum.amount || 0,
    totalInterest: totalInterest._sum.amount || 0,
    totalMembers,
    recentActivities,
    monthlyContributions,
    loanDistribution,
  };



}

export default async function Dashboard() {
  const stats = await getStatistics();

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Contributions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contributions</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.totalContributions.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <BanknotesIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Loans */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Loans</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.activeLoans.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Total Interest Earned */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interest Earned</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.totalInterest.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Members */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalMembers}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

       {/* Charts Section */}
       <div className="grid gap-6 md:grid-cols-2">
        {/* Contribution Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contribution Trends</h2>
          <ContributionChart data={stats.monthlyContributions} />
        </div>

        {/* Loan Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Distribution</h2>
          <LoanDistributionChart data={stats.loanDistribution} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {stats.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.user.firstName} {activity.user.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.contributionType} - {activity.status}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  ${activity.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}