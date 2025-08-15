import { redirect } from "next/navigation";
import { getStockQuote } from "../lib/alphaVantageApi";
import ErrorModule from "../ui/search/errorModule";
import QuoteOverview from "../ui/search/quoteOverview";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { symbol } = await searchParams;

	return {
		title: `${symbol ?? ""} Stock Overview`,
		description: `Overview of ${symbol} stock metrics`,
	};
}

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
