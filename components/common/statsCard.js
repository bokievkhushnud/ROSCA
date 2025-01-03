import Card from "@/components/common/card";

export default function StatsCard({ title, value }) {
  return (
    <Card className="p-4">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </Card>
  );
}