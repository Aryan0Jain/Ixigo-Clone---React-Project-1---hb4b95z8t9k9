import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import offerImg1 from "../../assests/images/busoffers/1.webp";
import offerImg2 from "../../assests/images/busoffers/2.webp";
import offerImg3 from "../../assests/images/busoffers/3.jpeg";
import offerImg4 from "../../assests/images/busoffers/4.webp";
import offerImg5 from "../../assests/images/busoffers/5.webp";
import offerImg6 from "../../assests/images/busoffers/6.webp";
import offerImg7 from "../../assests/images/busoffers/7.webp";
import offerImg8 from "../../assests/images/busoffers/8.webp";
import offerImg9 from "../../assests/images/busoffers/9.webp";
import offerImg10 from "../../assests/images/busoffers/10.webp";
import offerImg11 from "../../assests/images/busoffers/11.jpg";
import offerImg12 from "../../assests/images/busoffers/12.webp";
import offerImg13 from "../../assests/images/busoffers/13.webp";
import offerImg14 from "../../assests/images/busoffers/14.webp";
const offers = [
	{ src: offerImg1 },
	{ src: offerImg2 },
	{ src: offerImg3 },
	{ src: offerImg4 },
	{ src: offerImg5 },
	{ src: offerImg6 },
	{ src: offerImg7 },
	{ src: offerImg8 },
	{ src: offerImg9 },
	{ src: offerImg10 },
	{ src: offerImg11 },
	{ src: offerImg12 },
	{ src: offerImg13 },
	{ src: offerImg14 },
];
function BusOffersCarousel() {
	const [index, setIndex] = useState(1);
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 11) setIndex((prev) => prev + 1);
	}
	return (
		<div
			style={{
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
			{index < 11 && (
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
			<Typography fontSize={24} fontWeight={600} sx={{ ml: 12 }}>
				Bus Booking Discount Offers
			</Typography>
			<Stack
				direction={"row"}
				gap="30px"
				sx={{
					px: "40px",
					m: "auto",
					my: 2,
					whiteSpace: "nowrap",
					// overflow: "hidden",
					maxWidth: "1320px",
					transform: `translateX(${index * -370}px)`,
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
							<img
								key={curIndex}
								width="340px"
								src={src}
								style={{ borderRadius: 10 }}
							/>
						</div>
					);
				})}
			</Stack>
			<Box sx={{ maxWidth: "1250px", mx: "auto" }}>
				<Typography fontSize={24} fontWeight={600}>
					Why Choose ixigo for Bus Ticket Booking?
				</Typography>
				<Typography fontSize={14} sx={{ mt: 1 }}>
					ixigo Bus Booking is powered by AbhiBus which is India’s
					fastest growing online ticket booking platform. AbhiBus is
					the official ticketing partner of several State Road
					Transport Corporation (SRTC) operators and over 3500+
					private bus partners covering more than 100,000 bus routes
				</Typography>
			</Box>
		</div>
	);
}
export default React.memo(BusOffersCarousel);
