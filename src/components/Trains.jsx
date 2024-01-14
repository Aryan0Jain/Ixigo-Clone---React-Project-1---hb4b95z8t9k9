import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import trainLogo from "../assests/images/train-booking.png";
import swapSVG from "../assests/svgs/swap.svg";
import CustomInput from "./CustomInput";
import irctcLogo from "../assests/images/irctc-logo.webp";
import guaranteeIMG1 from "../assests/images/train-guarantee-1.webp";
import guaranteeIMG2 from "../assests/images/train-guarantee-2.webp";
import guaranteeIMG3 from "../assests/images/train-guarantee-3.webp";
import guaranteeIMG4 from "../assests/images/train-guarantee-4.webp";
const guarantees = [
	{ img: guaranteeIMG1, text: "₹0 Payment Gateway Fee on Payments via UPI" },
	{
		img: guaranteeIMG2,
		text: "ixigo Assured: Free Cancellation of Train Tickets",
	},
	{
		img: guaranteeIMG3,
		text: "Instant Refund on Indian Railway Reservation Cancellation",
	},
	{ img: guaranteeIMG4, text: "24*7 Support for IRCTC Train Ticket Booking" },
];
export default function Trains() {
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
							"url('https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp')",
						width: "100%",
						height: "550px",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						zIndex: "-10",
					}}
				></Box>
				{/* <Box
					component={"div"}
					// position={"relative"}
					position={"absolute"}
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.269)",
						width: "100%",
						height: "550px",
						zIndex: "-5",
					}}
				></Box> */}
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
						<img src={trainLogo} />
						<Typography
							variant="h5"
							color={"#fff"}
							fontWeight={600}
						>
							Train Ticket Booking
						</Typography>
					</Stack>
				</div>
			</Box>
			<Stack
				direction={"row"}
				className="flight-search-pannel"
				// justifyContent={"space-between"}
				alignItems={"center"}
				gap={2}
				sx={{
					width: "fit-content",
					m: "auto",
					backgroundColor: "#fff",
					py: 3,
					px: 2,
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
						border: "1px solid",
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
			<Box
				sx={{
					width: "100%",
					mx: "auto",
					p: 4,
					my: 8,
					textAlign: "center",
					backgroundColor: "#F2F2F2",
				}}
			>
				<Typography
					fontSize={"32px"}
					color={"rgba(0,0,0,0.87)"}
					fontWeight={700}
				>
					IRCTC Train Ticket Booking on ixigo
				</Typography>
				<Stack
					direction={"row"}
					alignItems={"center"}
					gap={2}
					sx={{ width: "fit-content", mx: "auto", my: 1 }}
				>
					<Typography variant="h6" fontWeight={400}>
						IRCTC Authorised Partner
					</Typography>
					<img src={irctcLogo} width={"50px"} />
				</Stack>
				<Stack
					direction={"row"}
					flexWrap={"wrap"}
					// gap={5}
					justifyContent={"space-between"}
					sx={{
						width: "fit-content",
						mx: "12%",
						borderBottom: "1px solid rgba(0,0,0,0.1)",
					}}
				>
					{guarantees.map(({ img, text }, index) => {
						return (
							<Stack
								key={index}
								direction={"row"}
								gap={2}
								sx={{ my: "25px", width: "45%" }}
							>
								<img
									src={img}
									style={{
										width: "70px",
										borderRadius: "50%",
									}}
								/>
								<Typography
									textAlign={"left"}
									variant="h6"
									fontWeight={700}
								>
									{text}
								</Typography>
							</Stack>
						);
					})}
				</Stack>
			</Box>
		</Box>
	);
}
