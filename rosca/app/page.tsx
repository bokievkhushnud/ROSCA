import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
