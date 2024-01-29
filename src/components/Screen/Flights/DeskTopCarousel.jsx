import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FLIGHT_CAROUSEL_OFFERS } from "../../../constants";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function DeskTopCarousel() {
	const [index, setIndex] = useState(1);
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 8) setIndex((prev) => prev + 1);
	}
	return (
		<div className="offer-carousel">
			{index > 0 && (
				<IconButton
					onClick={setPrevIndex}
					disableRipple
					className="left-button"
				>
					<FaArrowLeft color="black" />
				</IconButton>
			)}
			{index < 8 && (
				<IconButton
					onClick={setNextIndex}
					disableRipple
					className="right-button"
				>
					<FaArrowRight color="black" />
				</IconButton>
			)}
			<Typography align="center" variant="h5">
				Best Flight Booking Offers
			</Typography>
			<Stack
				direction={"row"}
				gap="40px"
				sx={{
					transform: `translateX(${index * -340}px)`,
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
							<img key={curIndex} width="300px" src={src} />
						</div>
					);
				})}
			</Stack>
		</div>
	);
}
