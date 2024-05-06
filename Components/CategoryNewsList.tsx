/* Navbar Component */
"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import apiService from "@/_services/api-service";
import LoadingPulse from "@/Components/LoadingPulse";
const fetcher = (url: string) =>
	axios.get(url).then((res) => ({
		data: res.data,
		totalPages: res.headers["x-wp-totalpages"],
	}));
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";

const CategoryNewsList = ({ props }: { props: any }) => {
	const perPage = 4;

	const [page, setPage] = React.useState(1);

	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`posts?categories=${props.category}&_fields[]=title&_fields[]=featured_media&_fields[]=featured_media_src_url&_fields[]=date&_fields[]=slug&per_page=${perPage}&page=${page}`,
		fetcher
	);

	console.log(data);

	return (
		<>
			<div className="horizontalSection listcategory">
				{isLoading ? (
					<LoadingPulse />
				) : (
					<>
						{data?.data.map(
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

			<div className="pagination_wrap">
				<a
					className="next page-numbers"
					href="#"
					aria-label="Next"
					onClick={() => setPage(page - 1)}
					style={{
						display: page <= 1 ? "none" : "block",
					}}
				>
					Previous
				</a>
				<span className="page-numbers currentPage"> {page}</span>

				<a
					className="next page-numbers"
					href="#"
					aria-label="Next"
					style={{
						display: page >= data?.totalPages ? "none" : "block",
					}}
					onClick={() => setPage(page + 1)}
				>
					Next
				</a>
			</div>
		</>
	);
};
export default CategoryNewsList;
