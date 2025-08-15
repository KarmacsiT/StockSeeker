interface QuoteRowProps {
	label: string;
	value?: string;
	isPrice?: boolean;
	isChange?: boolean;
}

export default function QuoteRow({
	label,
	value,
	isPrice,
	isChange,
}: QuoteRowProps) {
	const numValue = parseFloat(value ?? "0");
	const displayValue =
		value === undefined || value === null || value === "" ? "-" : value;
	const textColor = isChange
		? numValue >= 0
			? "text-green-500 font-bold"
			: "text-red-500 font-bold"
		: isPrice
		? "text-green-500 font-bold"
		: "";

	return (
		<div>
			<p className="font-semibold text-[#90A4AE]">{label}:</p>
			<p className={textColor}>{displayValue}</p>
		</div>
	);
}
