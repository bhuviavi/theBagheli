import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "The Bagheli",
	description:
		"Inside of Baghelkhand, यहाँ मिलेगी खोज खबर, एतिहासिक परम्पराएं, रीतिरिवाज, महल-मठ और धार्मिक, पुरातन, कला-मनोरंजन, लैटस्ट खाबर, राजनीतिक, मनोरंजन की दुनिया, खेल खिलाड़ी, सोशल मीडिया, फिल्म, खास मुद्दों पर बातचीत, मेहमान नवाजी और एक्सक्लूसिव वीडियोज़ | ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<title> The Bagheli</title>
				<meta
					name="description"
					content="Inside of Baghelkhand, यहाँ मिलेगी खोज खबर, एतिहासिक परम्पराएं, रीतिरिवाज, महल-मठ और धार्मिक, पुरातन, कला-मनोरंजन, लैटस्ट खाबर, राजनीतिक, मनोरंजन की दुनिया, खेल खिलाड़ी, सोशल मीडिया, फिल्म, खास मुद्दों पर बातचीत, मेहमान नवाजी और एक्सक्लूसिव वीडियोज़ |"
				/>
				<link rel="icon" href="/fv.ico" />
				{/* add og title */}

				<meta property="og:title" content="The Bagheli" />
				<meta property="og:description" content="The Bagheli" />
				<meta property="og:image" content="/__horizontalLogo3.png" />
				<meta property="og:url" content="https://thebagheli.com" />
				<meta property="og:type" content="website" />
			</Head>
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
