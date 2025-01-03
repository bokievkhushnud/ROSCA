"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const links = [
	{ href: "/", label: "Dashboard" },
	{ href: "/admin", label: "Admin" },
];

export default function Header() {
	const { user, error, isLoading } = useUser();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<header className="border-b">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<div className="flex items-center">
					<Link href="/" className="flex items-center">
						<span className="text-xl font-bold">ROSCA</span>
					</Link>
				</div>

				<nav className="flex items-center gap-6">
					{user && (
						<ul className="flex gap-6">
							{links.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="hover:text-gray-600">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					)}

					<div className="relative">
						{!user && (
							<a
								href="/api/auth/login"
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							>
								Login
							</a>
						)}

						{user && (
							<>
								<button
									type="button"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center gap-2"
								>
									{user.picture ? (
										<Image
											src={user.picture}
											alt={user.name || "Profile"}
											width={32}
											height={32}
											className="rounded-full"
										/>
									) : (
										<UserCircleIcon className="w-8 h-8 text-gray-500" />
									)}
								</button>

								{isDropdownOpen && (
									<div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border">
										<div className="px-4 py-2 border-b">
											<p className="text-sm font-medium text-gray-900">
												{user.name}
											</p>
											<p className="text-sm text-gray-500">{user.email}</p>
										</div>
										<Link
											href="/profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setIsDropdownOpen(false)}
										>
											Profile
										</Link>
										<a
											href="/api/auth/logout"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Logout
										</a>
									</div>
								)}
							</>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
}
