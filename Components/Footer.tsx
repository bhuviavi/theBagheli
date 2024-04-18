/* BreadHeading Component */
"use client";
import React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { TfiYoutube } from "react-icons/tfi";

import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";
import { useState } from "react";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const Footer = () => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`categories?_fields[]=name&_fields[]=id&_fields[]=slug`,
		fetcher
	);

	return (
		<>
			<div
				style={{
					height: 18,
					backgroundColor: " #b80000",
				}}
			></div>
			<div className="footer">
				<div
					className="container"
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					<div className="footerColum">
						<p
							style={{
								color: "white",
								paddingBottom: 8,
								paddingTop: 20,
								fontSize: "large",
							}}
						>
							{" "}
							Quick Links
						</p>
						<ul>
							<li>
								<Link href="/about">About Us</Link>
							</li>
							<li>
								<Link href="/contact">Contact Us</Link>
							</li>
							<li>
								<Link href="/privacy">Privacy Policy</Link>
							</li>
							<li>
								<Link href="/terms">Terms and Conditions</Link>
							</li>
						</ul>
					</div>
					<div className="footerColum categoryCol">
						<ul>
							{!isLoading && (
								<>
									{data.map(
										(
											item: {
												id:
													| React.Key
													| null
													| undefined;
												slug: any;
												name:
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
											},
											index: any
										) => (
											<li key={"footer_" + index}>
												<Link
													href={`/category/${item.slug}`}
												>
													{item.name}
												</Link>
											</li>
										)
									)}
								</>
							)}
						</ul>
					</div>
					<div className="footerColum">
						<ul>
							<li>
								<img
									src="/squareLogo.png"
									className="pcOnly"
									height={80}
									alt="logo"
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
