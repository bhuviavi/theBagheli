"use client";
import Head from "next/head";
import CategoryNewsList from "@/Components/CategoryNewsList";
import SidebarReel from "@/Components/SidebarReel";
import BreadHeading from "@/Components/BreadHeading";
import { FaMagic } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import apiService from "@/_services/api-service";
import LoadingPulse from "@/Components/LoadingPulse";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Category() {
	const pathname = usePathname();

	const category = pathname.split("/")[2];
	console.log(category);
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`categories?slug=${category}&_fields[]=name&_fields[]=slug&_fields[]=id`,
		fetcher
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
					integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
				/>
			</Head>{" "}
			<div className="container">
				<div className="post_page">
					{isLoading ? (
						<LoadingPulse />
					) : (
						<div className="post_content">
							<div className="post_heading"> {data[0].name}</div>
							<div className="AD_BOX"></div>

							<div className="post_body" style={{ padding: 0 }}>
								<CategoryNewsList
									props={{ category: data[0].id }}
								/>
							</div>

							<div className="AD_BOX"></div>
						</div>
					)}
					<div className="col_sidebar">
						<div className="AD_BOX" style={{ height: 250 }}>
							{" "}
							Advertisement
						</div>
						<BreadHeading
							title="Headlines"
							icon={<FaMagic />}
							link={"/"}
						/>

						<SidebarReel />

						<div className="AD_BOX"></div>
					</div>
				</div>
				<div className="AD_BOX"></div>
			</div>
		</>
	);
}
