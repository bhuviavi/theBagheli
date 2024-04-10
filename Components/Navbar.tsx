/* Navbar Component */
"use client";
import React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import {
	BiBook,
	BiHome,
	BiMenu,
	BiMenuAltRight,
	BiMobile,
	BiMobileAlt,
	BiSearch,
	BiVideo,
	BiVideoPlus,
} from "react-icons/bi";
import { RxCross1, RxReader } from "react-icons/rx";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { TfiYoutube } from "react-icons/tfi";
import { MdInstallMobile, MdOutlineArrowUpward } from "react-icons/md";
import { useEffect } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { FaBullhorn } from "react-icons/fa";

import { AiOutlineMenu } from "react-icons/ai";
import { Router } from "next/router";
import { usePathname } from "next/navigation";
import LoadingPulse from "@/Components/LoadingPulse";
import axios from "axios";
import useSWR from "swr";
import apiService from "@/_services/api-service";
import { useState } from "react";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
var _Links = [{ name: "न्यूज़", link: "/category/news" }];
const Navbar = () => {
	const { data, error, isLoading } = useSWR(
		apiService.API_URL +
			`categories?_fields[]=name&_fields[]=id&_fields[]=slug`,
		fetcher
	);
	const [Links, setLinks] = useState(_Links);

	useEffect(() => {
		if (!isLoading) {
			let ln = [];
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				let link = {
					name: element.name,
					link: "/category/" + element.slug,
				};

				ln.push(link);
			}
			setLinks(ln);
			//console.log(ln);
			//console.log(pathname);
		}
	}, [isLoading]);

	const pathname = usePathname();

	const [search, setSearch] = useState(false);

	const [mobileNav, setMobileNav] = useState(false);
	const [upArrow, setUpArrow] = useState(false);
	useEffect(() => {
		console.log(window.innerWidth);
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100 && window.innerWidth < 500) {
				setUpArrow(true);
			} else {
				setUpArrow(false);
			}
		});
	}, []);

	return (
		<>
			<div className="navbar">
				<div className="navRow">
					<div className="logo" style={{}}>
						<Link href="/">
							<svg
								id="brandSvgHeader"
								viewBox="140 140 1258 145"
								xmlns="http://www.w3.org/2000/svg"
								focusable="false"
								aria-hidden="true"
								height="32"
								className="bbc-1jefi8v e10yv9r10"
								style={{ fill: "white" }}
							>
								<g
									fill-rule="evenodd"
									stroke="#000"
									style={{
										stroke: "white",
									}}
									stroke-width=".335"
								>
									<path d="M1385.785 191.99c-1.89-5.595-3.885-10.439-5.963-14.533-2.085-4.093-4.393-7.471-6.922-10.133-2.523-2.662-5.338-4.636-8.417-5.929-3.093-1.292-6.568-1.946-10.425-1.946-3.163 0-5.992.445-8.48 1.335-2.495.89-4.594 2.14-6.31 3.767a16.244 16.244 0 00-3.941 5.79c-.904 2.237-1.356 4.684-1.356 7.346 0 2.669.334 5.22 1.008 7.673.598 2.168 1.564 4.385 2.69 6.63h-80.352c-2.975-4.74-6.186-9.077-9.66-12.941-3.712-4.108-7.722-7.61-12.045-10.509a55.341 55.341 0 00-13.866-6.714c-4.921-1.577-10.175-2.377-15.777-2.377-3.816 0-7.284.494-10.39 1.48-3.108.98-5.749 2.364-7.931 4.136a18.343 18.343 0 00-5.067 6.457c-1.195 2.53-1.793 5.317-1.793 8.368 0 2.39.285 4.552.869 6.485a30.65 30.65 0 002.314 5.615h-9.494v8.452h10.537v65.308h9.55v-65.308h53.433v10.126h-15.631c-3.204 0-5.86.25-7.986.758-2.12.5-4.003 1.293-5.644 2.377a12.233 12.233 0 00-3.913 4.135c-.959 1.675-1.445 3.733-1.445 6.165 0 4.553 2.008 8.493 6.026 11.809a19.096 19.096 0 00-5.387 6.137c-1.348 2.432-2.022 5.212-2.022 8.34 0 2.196.264 4.281.806 6.248.542 1.967 1.362 3.92 2.46 5.845 1.105 1.932 2.537 3.9 4.31 5.908a81.56 81.56 0 005.88 5.963c2.14 1.967 5.358 4.747 9.64 8.34l6.366-6.199c-4.67-3.746-8.25-6.79-10.738-9.147-2.489-2.356-4.38-4.378-5.672-6.074-1.293-1.703-2.21-3.343-2.752-4.92-.542-1.585-.813-3.302-.813-5.158 0-3.899 1.46-6.936 4.371-9.119 2.92-2.182 7.076-3.266 12.476-3.266 9.765 0 14.651 3.141 14.651 9.438 0 2.273-.813 4.184-2.432 5.727-1.62 1.543-4.052 2.76-7.298 3.65l3.127 7.985c5.248-1.425 9.21-3.642 11.871-6.651 2.662-3.017 3.997-6.763 3.997-11.239 0-3.28-.932-6.255-2.78-8.938-1.856-2.683-4.539-4.768-8.049-6.255-3.51-1.488-7.7-2.231-12.566-2.231-3.815 0-7.422.5-10.821 1.508-3.67-1.738-5.505-4.094-5.505-7.061 0-1.356.369-2.475 1.098-3.364.737-.883 1.717-1.488 2.926-1.794 1.217-.305 3.059-.458 5.533-.458h25.472v-18.585h82.2v11.287h-.576c-3.086 0-5.956.222-8.625.667-2.662.445-5.046 1.077-7.152 1.912-2.099.827-4.003 1.89-5.7 3.183a18.104 18.104 0 00-4.17 4.483h-33.805c-4.789 0-7.18 2.03-7.18 6.081 0 2.085.737 4.344 2.196 6.777 1.474 2.432 3.309 4.462 5.505 6.102 2.196 1.64 4.226 2.46 6.074 2.46 1.933 0 3.427-.57 4.49-1.703 1.064-1.14 1.592-2.773 1.592-4.893v-6.366h18.258c-.125 1.022-.368 1.953-.368 3.065 0 3.01.403 5.72 1.216 8.139.813 2.405 1.967 4.56 3.475 6.45 1.501 1.89 3.413 3.551 5.727 4.983 2.315 1.425 5.025 2.544 8.139 3.357 3.1.806 6.429 1.21 9.987 1.21 2.155 0 4.337-.174 6.54-.515.849 1.89 2.05 4.267 3.615 7.145a159.933 159.933 0 004.837 8.305l7.875-3.933c-3.322-4.435-6.103-8.82-8.34-13.143 2.161-.848 3.718-2.002 4.663-3.469.945-1.473 1.411-3.28 1.411-5.449 0-1.542-.382-3.016-1.154-4.427-.771-1.404-1.96-2.571-3.558-3.503-1.606-.924-3.503-1.383-5.706-1.383-2.315 0-4.212.653-5.7 1.967-1.487 1.307-2.23 3.183-2.23 5.609 0 .542.048 1.202.145 1.974a9.3 9.3 0 00.55 2.203c-1.161.111-2.141.167-2.948.167-4.17 0-7.694-.612-10.57-1.849-2.871-1.237-5.005-2.94-6.395-5.122-1.39-2.183-2.085-4.706-2.085-7.555 0-3.322.84-6.06 2.516-8.222 1.682-2.162 4.121-3.76 7.325-4.803 3.204-1.042 7.854-1.564 13.95-1.564h5.733v-19.627h27.614v65.308h9.556v-65.308h12.33v-8.452h-13.025zm-180.622 0h-11.295c-.882-1.348-1.702-2.926-2.46-4.719-.75-1.793-1.126-3.871-1.126-6.227 0-2.002.403-3.809 1.216-5.415.814-1.598 1.988-2.953 3.531-4.072 1.543-1.126 3.413-1.995 5.616-2.607 2.196-.618 4.67-.931 7.409-.931 14.206 0 27.286 8.027 39.255 23.971h-42.146zm162.962 0h-21.052c-.925-1.842-1.787-3.676-2.454-5.532-.771-2.14-1.154-4.525-1.154-7.145 0-3.517.973-6.29 2.926-8.34 1.946-2.044 4.775-3.065 8.48-3.065 2.425 0 4.635.48 6.623 1.445 1.995.966 3.85 2.433 5.588 4.4 1.738 1.967 3.378 4.469 4.921 7.5 1.543 3.03 3.072 6.609 4.573 10.737h-8.451zM759.927 265.75a4646.67 4646.67 0 00-23.49-37.242 2633.129 2633.129 0 00-23.49-36.2v73.442h-22.002V159.452h23.192a2668.556 2668.556 0 0123.713 36.052 2774.159 2774.159 0 0123.266 36.647v-72.699h22.004V265.75h-23.193zm44.26-106.298h73.145v19.03h-50.25v23.044h44.6v19.029h-44.6v26.166h53.074v19.03h-75.97V159.451zM982.1 265.75a3174.441 3174.441 0 01-9.886-35.978 3159.855 3159.855 0 01-9.44-35.977 2391.54 2391.54 0 01-9.218 35.977 2452.296 2452.296 0 01-9.812 35.978h-24.233a2032.839 2032.839 0 01-14.57-52.628c-4.66-17.74-9.069-35.63-13.231-53.67h24.976a2003.215 2003.215 0 007.88 41.33 1444.404 1444.404 0 008.77 40.586 3259.894 3259.894 0 0018.882-77.456h22.3a3251.95 3251.95 0 0018.732 75.821 1999.976 1999.976 0 008.624-39.843 1455.41 1455.41 0 007.73-40.438h24.53a1845.28 1845.28 0 01-13.23 53.67 2041.61 2041.61 0 01-14.57 52.628H982.1zm95.37 2.23c-5.849 0-11.621-.645-17.32-1.932a66.227 66.227 0 01-16.427-6.096v-20.516c10.604 6.444 21.854 9.663 33.747 9.663 6.74 0 11.869-1.138 15.388-3.419 3.517-2.28 5.277-5.45 5.277-9.515 0-3.07-.868-5.475-2.601-7.21-1.735-1.733-4.04-3.122-6.913-4.163-2.876-1.04-6.096-2.007-9.663-2.899-5.85-1.387-11.002-2.974-15.462-4.757-4.46-1.784-8.228-3.889-11.3-6.319-3.072-2.427-5.402-5.352-6.987-8.771-1.586-3.42-2.378-7.508-2.378-12.265 0-6.74 1.71-12.537 5.129-17.395 3.42-4.855 8.25-8.597 14.495-11.225 6.244-2.624 13.678-3.939 22.3-3.939 5.65 0 11.2.646 16.651 1.933 5.45 1.289 10.356 3.024 14.719 5.203v20.22c-4.363-2.677-9.292-4.758-14.793-6.245-5.5-1.487-11.027-2.23-16.577-2.23-6.046 0-10.73 1.04-14.049 3.122-3.321 2.081-4.98 5.055-4.98 8.92 0 2.776.792 4.98 2.378 6.616 1.585 1.635 3.84 2.973 6.765 4.014 2.922 1.04 6.367 2.058 10.332 3.047 5.055 1.29 9.761 2.702 14.124 4.238 4.36 1.537 8.2 3.493 11.522 5.872 3.32 2.379 5.895 5.403 7.73 9.069 1.834 3.668 2.75 8.177 2.75 13.529 0 7.038-1.735 13.06-5.202 18.063-3.47 5.006-8.475 8.823-15.016 11.447-6.541 2.626-14.421 3.94-23.639 3.94zM141.732 141.732v141.733h141.732V141.732H141.732zm98.839 100.024c-2.422 3.42-5.873 6.06-10.353 7.917-4.482 1.859-9.865 2.788-16.152 2.788h-31.763v-79.725h29.92c8.816 0 15.646 1.767 20.488 5.297 4.841 3.531 7.264 8.604 7.264 15.22 0 3.79-.867 7.08-2.602 9.868-1.735 2.787-4.3 5-7.697 6.634 4.697 1.561 8.293 4.033 10.786 7.415 2.494 3.383 3.74 7.49 3.74 12.321 0 4.758-1.21 8.847-3.631 12.265zm-20.272-38.97c2.204-1.82 3.307-4.366 3.307-7.638 0-6.317-4.302-9.477-12.901-9.477h-12.25v19.847h12.25c4.19 0 7.389-.91 9.594-2.732zm-7.534 15.22h-14.31v21.52h14.093c4.841 0 8.564-.91 11.166-2.731 2.601-1.821 3.902-4.441 3.902-7.861 0-7.285-4.95-10.928-14.851-10.928zm106.132-76.274v141.733H460.63V141.732H318.897zm98.839 100.024c-2.422 3.42-5.873 6.06-10.352 7.917-4.483 1.859-9.866 2.788-16.153 2.788h-31.763v-79.725h29.92c8.816 0 15.646 1.767 20.489 5.296 4.84 3.532 7.263 8.605 7.263 15.22 0 3.792-.867 7.081-2.602 9.869-1.735 2.787-4.3 5-7.697 6.634 4.698 1.56 8.294 4.033 10.787 7.415 2.493 3.383 3.74 7.49 3.74 12.321 0 4.758-1.211 8.847-3.632 12.265zm-20.272-38.97c2.204-1.82 3.307-4.366 3.307-7.638 0-6.317-4.301-9.477-12.9-9.477h-12.25v19.847h12.25c4.19 0 7.388-.91 9.593-2.732zm-7.534 15.22h-14.31v21.52h14.093c4.841 0 8.564-.91 11.166-2.732 2.602-1.82 3.903-4.44 3.903-7.86 0-7.285-4.951-10.928-14.852-10.928zm106.133 65.459h141.732V141.732H496.063v141.733zm101.793-36.057c-3.302 1.822-7.128 3.261-11.478 4.316-4.352 1.056-8.929 1.586-13.73 1.586-6.376 0-12.115-.93-17.216-2.787-5.103-1.858-9.416-4.536-12.941-8.033-3.527-3.498-6.228-7.777-8.103-12.842-1.875-5.063-2.813-10.766-2.813-17.105 0-6.192.974-11.784 2.926-16.776 1.95-4.99 4.763-9.271 8.44-12.842 3.675-3.569 8.083-6.301 13.222-8.197 5.138-1.893 10.896-2.841 17.274-2.841 4.425 0 8.608.456 12.547 1.366 3.938.912 7.596 2.24 10.972 3.99v15.518a36.771 36.771 0 00-10.016-4.644c-3.6-1.056-7.39-1.585-11.365-1.585-5.477 0-10.148 1.021-14.01 3.06-3.865 2.04-6.828 4.992-8.89 8.853-2.065 3.863-3.095 8.562-3.095 14.098 0 5.539.994 10.257 2.983 14.154 1.986 3.898 4.875 6.868 8.664 8.907 3.788 2.04 8.383 3.06 13.785 3.06 8.252 0 15.867-2.148 22.844-6.448v15.192z"></path>
								</g>
							</svg>
						</Link>
					</div>
				</div>

				<div className="navRow" style={{ background: "#fff" }}>
					<div
						className=""
						style={{
							display: "flex",
							maxWidth: "63rem",
							margin: "auto",
						}}
					>
						<div className="nav" style={{ border: "none" }}>
							<div className=" item  	mobileOnly">
								<Menu
									menuButton={
										<MenuButton
											style={{
												background: "transparent",
												border: 0,
												color: "white",
											}}
										>
											<BiMenu
												fill="black"
												size={"30px"}
											/>
										</MenuButton>
									}
									menuClassName={"menu_drop"}
								>
									<MenuItem
										style={{
											color: "black",
										}}
									>
										<Link href="/">
											<p>होम</p>
										</Link>
									</MenuItem>
									{/* map from props array */}
									{Links.map((item, index) => {
										return (
											<MenuItem
												style={{
													color: "black",
												}}
												key={"navbar_i" + index}
											>
												<Link href={item.link}>
													<p>{item.name}</p>
												</Link>
											</MenuItem>
										);
									})}
								</Menu>
							</div>

							<div
								className="navItemRow"
								style={{ overflow: "auto", display: "flex" }}
							>
								<div
									className={
										"item  hover-underline-animation " +
										(pathname === "/" ? " active" : "")
									}
								>
									<Link href="/">
										<p>होम</p>
									</Link>
								</div>

								{/* map from props array */}
								{Links.map((item, index) => {
									return (
										<div
											className={
												"item hover-underline-animation " +
												(pathname === item.link
													? " active"
													: "")
											}
											key={"navbar_ii" + index}
										>
											<Link href={item.link}>
												<p>{item.name}</p>
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
