import { StockQuote } from "@/app/lib/interfaces/stockQuote";
import QuoteRow from "./quoteRow";

export default function QuoteOverview({
	quoteData,
}: {
	quoteData: StockQuote;
}) {
	const {
		open,
		high,
		low,
		price,
		volume,
		latestTradingDay,
		previousClose,
		change,
	} = quoteData;

	const formatNumber = (value?: string) => {
		const num = Number(value);
		return isNaN(num) ? "-" : num.toLocaleString();
	};

	return (
		<div className="min-h-screen bg-transparent flex items-start justify-start p-6">
			<div className="max-w-md w-full bg-[#1E1E1E] shadow-lg rounded-2xl p-6">
				<h1 className="text-2xl font-extrabold mb-6 text-[#BB86FC]">
					{quoteData.symbol
						? `${quoteData.symbol} Stock Overview`
						: "Stock Overview"}
				</h1>

				<div className="grid grid-cols-2 gap-y-3 gap-x-4 text-white">
					<QuoteRow label="Open" value={open} />
					<QuoteRow label="Previous Close" value={previousClose} />
					<QuoteRow label="High" value={high} />
					<QuoteRow label="Low" value={low} />
					<QuoteRow label="Price" value={price} isPrice />
					<QuoteRow label="Volume" value={formatNumber(volume)} />
					<QuoteRow label="Latest Trading Day" value={latestTradingDay} />
					<QuoteRow label="Change" value={change} isChange />
				</div>
			</div>
		</div>
	);
}
