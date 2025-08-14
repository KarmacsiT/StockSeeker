import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";
import { montserrat, roboto } from "./ui/fonts";
import Search from "./ui/home/search";
export const metadata: Metadata = {
	title: "StockSeeker",
	description: "A stock analyzer tool powered by Alpha Vantage",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={clsx(
					roboto.className,
					"antialiased min-h-screen bg-[#121212] flex flex-col items-center px-6 text-white"
				)}
			>
				<header className="w-full border-b border-[#2C2C2C]">
					<div className={clsx("w-full px-4 py-3")}>
						<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
							<h1
								className={clsx(
									montserrat.className,
									"text-2xl font-extrabold text-[#BB86FC] sm:shrink-0 sm:text-left text-center w-full sm:w-auto"
								)}
							>
								StockSeeker
							</h1>

							<Search placeholder="Enter stock name or symbol..." />
						</div>
					</div>
				</header>

				<main>{children}</main>

				<footer className="w-full text-[#90A4AE] text-center py-6 text-sm border-t border-[#2C2C2C]">
					© {new Date().getFullYear()} StockSeeker · All rights reserved
				</footer>
			</body>
		</html>
	);
}
