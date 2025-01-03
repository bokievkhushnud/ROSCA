"use client";

import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const navigation = [
	{ name: "Dashboard", href: "/", current: true },
	{ name: "Admin", href: "/admin", current: false },
	// { name: 'Team', href: '#', current: false },
	// { name: 'Projects', href: '#', current: false },
	// { name: 'Calendar', href: '#', current: false },
	// { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
	{ name: "Profile", href: "/profile" },
	// { name: "Settings", href: "/settings" },
	{ name: "Sign out", href: "/api/auth/logout" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const pathname = usePathname();
	const { user, isLoading } = useUser();

	return (
		<>
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-gray-800 ">
					<div className="mx-auto max-w-7xl px-4 sm:px-6">
						<div className="flex h-16 items-center justify-between">
							<div className="flex items-center">
								<div className="shrink-0">
									<Image
										alt="GAJA"
										src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
										className="size-8"
										width={32}
										height={32}
									/>
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												aria-current={item.current ? "page" : undefined}
												className={classNames(
													item.href === pathname
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium",
												)}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className="hidden md:block">
								<div className="ml-4 flex items-center md:ml-6">
									<button
										type="button"
										className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon aria-hidden="true" className="size-6" />
									</button>

									{/* Profile dropdown */}
									{user ? (
										<Menu as="div" className="relative ml-3">
											<div>
												<MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img
														alt=""
														src={user?.picture}
														className="size-8 rounded-full"
													/>
												</MenuButton>
											</div>
											<MenuItems
												transition
												className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
											>
												{/* TODO: show user email and name */}
												<div className="px-4 py-2 text-sm text-gray-700">
													<p className="font-semibold">{user.name}</p>
													<p className="text-gray-500 text-xs">{user.email}</p>
												</div>
												{userNavigation.map((item) => (
													<MenuItem key={item.name}>
														<a
															href={item.href}
															className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
														>
															{item.name}
														</a>
													</MenuItem>
												))}
											</MenuItems>
										</Menu>
									) : (
										// TODO: Add login button
										<>
											<a
												href="/api/auth/login"
												className="inline-block rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
											>
												Login
											</a>
										</>
									)}
								</div>
							</div>
							<div className="-mr-2 flex md:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									<Bars3Icon
										aria-hidden="true"
										className="block size-6 group-data-[open]:hidden"
									/>
									<XMarkIcon
										aria-hidden="true"
										className="hidden size-6 group-data-[open]:block"
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="md:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									aria-current={item.current ? "page" : undefined}
									className={classNames(
										item.href === pathname
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium",
									)}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>

						<div className="border-t border-gray-700 pb-3 pt-4">
							{user ? (
								<>
									<div className="flex items-center px-5">
										<div className="shrink-0">
											<img
												alt=""
												src={user?.picture}
												className="size-10 rounded-full"
											/>
										</div>
										<div className="ml-3">
											<div className="text-base/5 font-medium text-white">
												{user.name}
											</div>
											<div className="text-sm font-medium text-gray-400">
												{user.email}
											</div>
										</div>
										<button
											type="button"
											className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">View notifications</span>
											<BellIcon aria-hidden="true" className="size-6" />
										</button>
									</div>
									<div className="mt-3 space-y-1 px-2">
										{userNavigation.map((item) => (
											<DisclosureButton
												key={item.name}
												as="a"
												href={item.href}
												className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
											>
												{item.name}
											</DisclosureButton>
										))}
									</div>
								</>
							) : (
								<div className=" px-2">
									<DisclosureButton
										as="a"
										href="/api/auth/login"
										className="block rounded-md px-3 py-2 text-base text-gray-400 hover:text-white"
									>
										Sign in
									</DisclosureButton>
								</div>
							)}
						</div>
					</DisclosurePanel>
				</Disclosure>
			</div>
		</>
	);
}
