"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html className="min-h-screen bg-[#121212] flex items-center justify-center">
			<body className="flex items-center justify-center min-h-screen w-full">
				<div className="max-w-md w-full bg-[#1E1E1E] shadow-lg rounded-2xl p-6 flex flex-col items-center">
					<h2 className="text-2xl font-extrabold mb-4 text-[#BB86FC] text-center">
						Unexpected error occurred
					</h2>
					<p className="text-white text-center mb-6">
						Please reload the website and try again.
					</p>
					<button
						onClick={reset}
						className="bg-[#BB86FC] hover:bg-[#9b63e0] text-white font-bold py-2 px-4 rounded-xl transition-colors"
					>
						Reload
					</button>
				</div>
			</body>
		</html>
	);
}
