import Image from "next/image";
import styles from "./page.module.css";
import BannerSeries from "@/Components/BannerSeries";
import CategoriesShowcase from "@/Components/CategoriesShowcase";

export default function Home() {
	return (
		<>
			<div className="AD_BOX">Advertisement</div>

			<div className="container">
				<BannerSeries />
			</div>

			<div className="container">
				<CategoriesShowcase />
			</div>
		</>
	);
}
