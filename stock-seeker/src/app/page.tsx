import Heading from "./ui/home/heading";
import StockCard from "./ui/home/stock-card";

export default function Home() {
	const trendingStocks = [
		{ symbol: "NVDA", name: "NVIDIA Corporation" },
		{ symbol: "AAPL", name: "Apple Inc." },
		{ symbol: "GOOGL", name: "Alphabet Inc." },
		{ symbol: "AMZN", name: "Amazon.com Inc." },
		{ symbol: "TSLA", name: "Tesla Inc." },
		{ symbol: "IBM", name: "IBM Corporation" },
		{ symbol: "BRK.B", name: "Berkshire Hathaway Inc." },
		{ symbol: "MSFT", name: "Microsoft Corporation" },
	];

	return (
		<section className="w-full mt-10 max-w-2xl min-h-screen">
			<Heading content="Trending Stocks"></Heading>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{trendingStocks.map((stock) => (
					<StockCard key={stock.symbol} stock={stock} />
				))}
			</div>
		</section>
	);
}
