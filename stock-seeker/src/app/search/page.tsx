import { redirect } from "next/navigation";
import { getStockQuote } from "../lib/alphaVantageApi";
import QuoteOverview from "../ui/search/quoteOverview";

export default async function StockQuote({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { symbol } = await searchParams;

	if (!symbol || typeof symbol !== "string") redirect(`/`);

	const stockData = await getStockQuote(symbol);

	if (!stockData) redirect(`/`);

	return <QuoteOverview quoteData={stockData} />;
}
