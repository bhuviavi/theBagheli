/* Navbar Component */
"use client";
import React from "react";
import Link from "next/link";

import LoadingPulse from "@/Components/LoadingPulse";
import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";
import { BiVideoPlus } from "react-icons/bi";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const BannerSeries = () => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			"posts?per_page=8&_fields[]=title&_fields[]=slug&_fields[]=featured_media&_fields[]=featured_media_src_url&_fields[]=excerpt",
		fetcher
	);

	var TopFive = [
		{
			title: "",
			brief: "",
			thumb: "",
			link: "",
			position: 1,
		},
	];
	if (isLoading == false) {
		//console.log(data);
	}

	return (
		<>
			<div className="newsPanel" style={{ marginTop: 20 }}>
				<div className="col">
					{isLoading ? (
						<LoadingPulse />
					) : (
						<>
							<div className="FullCard">
								<div className="FullCard_thumb">
									<img src={data[0].featured_media_src_url} />
								</div>

								<div className="fc_content">
									<Link href={"/post/" + data[0].slug}>
										<div className="FullCard_title">
											{data[0].title.rendered}
										</div>
									</Link>
									<div className="FullCard_main">
										<p
											dangerouslySetInnerHTML={{
												__html: data[0].excerpt
													.rendered,
											}}
										></p>
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				<div className="col">
					{isLoading ? (
						<LoadingPulse />
					) : (
						<div className="SquareContaner">
							{data
								.filter((item: any, index: number) => index < 4)
								.map(
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
										},
										index: React.Key | null | undefined
									) => {
										return (
											<div
												className="squareCard"
												key={"bannerSeries_" + index}
											>
												<Link
													href={"/post/" + item.slug}
												>
													<div className="squareCard_thumb">
														<img
															src={
																item.featured_media_src_url
															}
														/>
													</div>{" "}
													<div className="squareCard_title">
														{item.title.rendered}
													</div>
												</Link>
											</div>
										);
									}
								)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default BannerSeries;
