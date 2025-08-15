import Loader from "./ui/loader";

export default function Loading() {
	return (
		<section className="w-full mt-10 max-w-2xl min-h-190 flex items-center justify-center">
			<Loader />
		</section>
	);
}
