import Heading from "./ui/home/heading";
import StockCard from "./ui/home/stock-card";

export default function Home() {
	const popularStocks = [
		{ symbol: "AAPL", name: "Apple Inc." },
		{ symbol: "GOOGL", name: "Alphabet Inc." },
		{ symbol: "AMZN", name: "Amazon.com Inc." },
		{ symbol: "TSLA", name: "Tesla Inc." },
	];

	return (
		<section className="w-full max-w-2xl min-h-screen">
			<Heading content="Popular Stocks"></Heading>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{popularStocks.map((stock) => (
					<StockCard key={stock.symbol} stock={stock} />
				))}
			</div>
		</section>
	);
}
