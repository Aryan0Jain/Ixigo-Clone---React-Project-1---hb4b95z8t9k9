import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import img1 from "../../assests/images/offers/1.webp";
import img2 from "../../assests/images/offers/2.webp";
import img3 from "../../assests/images/offers/3.webp";
import img4 from "../../assests/images/offers/4.webp";
import img5 from "../../assests/images/offers/5.webp";
import img6 from "../../assests/images/offers/6.webp";
import img7 from "../../assests/images/offers/7.webp";
import img8 from "../../assests/images/offers/8.webp";
import img9 from "../../assests/images/offers/9.webp";
import img10 from "../../assests/images/offers/10.webp";
import img11 from "../../assests/images/offers/11.webp";
const offers = [
	{ src: img1 },
	{ src: img2 },
	{ src: img3 },
	{ src: img4 },
	{ src: img5 },
	{ src: img6 },
	{ src: img7 },
	{ src: img8 },
	{ src: img9 },
	{ src: img10 },
	{ src: img11 },
];
export default function Carousel() {
	const [index, setIndex] = useState(1);
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 8) setIndex((prev) => prev + 1);
	}
	return (
		<div
			style={{
				marginTop: "60px",
				overflow: "hidden",
				position: "relative",
				padding: "40px",
				backgroundColor: "#fff",
			}}
		>
			{index > 0 && (
				<IconButton
					onClick={setPrevIndex}
					disableRipple
					sx={{
						// backgroundColor: "#ffffff",
						position: "absolute",
						left: "50px",
						top: "175px",
						zIndex: 1,
						p: 0,
						boxShadow: 4,
					}}
				>
					<svg
						width="50px"
						height="50px"
						viewBox="-8.4 -8.4 40.80 40.80"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						stroke="#000000"
						transform="matrix(-1, 0, 0, 1, 0, 0)"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0">
							<rect
								x="-8.4"
								y="-8.4"
								width="40.80"
								height="40.80"
								rx="20.4"
								fill="#fff"
								strokeWidth="0"
							></rect>
						</g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								d="M6 12H18M18 12L13 7M18 12L13 17"
								stroke="#454545"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>{" "}
						</g>
					</svg>
				</IconButton>
			)}
			{index < 8 && (
				<IconButton
					onClick={setNextIndex}
					disableRipple
					sx={{
						// backgroundColor: "#ffffff",
						position: "absolute",
						right: "50px",
						top: "175px",
						zIndex: 1,
						p: 0,
						boxShadow: 4,
					}}
				>
					<svg
						width="50px"
						height="50px"
						viewBox="-8.4 -8.4 40.80 40.80"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						stroke="#000000"
						transform="matrix(1, 0, 0, 1, 0, 0)"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0">
							<rect
								x="-8.4"
								y="-8.4"
								width="40.80"
								height="40.80"
								rx="20.4"
								fill="#fff"
								strokeWidth="0"
							></rect>
						</g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								d="M6 12H18M18 12L13 7M18 12L13 17"
								stroke="#454545"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>{" "}
						</g>
					</svg>
				</IconButton>
			)}
			<Typography align="center" variant="h5">
				Best Flight Booking Offers
			</Typography>
			<Stack
				direction={"row"}
				gap="40px"
				sx={{
					px: "40px",
					m: "auto",
					my: 5,
					whiteSpace: "nowrap",
					// overflow: "hidden",
					maxWidth: "1024px",
					transform: `translateX(${index * -340}px)`,
					transition: "0.5s transform",
				}}
			>
				{offers.map(({ src }, curIndex) => {
					return (
						<div
							key={curIndex}
							style={{
								opacity:
									curIndex < index || curIndex > index + 2
										? 0.25
										: 1,
								transition: "0.5s opacity",
							}}
						>
							<img key={curIndex} width="300px" src={src} />
						</div>
					);
				})}
			</Stack>
		</div>
	);
}
