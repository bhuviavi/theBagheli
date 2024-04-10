"use client";
import Head from "next/head";

import CategoriesShowcase from "@/Components/CategoriesShowcase";

import { BiUser } from "react-icons/bi";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import SidebarReel from "@/Components/SidebarReel";
import BreadHeading from "@/Components/BreadHeading";
import { FaMagic } from "react-icons/fa";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import apiService from "@/_services/api-service";
import axios from "axios";
import useSWR from "swr";
import { type } from "os";
import LoadingPulse from "@/Components/LoadingPulse";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
	const pathname = usePathname();
	const postSlug = pathname.split("/")[2];
	const categorySlug = pathname.split("/")[1];

	const { data, error, isLoading } = useSWR(
		apiService.API_URL + "posts?slug=" + postSlug,
		fetcher
	);

	if (!isLoading) {
		console.log(data);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		const s = document.createElement("script");
		s.setAttribute("src", "https://platform.twitter.com/widgets.js");
		s.setAttribute("async", "true");
		document.head.appendChild(s);
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
					<div className="post_content">
						<div className="post_heading">
							{isLoading ? (
								<LoadingPulse />
							) : (
								<>{data[0].title.rendered} </>
							)}
						</div>
						<div className="post_meta">
							<div className="post_meta_item">
								<span>
									{isLoading ? (
										<LoadingPulse />
									) : (
										<>
											{new Date(
												data[0].date
											).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</>
									)}
								</span>
							</div>
							<div className="post_meta_item">
								<a href="#">
									<FiFacebook />
								</a>
								<a href="#">
									<FiTwitter />
								</a>
							</div>
						</div>

						<div className="post_image">
							{isLoading ? (
								<LoadingPulse />
							) : (
								<img
									style={{
										width: "100%",
										height: "100%",
									}}
									src={data[0].featured_media_src_url}
								/>
							)}
						</div>
						<div className="AD_BOX"></div>

						<div className="post_body">
							{isLoading ? (
								<LoadingPulse />
							) : (
								<>
									<div
										{...{
											dangerouslySetInnerHTML: {
												__html: data[0].content
													.rendered,
											},
										}}
									></div>
								</>
							)}
						</div>

						<div className="AD_BOX"></div>
					</div>
					<div className="col_sidebar" style={{ paddingTop: 0 }}>
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
