export default function ErrorModule({
	errorMessage,
}: {
	errorMessage: string;
}) {
	if (!errorMessage) return null;

	return (
		<div className="min-h-screen bg-transparent flex items-start justify-start p-6">
			<div className="max-w-md w-full bg-[#1E1E1E] shadow-lg rounded-2xl p-6 flex flex-col items-start">
				<h1 className="text-2xl font-extrabold mb-4 text-[#BB86FC]">Error</h1>
				<p className="text-white text-base">{errorMessage}</p>
			</div>
		</div>
	);
}
