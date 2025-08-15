"use client";

import styles from "./loader.module.css";

export default function Loader() {
	return (
		<div className={styles["lds-roller"]}>
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i}></div>
			))}
		</div>
	);
}
