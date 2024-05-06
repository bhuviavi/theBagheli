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
import { useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
	const pathname = usePathname();
	const postSlug = pathname.split("/")[2];
	const categorySlug = pathname.split("/")[1];
	const [whatsappShare, setWhatsappShare] = useState("");

	const { data, error, isLoading } = useSWR(
		apiService.API_URL + "posts?slug=" + postSlug,
		fetcher
	);

	if (!isLoading) {
		console.log(data);
		if (whatsappShare == "") {
			setWhatsappShare(
				data[0].title.rendered +
					" " +
					"https://www.thebagheli.com" +
					pathname
			);
		}
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
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.0.1/skins/content/default/content.min.css"
					integrity="sha512-AQlh8pNI8GdH0sbUsSACzz37sCq68PohXzXYt/YOJt581nIiqnMjF4YM9lp5YVBMLR90GzkJLQNQjcfLn2yhUA=="
				/>
			</Head>{" "}
			<div className="container" id="postB">
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
								<a
									href="https://Instagram.com/thebagheli"
									target="_blank"
								>
									<img
										src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-512.png"
										alt="Instagram"
										style={{ width: 22, height: 22 }}
									/>
								</a>
								<a
									href="https://Twitter.com/TheBagheli"
									target="_blank"
								>
									<img
										src="https://zeevector.com/wp-content/uploads/New-Twitter-Square-logo-PNG-Vector.png"
										alt="Instagram"
										style={{ width: 22, height: 22 }}
									/>
								</a>
								<a
									href=" https://Facebook.com/Baghelinews"
									target="_blank"
								>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
										alt="Instagram"
										style={{ width: 22, height: 22 }}
									/>
								</a>
								<a
									href={
										"https://api.whatsapp.com/send?text=" +
										whatsappShare
									}
									target="_blank"
								>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
										alt="Instagram"
										style={{ width: 22, height: 22 }}
									/>
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
