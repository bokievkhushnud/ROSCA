"use client";
import { useState } from "react";
import type { Contribution, Loan, User } from "@prisma/client";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ContributionForm from "@/components/forms/contribution-form";
import type { ContributionFormData } from "@/types/contributions";
import Modal from "@/components/ui/modal";

interface ContributionTableProps {
	contributions: Partial<Contribution>[];
	users: Partial<User>[];
	loans: Partial<Loan>[];
}

export default function ContributionTable({
	contributions,
	users,
	loans,
}: ContributionTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const itemsPerPage = 10;

	const filteredContributions = contributions.filter(
		(contribution) =>
			Object.values(contribution).some(
				(value) =>
					value &&
					String(value).toLowerCase().includes(searchTerm.toLowerCase()),
			) ||
			(contribution.user &&
				Object.values(contribution.user).some(
					(userValue) =>
						userValue &&
						String(userValue).toLowerCase().includes(searchTerm.toLowerCase()),
				)),
	);

	const totalPages = Math.ceil(filteredContributions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedContributions = filteredContributions.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const handleSubmit = (data: ContributionFormData) => {
		setIsModalOpen(false);
	};

	return (
		<div className="space-y-6">
			<section className="bg-white rounded-lg shadow-sm p-6">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-gray-900">
						Contribution Management
					</h2>
					<p className="text-sm text-gray-500 mt-1">
						Track and manage member contributions
					</p>
				</div>

				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<div className="relative">
							<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search contributions..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<button
							type="button"
							onClick={() => setIsModalOpen(true)}
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<PlusIcon className="h-4 w-4" />
							Add Contribution
						</button>
					</div>

					{contributions.length > 0 ? (
						<div className="bg-white rounded-lg shadow overflow-hidden">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Member
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Amount
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Type
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Status
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Date
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{paginatedContributions.map((contribution) => (
										<tr key={contribution.id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div>
														<div className="text-sm font-medium text-gray-900">
															{contribution.user?.firstName}{" "}
															{contribution.user?.lastName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												${contribution.amount?.toFixed(2)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{contribution.contributionType}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
														contribution.status === "RECEIVED"
															? "bg-green-100 text-green-800"
															: contribution.status === "PENDING"
																? "bg-yellow-100 text-yellow-800"
																: "bg-red-100 text-red-800"
													}`}
												>
													{contribution.status}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{contribution.createdAt?.toLocaleDateString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="text-center text-gray-500">
							No contributions found
						</div>
					)}

					{/* Pagination */}
					<div className="flex justify-between items-center">
						<div className="text-sm text-gray-700">
							Showing {startIndex + 1} to{" "}
							{Math.min(
								startIndex + itemsPerPage,
								filteredContributions.length,
							)}{" "}
							of {filteredContributions.length} results
						</div>
						<div className="flex gap-2">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<button
										type="button"
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`px-3 py-1 rounded ${
											currentPage === page
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{page}
									</button>
								),
							)}
						</div>
					</div>
				</div>

				{/* Modal */}
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title="Add New Contribution"
				>
					<ContributionForm
						onSubmit={handleSubmit}
						users={users}
						loans={loans}
					/>
				</Modal>
			</section>
		</div>
	);
}
