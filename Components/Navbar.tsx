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
							<img src="/__horizontalLogo3.png" height={80} />
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
												fontWeight: "bold",
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
											fontWeight: "bold",
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
													fontWeight: "bold",
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
