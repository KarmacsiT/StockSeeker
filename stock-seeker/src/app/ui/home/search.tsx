"use client";

import { searchStocks } from "@/app/lib/alphaVantageApi";
import { TickerSearchInfo } from "@/app/lib/interfaces/tickerSearchInfo";
import clsx from "clsx";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [searchResult, setSearchResults] = useState<TickerSearchInfo[]>([]);

	const ref = useRef<HTMLDivElement | null>(null);

	const { push } = useRouter();

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node))
			setShowDropdown(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearch = useDebouncedCallback(async (searchTerm) => {
		if (searchTerm) {
			setInputValue(searchTerm);
			const stocksByKeyword = await searchStocks(searchTerm);
			if (stocksByKeyword) setSearchResults(stocksByKeyword);
		}
		setShowDropdown(searchTerm?.trim().length > 0);
	}, 300);

	return (
		<div
			className="relative w-full max-w-xl"
			ref={ref}
			onClick={async () =>
				inputValue?.length && (await handleSearch(inputValue))
			}
		>
			<div
				className={clsx(
					"relative w-full border border-[#2C2C2C] bg-[#1E1E1E] shadow-sm focus-within:ring-2 focus-within:ring-[#BB86FC]",
					"pl-10 pr-3 py-2 sm:pl-12 sm:pr-5 sm:py-3",
					{ "rounded-t-lg": showDropdown, "rounded-full": !showDropdown }
				)}
			>
				<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CFD8DC] text-sm sm:text-base" />

				<Form action="/search">
					<input
						className="w-full bg-transparent text-white placeholder-[#CFD8DC] outline-none text-sm sm:text-base"
						name="symbol"
						type="text"
						placeholder={placeholder}
						onChange={async (e) => await handleSearch(e.target.value)}
					/>

					{showDropdown && (
						<ul className="absolute top-full left-0 w-full bg-[#2C2C2C] border border-[#444] rounded-b-lg shadow-lg z-10">
							{searchResult.length > 0 ? (
								searchResult.map((item, index) => (
									<li
										key={index}
										className="px-3 sm:px-4 py-2 text-white hover:bg-[#3A3A3A] text-sm cursor-pointer sm:text-base"
										onClick={() => push(`/search?symbol=${item.symbol}`)}
									>
										{`${item.symbol} - ${item.name}`}
									</li>
								))
							) : (
								<li className="px-3 sm:px-4 py-2 text-gray-400 text-sm sm:text-base">
									No results
								</li>
							)}
						</ul>
					)}
				</Form>
			</div>
		</div>
	);
}
