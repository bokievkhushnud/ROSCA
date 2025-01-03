import Card from "@/components/common/card";

export default function TransactionsList() {
  // Example data
  const transactions = [
    { id: 1, user: "Alice", amount: 300, type: "Contribution", date: "2024-05-01" },
    { id: 2, user: "Bob", amount: -200, type: "Loan Repayment", date: "2024-05-02" },
    { id: 3, user: "Carol", amount: 100, type: "FINE", date: "2024-05-03" },
  ];

  return (
    <div className="mt-2">
      <ul className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {tx.type} by {tx.user}
                </p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  tx.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.amount >= 0 ? `+${tx.amount}` : tx.amount}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}