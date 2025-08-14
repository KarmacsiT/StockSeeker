import clsx from "clsx";
import { robotoFlex } from "../fonts";

export default function Heading({ content }: { content: string }) {
	return (
		<h2
			className={clsx(
				robotoFlex.className,
				"text-2xl font-semibold text-[#BB86FC] mb-4"
			)}
		>
			{content}
		</h2>
	);
}
