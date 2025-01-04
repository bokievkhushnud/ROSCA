
import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ROSCA App",
	description: "Manage your ROSCA contributions and loans",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
				<UserProvider>
					<body className={`${inter.className} min-h-screen bg-gray-50`}>
						<div className="flex flex-col min-h-screen">
							<Header />
						<main className="flex-1">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
								{children}
							</div>
						</main>
						<footer className="bg-white border-t py-6">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<p className="text-sm text-gray-500 text-center">
									© {new Date().getFullYear()} ROSCA. All rights reserved.
								</p>
							</div>
						</footer>
					</div>
					</body>
				</UserProvider>
		</html>
	);
}
