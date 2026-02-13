import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
			<main className="w-full max-w-xl rounded-2xl border bg-white p-10 shadow-sm">
				<h1 className="text-2xl font-semibold tracking-tight">
					ROSCA App Starter
				</h1>
				<p className="mt-3 text-sm text-slate-600">
					Next.js + TypeScript + Tailwind + shadcn/ui is ready.
				</p>
				<div className="mt-6 flex gap-3">
					<Button>Primary Action</Button>
					<Button variant="outline">Secondary</Button>
				</div>
			</main>
		</div>
	);
}
