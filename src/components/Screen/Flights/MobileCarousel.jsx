import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FLIGHT_CAROUSEL_OFFERS } from "../../../constants";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function MobileCarousel() {
	const [index, setIndex] = useState(1);
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 10) setIndex((prev) => prev + 1);
	}
	return (
		<div className="offer-carousel">
			{index > 0 && (
				<IconButton
					onClick={setPrevIndex}
					disableRipple
					className="left-button-m"
				>
					<FaArrowLeft color="black" />
				</IconButton>
			)}
			{index < 10 && (
				<IconButton
					onClick={setNextIndex}
					disableRipple
					className="right-button-m"
				>
					<FaArrowRight color="black" />
				</IconButton>
			)}
			<Typography align="center" variant="h5">
				Best Flight Booking Offers
			</Typography>
			<Stack
				direction={"row"}
				gap="120px"
				sx={{
					transform: `translateX(${30 + index * -340}px)`,
				}}
				className="image-container"
			>
				{FLIGHT_CAROUSEL_OFFERS.map(({ src }, curIndex) => {
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
							<img key={curIndex} width="220px" src={src} />
						</div>
					);
				})}
			</Stack>
		</div>
	);
}
