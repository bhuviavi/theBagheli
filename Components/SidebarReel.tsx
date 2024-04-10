/* Navbar Component */
"use client";
import React from "react";
import Link from "next/link";

import LoadingPulse from "@/Components/LoadingPulse";
import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const SidebarReel = () => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			"posts?per_page=4&_fields[]=title&_fields[]=slug&_fields[]=featured_media&_fields[]=featured_media_src_url",
		fetcher
	);

	if (!isLoading) {
		//console.log(data);
	}

	return (
		<>
			<div
				className="container news_reel_parent"
				style={{
					marginTop: 20,
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					padding: 0,
				}}
			>
				{isLoading ? (
					<LoadingPulse />
				) : (
					<>
						{data.map(
							(
								item: {
									slug: string;
									featured_media_src_url: string | undefined;
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
									<Link
										href={"/post/" + item.slug}
										key={"reel_sidebar" + index}
									>
										{" "}
										<div className="horizontalCard">
											<div className="horizontalCard_thumb">
												<img
													src={
														item.featured_media_src_url
													}
												/>
											</div>
											<div className="horizontalCard_title">
												{item.title.rendered}
											</div>
										</div>{" "}
									</Link>
								);
							}
						)}
					</>
				)}
			</div>
		</>
	);
};
export default SidebarReel;
