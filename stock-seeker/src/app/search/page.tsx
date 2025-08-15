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

	const stockDataResponse = await getStockQuote(symbol);

	if (!stockDataResponse) redirect(`/`);

	return (
		<>
			{typeof stockDataResponse === "string" ? (
				<ErrorModule errorMessage={stockDataResponse} />
			) : (
				<QuoteOverview quoteData={stockDataResponse} />
			)}
		</>
	);
}
