import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const iconSX = {
	position: "absolute",
	top: "45%",
	bgcolor: "#fff",
	p: 0.5,
	":hover": { bgcolor: "#fff" },
	opacity: 0,
	transition: "opacity 180ms",
};
const arrowProps = { size: 16, color: "#0770e4" };
export default function CardImageCarousel({ images }) {
	const [index, setIndex] = useState(0);
	function handlePrev(e) {
		e.stopPropagation();
		if (index > 0) setIndex(index - 1);
	}
	function handleNext(e) {
		e.stopPropagation();
		if (index + 1 < images.length) setIndex(index + 1);
	}
	return (
		<Box
			position={"relative"}
			sx={{
				overflow: "hidden",
				width: "300px",
				":hover .hide": { opacity: 1 },
				borderRadius: "10px",
			}}
		>
			<Stack
				direction={"row"}
				sx={{ transform: `translate(${-300 * index}px)` }}
			>
				{images.map((image, index) => {
					return (
						<Box
							key={index}
							sx={{ width: "300px", height: "200px" }}
						>
							<img
								loading="lazy"
								src={image}
								style={{
									width: "300px",
									height: "200px",
									objectFit: "cover",
								}}
							/>
						</Box>
					);
				})}
			</Stack>
			{index > 0 && (
				<IconButton
					sx={{ ...iconSX, left: "20px" }}
					onClick={handlePrev}
					className="hide"
				>
					<IoIosArrowBack {...arrowProps} />
				</IconButton>
			)}
			{index + 1 < images.length && (
				<IconButton
					sx={{ ...iconSX, right: "20px" }}
					onClick={handleNext}
					className="hide"
				>
					<IoIosArrowForward {...arrowProps} />
				</IconButton>
			)}
			<Stack
				direction={"row"}
				justifyContent={"center"}
				gap={1}
				alignItems={"center"}
				sx={{
					width: "100%",
					position: "absolute",
					bottom: 0,
					py: 3,
					background:
						"linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);",
					// opacity: 0,
					transition: "all 180ms",
				}}
				// className="hide"
			>
				{images.map((_, ind) => {
					return (
						<Box
							key={ind}
							sx={{
								width: index === ind ? "7px" : "5px",
								height: index === ind ? "7px" : "5px",
								bgcolor: index === ind ? "#0770e4" : "#fff",
								borderRadius: "50%",
							}}
						></Box>
					);
				})}
			</Stack>
		</Box>
	);
}
