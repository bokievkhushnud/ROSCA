// components/common/table.js

const Table = ({ items, headers, onDelete, onEdit, onAdd, title }) => {
	return (
		<div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Table Header with Add Button */}
			<div className="flex justify-between items-center p-5 border-b border-gray-200 rounded-t-lg">
				<h2 className="text-xl text-gray-800 font-semibold">{title}</h2>
				{onAdd && (
					<button
						type="button"
						onClick={onAdd}
						className="inline-flex items-center px-4 py-2 
                         bg-cyan-600 hover:bg-cyan-700
                         text-white text-sm font-medium 
                         rounded-md transition-colors duration-150 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1
                         shadow-sm hover:shadow-md"
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						Add New
					</button>
				)}
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					{/* Table Head */}
					<thead>
						<tr className="bg-gray-50">
							{headers.map((header) => (
								<th
									key={header}
									className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									{header}
								</th>
							))}
							{(onEdit || onDelete) && (
								<th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Actions
								</th>
							)}
						</tr>
					</thead>
					{/* Table Body */}
					<tbody className="bg-white divide-y divide-gray-100">
						{items.map((item, rowIndex) => (
							<tr
								key={item.id}
								className={`transition-colors duration-150 ease-in-out hover:bg-gray-50 ${
									rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
								}`}
							>
								{headers.map((header) => (
									<td
										key={header}
										className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
									>
										{item[header.toLowerCase()]}
									</td>
								))}
								{(onEdit || onDelete) && (
									<td className="px-4 py-3 whitespace-nowrap text-right">
										<div className="flex justify-end gap-4">
											{onEdit && (
												<button
													type="button"
													onClick={() => onEdit(item)}
													className="text-teal-600 hover:text-teal-800
                                       font-medium text-sm inline-flex items-center
                                       transition-colors duration-150
                                       focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1"
												>
													<svg
														aria-hidden="true"
														className="w-4 h-4 mr-1"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                                   a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/>
													</svg>
													Edit
												</button>
											)}
											{onDelete && (
												<button
													type="button"
													onClick={() => onDelete(item)}
													className="text-rose-500 hover:text-rose-700
                                       font-medium text-sm inline-flex items-center
                                       transition-colors duration-150
                                       focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-1"
												>
													<svg
														aria-hidden="true"
														className="w-4 h-4 mr-1"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 
                                   7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 
                                   1 0 00-1 1v3M4 7h16"
														/>
													</svg>
													Delete
												</button>
											)}
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
