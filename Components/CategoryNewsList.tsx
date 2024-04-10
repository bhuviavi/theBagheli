/* Navbar Component */
"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import apiService from "@/_services/api-service";
import LoadingPulse from "@/Components/LoadingPulse";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
import Link from "next/link";

const CategoryNewsList = ({ props }: { props: any }) => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`posts?categories=${props.category}&_fields[]=title&_fields[]=featured_media&_fields[]=featured_media_src_url&_fields[]=date&_fields[]=slug`,
		fetcher
	);

	return (
		<>
			<div className="horizontalSection listcategory">
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
									date: string | number | Date;
								},
								index: React.Key | null | undefined
							) => {
								return (
									<div key={"categoryNews_" + index}>
										<Link
											href={
												item.slug
													? "/post/" + item.slug
													: "#"
											}
										>
											<div
												className="verticalCard"
												key={index}
												style={{
													width: 288,
													margin: 2,
												}}
											>
												<div className="verticalCard_thumb">
													<img
														src={
															item.featured_media_src_url
														}
													/>
												</div>
												<div className="verticalCard_title">
													{item.title.rendered}
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
		</>
	);
};
export default CategoryNewsList;
