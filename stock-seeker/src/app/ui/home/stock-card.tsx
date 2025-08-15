"use client";

import { useRouter } from "next/navigation";

export default function StockCard({
	stock: { symbol, name },
}: {
	stock: { symbol: string; name: string };
}) {
	const { push } = useRouter();

	return (
		<button
			className="bg-[#1E1E1E] rounded-2xl p-5 text-center shadow-md hover:shadow-lg hover:bg-[#2A2A2A] transition"
			onClick={() => push(`/search?symbol=${symbol}`)}
		>
			<p className="text-lg font-bold text-white">{symbol}</p>
			<p className="text-sm text-[#CFD8DC]">{name}</p>
		</button>
	);
}
