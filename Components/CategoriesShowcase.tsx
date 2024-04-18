/* Navbar Component */
"use client";
import React from "react";

import { BiBall, BiHome, BiListOl, BiMask, BiNews } from "react-icons/bi";

import BreadHeading from "./BreadHeading";
import Newsreel from "./Newsreel";
import LoadingPulse from "@/Components/LoadingPulse";
import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CategoriesShowcase = () => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`categories?_fields[]=name&_fields[]=slug&_fields[]=id`,
		fetcher
	);
	if (!isLoading) {
		//console.log(data);
	}

	return (
		<>
			{isLoading ? (
				<LoadingPulse />
			) : (
				<>
					{data.map(
						(
							item: {
								name: string;
								icon: any;
								slug: string;
								id: any;
							},
							index: React.Key | null | undefined
						) => {
							return (
								<div key={"categoryshowcase_" + index}>
									<div className="container">
										<BreadHeading
											title={item.name}
											icon={item.icon}
											link={
												item.slug
													? "/category/" + item.slug
													: "#"
											}
										/>
									</div>
									<Newsreel category={item.id} />
									<div className="AD_BOX"></div>
								</div>
							);
						}
					)}{" "}
				</>
			)}
		</>
	);
};
export default CategoriesShowcase;
