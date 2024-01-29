import { Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { HOTEL_OFFERS_CAROUSEL } from "../../../constants";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function OffersCarousel() {
	const [index, setIndex] = useState(0);
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 3) setIndex((prev) => prev + 1);
	}
	return (
		<Container sx={{ overflowX: "hidden" }}>
			{index > 0 && (
				<IconButton
					onClick={setPrevIndex}
					disableRipple
					className="left-button"
				>
					<FaArrowLeft color="black" />
				</IconButton>
			)}
			{index < 3 && (
				<IconButton
					onClick={setNextIndex}
					disableRipple
					className="right-button"
				>
					<FaArrowRight color="black" />
				</IconButton>
			)}
			<Typography fontWeight={600} fontSize={20}>
				Why Book Hotels With ixigo?
			</Typography>
			<Stack
				direction={"row"}
				gap="40px"
				sx={{
					transform: `translateX(${index * -400}px)`,
					transition: "0.5s transform",
				}}
			>
				{HOTEL_OFFERS_CAROUSEL.map(({ src }) => {
					return (
						<img
							src={src}
							style={{ width: 360, borderRadius: 20 }}
						/>
					);
				})}
			</Stack>
		</Container>
	);
}
