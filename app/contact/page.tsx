"use client";
import Head from "next/head";

import CategoriesShowcase from "@/Components/CategoriesShowcase";

import { BiUser } from "react-icons/bi";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import SidebarReel from "@/Components/SidebarReel";
import BreadHeading from "@/Components/BreadHeading";
import { FaInstagram, FaMagic } from "react-icons/fa";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import apiService from "@/_services/api-service";
import axios from "axios";
import useSWR from "swr";
import { type } from "os";
import LoadingPulse from "@/Components/LoadingPulse";

export default function Home() {
	const pathname = usePathname();
	const postSlug = pathname.split("/")[2];
	const categorySlug = pathname.split("/")[1];

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
			</Head>{" "}
			<div className="container">
				<div className="post_page">
					<div className="post_content">
						<div className="post_heading">Contact</div>
						<div className="post_meta">
							<div className="post_meta_item">
								<span></span>
							</div>
						</div>

						<div className="post_image"></div>
						<div className="AD_BOX"></div>

						<div className="post_body">
							<p>
								The Bagheli Reva Films Production Address: 26/
								553
							</p>{" "}
							<p>
								Chhatrapati Nagar, Bansagar Rewa, <br />
								Madhya Pradesh Pin: 486001{" "}
							</p>{" "}
							<br />
							<ul
								style={{
									listStyle: "none",
								}}
							>
								<li>
									Phone: <b>+91 - 7662357439</b>
								</li>
								<li>
									Mobile : <b>8889524888</b>
								</li>
								<li>
									Email : <b>bagheliviews@gmail.com</b>
								</li>
							</ul>
							<br />
							<ul
								style={{
									listStyle: "none",
									display: "flex",
									justifyContent: "start",
									flexWrap: "wrap",
								}}
							>
								<li
									style={{
										padding: 8,
									}}
								>
									<a
										href="Instagram.com/thebagheli"
										target="_blank"
									>
										<img
											src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-512.png"
											alt="Instagram"
											style={{ width: 30, height: 30 }}
										/>
									</a>
								</li>
								<li
									style={{
										padding: 8,
									}}
								>
									<a
										href="https://Twitter.com/TheBagheli"
										target="_blank"
									>
										<img
											src="https://zeevector.com/wp-content/uploads/New-Twitter-Square-logo-PNG-Vector.png"
											alt="Instagram"
											style={{ width: 30, height: 30 }}
										/>
									</a>
								</li>
								<li
									style={{
										padding: 8,
									}}
								>
									<a
										href=" https://Facebook.com/Baghelinews"
										target="_blank"
									>
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
											alt="Instagram"
											style={{ width: 30, height: 30 }}
										/>
									</a>
								</li>
								<li
									style={{
										padding: 8,
									}}
								>
									<a
										href="https://WhatsApp.com/thebagheli"
										target="_blank"
									>
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
											alt="Instagram"
											style={{ width: 30, height: 30 }}
										/>
									</a>
								</li>
							</ul>
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
