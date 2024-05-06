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
						<div className="post_heading"> About Us</div>
						<div className="post_meta">
							<div className="post_meta_item">
								<span></span>
							</div>
						</div>

						<div className="post_image"></div>
						<div className="AD_BOX"></div>

						<div className="post_body">
							विंध्य लोक विश्रुति शौर्य आदर्श बलिदान त्याग तथा
							अभूतपूर्व काव्य कला प्रेम की अमर निधि है. प्रस्तुत
							'द बघेली' में इसी गौरवपूर्ण अतीत की झलक दिखलाने का
							एक विनीत प्रयास है। इसका आधार सत्य घटनाएं है। 
							
							<br></br> <br/>अतएव
							जहाँ इससे पाठकों का मनोरंजन होगा वहाँ उन्हें
							महत्वपूर्ण इतिहास का परिचय भी हो जायेगा। जानबूझकर
							लेखनी की भाषा सरल रखी गई है और निरर्थक विवरणों से
							बचाया गया है। ' द बघेली' के संकलन में जिन विद्वानों
							के लेखादि का उपयोग हुआ है, उनके हम अत्यंत आभारी है।
							हम आशा करते है की हमारे सभी सम्मानीय पाठक व दर्शक
							समुचित आनन्द तथा प्रेरणा प्राप्त करेंगे।
							<br />
							<br />
							<p
								style={{
									fontSize: "1.5em",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								"साहेब इहाँ उबिआब ना"{" "}
							</p>
							<br />
							<br /> <b>' द बघेली' (इनसाइड ऑफ़ बघेलखण्ड) </b>{" "}
							<br />
							यहाँ मिलेगी खबर, ऐतिहासिक, परपंराए, रीति-रिवाज,
							महल-मठ और धार्मिक, पुरातन, कला-मनोरंजन, लेटेस्ट खबर,
							राजनीतिक, मनोरंजन की दुनिया, खेल-खिलाड़ी, सोशल
							मीडिया, फिल्म, खास मुद्दों पर बातचीत, मेहमानबाजी और
							एक्सक्लूसिव वीडियोज।
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
