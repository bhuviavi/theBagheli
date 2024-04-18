/* Navbar Component */
"use client";
import React, { useEffect } from "react";
import LoadingPulse from "@/Components/LoadingPulse";
import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
import Link from "next/link";

const Newsreel = (props: { category: any }) => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`posts?per_page=4&category=${props.category}&_fields[]=title&_fields[]=slug&_fields[]=featured_media&_fields[]=featured_media_src_url&_fields[]=excerpt&_fields[]=date`,
		fetcher
	);

	useEffect(() => {
		console.log(data);
		console.log(props.category);
	}, [data]);

	var TopFour1 = [
		{
			title: "24 अप्रैल का दिन पंचायत राज संस्थाओं और ग्रामीण विकास के लिए होगा ऐतिहासिक ",
			thumb: "https://www.thelallantop.com/_next/image?url=https%3A%2F%2Fstatic.thelallantop.com%2Fimages%2Fpost%2F1691563172794_364238575_305832058592100_7908668159619806266_n.webp%3Fwidth%3D360&w=1920&q=75",
			link: "",
			date: "24/04/2021",
		},
		{
			title: "24 अप्रैल का दिन पंचायत राज संस्थाओं और ग्रामीण विकास के लिए होगा ऐतिहासिक ",
			thumb: "https://www.thelallantop.com/_next/image?url=https%3A%2F%2Fstatic.thelallantop.com%2Fimages%2Fpost%2F1691566135023_surya_dravid.webp%3Fwidth%3D360&w=1920&q=75",
			link: "",
			date: "24/04/2021",
		},
		{
			title: "24 अप्रैल का दिन पंचायत राज संस्थाओं और ग्रामीण विकास के लिए होगा ऐतिहासिक ",
			thumb: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/01/City-Palace-Udaipur-Rajasthan.jpg",
			link: "",
			date: "24/04/2021",
		},
		{
			title: "24 अप्रैल का दिन पंचायत राज संस्थाओं और ग्रामीण विकास के लिए होगा ऐतिहासिक ",
			thumb: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/01/City-Palace-Udaipur-Rajasthan.jpg",
			link: "",
			date: "24/04/2021",
		},
	];

	return (
		<>
			<div
				className="container news_reel_parent"
				style={{
					marginTop: 20,
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				<div className="">
					<div className="horizontalSection">
						{isLoading ? (
							<LoadingPulse />
						) : (
							<>
								{data.map(
									(
										item: {
											slug: string;
											featured_media_src_url:
												| string
												| undefined;
											title: {
												rendered:
													| string
													| number
													| boolean
													| React.ReactElement<
															any,
															| string
															| React.JSXElementConstructor<any>
													  >
													| React.ReactFragment
													| React.ReactPortal
													| null
													| undefined;
											};
											date: string | number | Date;
										},
										index: React.Key | null | undefined
									) => {
										return (
											<div key={"newsreel_keyt" + index}>
												<Link
													href={"/post/" + item.slug}
												>
													<div
														className="squareCard"
														key={index}
													>
														<div className="squareCard_thumb">
															<img
																src={
																	item.featured_media_src_url
																}
															/>
														</div>
														<div className="squareCard_title">
															{
																item.title
																	.rendered
															}
														</div>
													</div>
												</Link>
											</div>
										);
									}
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default Newsreel;
