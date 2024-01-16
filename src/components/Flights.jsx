import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import flightLogo from "../assests/images/flight-booking.png";
import banner from "../assests/images/banner1.png";
import swapSVG from "../assests/svgs/swap.svg";
import CustomInput from "./CustomInput";
import Carousel from "./Carousel";
const whiteDot = {
	display: "inline-block",
	verticalAlign: "middle",
	width: "5px",
	height: "5px",
	backgroundColor: "#fff",
	borderRadius: "10px",
	margin: "0px 10px",
};
export default function Flights() {
	const [value, setValue] = useState("");
	return (
		<Box component={"div"} sx={{ width: "100%" }}>
			<Box
				component={"div"}
				position={"absolute"}
				// position={"relative"}
				sx={{ width: "100%" }}
			>
				<Box
					component={"div"}
					position={"absolute"}
					sx={{
						backgroundImage:
							"url('https://images.ixigo.com/image/upload/banner/a75f1fd133a52d1f7d32509d63e3add5-zycdf.webp')",
						width: "100%",
						height: "550px",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						zIndex: "-10",
					}}
				></Box>
				<Box
					component={"div"}
					// position={"relative"}
					position={"absolute"}
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.269)",
						width: "100%",
						height: "550px",
						zIndex: "-5",
					}}
				></Box>
			</Box>
			<Box>
				<div style={{ position: "relative" }}>
					<Stack
						direction={"row"}
						gap={1}
						sx={{
							pt: "150px",
							pb: "120px",
							width: "fit-content",
							margin: "auto",
							alignItems: "center",
						}}
						// style={{
						// 	paddingTop: "150px",
						// 	width: "fit-content",
						// 	margin: "auto",
						// }}
					>
						<img src={flightLogo} />
						<Typography
							variant="h5"
							color={"#fff"}
							fontWeight={600}
						>
							search
							<span style={whiteDot}></span>
							book
							<span style={whiteDot}></span>
							go
						</Typography>
						<div
							style={{
								position: "absolute",
								right: "200px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h5"
								color={"#fff"}
								fontWeight={400}
							>
								Agra
							</Typography>
							<Typography
								variant="body1"
								color={"#fff"}
								fontWeight={300}
							>
								India
							</Typography>
						</div>
					</Stack>
				</div>
			</Box>
			<Stack
				direction={"row"}
				className="flight-search-pannel"
				// justifyContent={"space-between"}
				alignItems={"center"}
				gap={4}
				sx={{
					width: "fit-content",
					m: "auto",
					backgroundColor: "#fff",
					py: 4,
					px: 4,
					borderRadius: "5px",
				}}
			>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
				></CustomInput>
				<IconButton
					disableRipple
					sx={{
						mx: 1,
						p: 0.2,
						height: "fit-content",
						border: "2px solid",
					}}
				>
					<img src={swapSVG} />
				</IconButton>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
				></CustomInput>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
				></CustomInput>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
				></CustomInput>
				<Button
					sx={{
						color: "#fff",
						m: "auto",
						py: 1,
						px: 7,
						fontWeight: 700,
						fontSize: "16px",
						borderRadius: "2px",
						backgroundColor: "secondary.hover",
						":hover": { backgroundColor: "secondary.hover" },
					}}
				>
					Search
				</Button>
			</Stack>
			<Box sx={{ m: "auto", width: "fit-content", my: 5 }}>
				<img src={banner} />
			</Box>
			<Carousel />
		</Box>
	);
}
