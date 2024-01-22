import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Footer() {
	return (
		<div>
			<Box sx={{ bgcolor: "#3A1248", width: "100%" }}>
				<Box
					sx={{
						maxWidth: 1280,
						mx: "auto",
						py: 4,
						color: "rgba(255,255,255,.8)",
					}}
				>
					<Typography fontSize={"18px"} fontWeight={700}>
						About ixigo
					</Typography>
					<Typography fontSize={"12px"}>
						About ixigo Launched in 2007, ixigo is a technology
						company focused on empowering Indian travellers to plan,
						book and manage their trips across rail, air, buses and
						hotels. We assist travellers in making smarter travel
						decisions by leveraging artificial intelligence, machine
						learning, and data science led innovations on our OTA
						platforms, comprising our websites and mobile
						applications. Our vision is to become the most
						customer-centric travel company, by offering the best
						customer experience to our users. Our focus on travel
						utility and customer experience for travellers in the
						'next billion user' segment is driven by technology,
						cost-efficiency and our culture of innovation has made
						us India's leading travel ecosystem for the 'next
						billion users'.
					</Typography>
				</Box>
			</Box>
			<Box sx={{ width: "100%", bgcolor: "#2E013D", p: 2 }}>
				<Typography
					color="rgba(255,255,255,.8)"
					fontSize="10px"
					fontWeight={700}
					sx={{ width: "fit-content", mx: "auto" }}
				>
					© 2024 Le Travenues Technology Ltd. India. All brands are
					trademarks of their respective owners.
				</Typography>
			</Box>
		</div>
	);
}
