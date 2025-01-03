const PageContent = ({ children, title }) => {
	return (
		<div className="max-w-7xl min-h-screen text-gray-900">
			<h1 className="text-2xl font-bold">{title}</h1>
			<main className="flex flex-col gap-8">{children}</main>
		</div>
	);
};

export default PageContent;
