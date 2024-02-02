import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CardImageCarousel from "./CardImageCarousel";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { CURRENCY_FORMATTER } from "../../../../utils";
import { HOTEL_AMENITIES } from "../../../../constants";
function getRating(rating) {
	if (rating >= 9) return "Exceptional";
	if (rating >= 8) return "Excellent";
	if (rating >= 7) return "Very Good";
	if (rating >= 6) return "Good";
	return "Pleasant";
}
export default function HotelCard({ hotelData, checkinDate, handleBook }) {
	const {
		amenities,
		avgCostPerNight,
		images,
		rooms,
		name,
		rating,
		_id,
		location,
	} = hotelData;
	const Amenity_icon =
		amenities.length > 1
			? HOTEL_AMENITIES[
					HOTEL_AMENITIES.findIndex(
						(item) => item.name === amenities[1]
					)
			  ].icon
			: null;
	return (
		<Stack
			direction={"row"}
			sx={{ p: 2, bgcolor: "#fff", borderRadius: "10px" }}
			gap={2}
		>
			<CardImageCarousel images={images} />
			<Stack direction={"row"} flex={1}>
				<Stack gap={1} alignItems={"flex-start"} sx={{ width: "75%" }}>
					<Typography fontSize={18} fontWeight={600}>
						{name}
					</Typography>
					<Stack direction={"row"} gap={0.6} alignItems={"center"}>
						<Typography fontSize={13} color={"rgb(94, 97, 110)"}>
							{location.split(", ")[0]}
						</Typography>
						<Box
							sx={{
								width: "5px",
								height: "5px",
								bgcolor: "rgb(94,97,110)",
								borderRadius: "50%",
								// verticalAlign: "middle",
							}}
						></Box>
						<Typography fontSize={13} color={"rgb(94, 97, 110)"}>
							{location.split(", ")[1]}
						</Typography>
					</Stack>
					<Stack
						direction={"row"}
						gap={2}
						sx={{ color: "#0770e4" }}
						alignItems={"center"}
					>
						<Typography
							sx={{
								py: 0.75,
								px: 1,
								bgcolor: "rgb(229, 240, 252)",
								borderRadius: "4px",
							}}
							fontWeight={700}
						>
							{(rating * 1.9).toFixed(1)}
						</Typography>
						<Typography fontWeight={600}>
							{getRating((rating * 1.9).toFixed(1))}
						</Typography>
					</Stack>
					<Stack
						direction={"row"}
						alignItems={"center"}
						sx={{ color: "rgb(43, 153, 80)" }}
						gap={0.8}
					>
						<IoCheckmarkSharp size={18} />
						<Typography fontSize={14} fontWeight={600}>
							Free Cancellation till{" "}
							{checkinDate.subtract(1, "day").format("MMM DD")}
						</Typography>
					</Stack>
					{amenities.length > 0 && (
						<Stack
							direction={"row"}
							alignItems={"center"}
							sx={{ color: "rgb(43, 153, 80)" }}
							gap={0.8}
						>
							<IoCheckmarkSharp size={18} />
							<Typography fontSize={14} fontWeight={600}>
								{amenities[0]}
							</Typography>
						</Stack>
					)}
					<Stack direction={"row"} gap={1.5}>
						<Stack
							direction={"row"}
							gap={0.8}
							color={"#000"}
							alignItems={"center"}
						>
							<IoKeySharp size={14} />
							<Typography fontSize={14} fontWeight={600}>
								24*7 Check-in
							</Typography>
						</Stack>
						{amenities.length > 1 && (
							<Stack
								direction={"row"}
								gap={0.8}
								color={"#000"}
								alignItems={"center"}
							>
								<Amenity_icon size={14} />
								<Typography fontSize={14} fontWeight={600}>
									{amenities[1]}
								</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
				<Stack
					gap={1}
					sx={{ width: "25%" }}
					alignItems={"flex-end"}
					justifyContent={"flex-end"}
				>
					{rooms.length <= 7 && (
						<Typography
							sx={{
								color: "rgb(220, 53, 50)",
								bgcolor: "rgb(252, 235, 235)",
								border: "1px solid rgb(245, 194, 194)",
								fontSize: 13,
								fontWeight: 600,
								borderRadius: "15px",
								py: 0.5,
								px: 1.2,
								width: "fit-content",
								mb: 1,
							}}
						>
							{rooms.length} rooms left
						</Typography>
					)}
					{rooms.length > 7 && amenities.length >= 5 && (
						<Typography
							sx={{
								color: "rgb(220, 53, 50)",
								bgcolor: "rgb(252, 235, 235)",
								border: "1px solid rgb(245, 194, 194)",
								fontSize: 13,
								fontWeight: 600,
								borderRadius: "15px",
								py: 0.5,
								px: 1.2,
								width: "fit-content",
								mb: 1,
							}}
						>
							Luxorious
						</Typography>
					)}
					<Typography fontWeight={600} fontSize={22}>
						{CURRENCY_FORMATTER(avgCostPerNight)}
					</Typography>
					<Typography fontSize={12} color="rgb(94, 97, 110)">
						+ {CURRENCY_FORMATTER(avgCostPerNight * 0.18)} taxes &
						fees per night, per room
					</Typography>
					<Button
						variant="contained"
						disableRipple
						sx={{
							textTransform: "none",
							boxShadow: "none",
							borderRadius: "10px",
							bgcolor: "rgb(252, 121, 13)",
							":hover": {
								boxShadow: "none",
								bgcolor: "rgb(253, 148, 61)",
							},
						}}
						onClick={() => handleBook(_id)}
					>
						Book Now
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}
