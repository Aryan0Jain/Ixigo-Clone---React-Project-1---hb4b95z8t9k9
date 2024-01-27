import { Box, Divider, Stack, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa6";
import React from "react";
function getAgeGroup(age) {
	if (age <= 4) return "Infant";
	if (age <= 10) return "Child";
	return "Adult";
}
export default function Travellers({ travellers, setTravellers }) {
	function handleDelete(index) {
		const newTravellers = [...travellers].filter((_, i) => i != index);
		setTravellers(newTravellers);
	}
	return (
		<Stack
			gap={2}
			divider={<Divider orientation="horizontal" flexItem />}
			sx={{ transition: "height 200ms" }}
		>
			{travellers.map(({ name, age, gender, nationality }, index) => {
				return (
					<Stack
						key={index}
						direction={"row"}
						alignItems={"center"}
						justifyContent={"center"}
						sx={{ px: 2 }}
					>
						<Box sx={{ width: "100%" }}>
							<Typography color={"rgba(0,0,0,.87)"} fontSize={17}>
								{name}
							</Typography>
							<Stack
								direction={"row"}
								divider={
									<Box
										sx={{
											width: 5,
											height: 5,
											borderRadius: "50%",
											bgcolor: "rgba(0,0,0,.54)",
										}}
									></Box>
								}
								alignItems={"center"}
								gap={1}
								sx={{ color: "rgba(0,0,0,.54)" }}
							>
								<Typography fontSize={13}>
									{getAgeGroup(age)}
								</Typography>
								<Typography fontSize={13}>{age}</Typography>
								<Typography fontSize={13}>
									{gender.at(0).toUpperCase() +
										gender.slice(1)}
								</Typography>
							</Stack>
						</Box>
						<FaTrash
							style={{
								cursor: "pointer",
							}}
							onClick={() => handleDelete(index)}
						/>
					</Stack>
				);
			})}
		</Stack>
	);
}
