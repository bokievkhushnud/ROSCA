const PageContent = ({ children }) => {
	return (
		<div className="max-w-7xl min-h-screen text-gray-900">
			<main className="flex flex-col gap-8">{children}</main>
		</div>
	);
};

export default PageContent;
