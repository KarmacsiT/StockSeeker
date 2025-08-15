import { z } from "zod";
import { StockQuote } from "./interfaces/stockQuote";
import { TickerSearchInfo } from "./interfaces/tickerSearchInfo";

const searchStocksItemSchema = z.object({
	"1. symbol": z.string(),
	"2. name": z.string(),
	"3. type": z.string(),
	"4. region": z.string(),
	"5. marketOpen": z.string(),
	"6. marketClose": z.string(),
	"7. timezone": z.string(),
	"8. currency": z.string(),
	"9. matchScore": z.string(),
});

const searchStocksResponseSchema = z.object({
	bestMatches: z.array(searchStocksItemSchema),
});

export async function searchStocks(
	term: string
): Promise<TickerSearchInfo[] | undefined> {
	try {
		const response = await fetch(
			`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
			{ cache: "force-cache" }
		);

		if (!response.ok)
			throw new Error(`Request failed! Status: ${response.status}`);

		const data = await response.json();
		const validatedStockResults = searchStocksResponseSchema.parse(data);

		const stocks: TickerSearchInfo[] = validatedStockResults.bestMatches.map(
			(item) => ({
				symbol: item["1. symbol"],
				name: item["2. name"],
				type: item["3. type"],
				region: item["4. region"],
				marketOpen: item["5. marketOpen"],
				marketClose: item["6. marketClose"],
				timezone: item["7. timezone"],
				currency: item["8. currency"],
				matchScore: item["9. matchScore"],
			})
		);

		return stocks;
	} catch (error) {
		console.error("Failed to search stocks by keyword:", error);
		return undefined;
	}
}

const globalQuoteItemSchema = z.object({
	"01. symbol": z.string(),
	"02. open": z.string(),
	"03. high": z.string(),
	"04. low": z.string(),
	"05. price": z.string(),
	"06. volume": z.string(),
	"07. latest trading day": z.string(),
	"08. previous close": z.string(),
	"09. change": z.string(),
	"10. change percent": z.string(),
});

const globalQuoteResponseSchema = z.object({
	"Global Quote": globalQuoteItemSchema,
});

export async function getStockQuote(
	symbol: string
): Promise<StockQuote | string> {
	try {
		const response = await fetch(
			`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
			{ cache: "force-cache" }
		);

		if (!response.ok)
			throw new Error(`Request failed! Status: ${response.status}`);

		const data = await response.json();
		const validatedStockQuote = globalQuoteResponseSchema.parse(data);
		const globalQuote = validatedStockQuote["Global Quote"];

		const quote: StockQuote = {
			symbol: globalQuote["01. symbol"],
			open: globalQuote["02. open"],
			high: globalQuote["03. high"],
			low: globalQuote["04. low"],
			price: globalQuote["05. price"],
			volume: globalQuote["06. volume"],
			latestTradingDay: new Date(
				globalQuote["07. latest trading day"]
			).toLocaleDateString("en"),
			previousClose: globalQuote["08. previous close"],
			change: `${globalQuote["09. change"]} (${globalQuote["10. change percent"]})`,
		};

		return quote;
	} catch (error) {
		console.error("Failed to fetch stock quote:", error);
		return `Couldn\'t get stock quote for ${symbol}. Please try again!`;
	}
}
