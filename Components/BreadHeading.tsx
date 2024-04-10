/* BreadHeading Component */
"use client";
import React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { TfiYoutube } from "react-icons/tfi";

import { useState } from "react";

const BreadHeading = ({
	title,
	icon,
	link,
}: {
	title: string;
	icon: any;
	link: string;
}) => {
	return (
		<>
			<div className="breadheading">
				<div className="breadheading_title">
					{icon}
					{title}
				</div>

				{link != "-1" && (
					<Link href={"" + (link != undefined ? link : "/")}>
						<div className="breadheading_more">और देखें</div>{" "}
					</Link>
				)}
			</div>{" "}
		</>
	);
};

export default BreadHeading;
