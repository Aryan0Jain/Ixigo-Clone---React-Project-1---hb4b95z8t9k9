import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import specialFareSVG1 from "../../assests/images/homePage/student.svg";
import specialFareSVG2 from "../../assests/images/homePage/seniorCitizen.svg";
import specialFareSVG3 from "../../assests/images/homePage/armedForces.svg";
const specialFares = [
	{
		logo: specialFareSVG1,
		title: "Student",
		header: { pre: `For travellers`, mid: "12 years", post: "and above" },
		body: "It is mandatory to present a valid Student ID at the time of check-in",
	},
	{
		logo: specialFareSVG2,
		title: "Senior Citizen",
		header: { pre: `For travellers`, mid: "60 years", post: "and above" },
		body: "It is mandatory to present a valid date of birth proof at the time of check-in",
	},
	{
		logo: specialFareSVG3,
		title: "Armed Forces",
		header: {
			pre: `For`,
			mid: "serving and retired personnel of Armed Forces & Paramilitary Forces",
			post: ", and their recognised dependants",
		},
		body: "It is mandatory to present a valid Armed Forces ID or a dependent card at the time of check-in",
	},
];
function SpecialFares() {
	return (
		<>
			{specialFares.map(({ title, logo, header, body }) => {
				const data = (
					<Box
						sx={{
							width: 250,
							bgcolor: "#fff",
							filter: "drop-shadow(0 4px 15px rgba(0, 0, 0, .5))",
						}}
					>
						<Stack
							direction={"row"}
							gap={"5px"}
							alignItems={"flex-start"}
							sx={{ p: "10px 15px !important" }}
						>
							<img src={logo} />{" "}
							<Typography
								fontSize={14}
								color={"rgba(0,0,0,0.85)"}
							>
								{header.pre}{" "}
								<span style={{ fontWeight: 700 }}>
									{header.mid}
								</span>{" "}
								{header.post}
							</Typography>
						</Stack>
						<Box
							sx={{
								color: "rgba(0,0,0,0.85)",
								bgcolor: "#FFF3EE !important",
								fontSize: 12,
								p: "10px 15px !important",
							}}
						>
							{body}
						</Box>
					</Box>
				);
				return (
					<Tooltip key={title} title={data} arrow>
						<Box
							sx={{
								p: "5px 10px 5px 5px",
								display: "flex",
								flexDirection: "row",
								gap: 1,
								border: "1px solid rgba(0,0,0,0.6)",
								color: "rgba(0,0,0,0.8)",
								borderRadius: "8px",
								alignItems: "center",
							}}
						>
							<img src={logo} />
							<Typography fontSize={"13px"}>{title}</Typography>
						</Box>
					</Tooltip>
				);
			})}
		</>
	);
}
export default React.memo(SpecialFares);
