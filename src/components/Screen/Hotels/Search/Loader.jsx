import { Box, Container, Divider, Stack } from "@mui/material";
import React from "react";

export default function Loader() {
	return (
		<Container
			sx={{
				display: "flex",
				justifyContent: "space-between",
				mt: 2,
				gap: 1,
			}}
		>
			<Stack
				sx={{
					width: "25%",
					bgcolor: "#FFFFFF",
					p: 2,
					borderRadius: "8px",
					textAlign: "left",
					height: "fit-content",
				}}
				divider={<Divider orientation="horizontal" flexItem />}
				gap={2}
			>
				<Stack gap={2}>
					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
					>
						<Box
							className="hotel-loader"
							sx={{
								height: "32px",
								width: "100%",
								borderRadius: "4px",
							}}
						></Box>
					</Stack>
				</Stack>
				{Array.from({ length: 3 }).map((_, i) => {
					return (
						<Box key={i}>
							<Box
								className="hotel-loader"
								sx={{
									height: "28px",
									width: "150px",
									borderRadius: "4px",
								}}
							></Box>
							<Stack gap={2} sx={{ mt: 3 }}>
								{Array.from({ length: 3 }).map((_, i) => {
									return (
										<Stack
											key={i}
											direction={"row"}
											justifyContent={"space-between"}
										>
											<Box
												className="hotel-loader"
												sx={{
													height: "25px",
													borderRadius: "4px",
													width: "70%",
												}}
											></Box>
											<Box
												className="hotel-loader"
												sx={{
													height: "25px",
													borderRadius: "4px",
													width: "20%",
												}}
											></Box>
										</Stack>
									);
								})}
							</Stack>
						</Box>
					);
				})}
			</Stack>
			<Box sx={{ width: "75%", p: 2 }}>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box
						sx={{
							height: "30px",
							width: "200px",
							borderRadius: "4px",
						}}
						className="hotel-loader"
					></Box>
					<Box
						sx={{
							height: "45px",
							width: "180px",
							borderRadius: "4px",
						}}
						className="hotel-loader"
					></Box>
				</Stack>
				<Stack gap={2} sx={{ mt: 2 }}>
					{Array.from({ length: 5 }).map((_, i) => {
						return (
							<Stack
								key={i}
								direction={"row"}
								sx={{
									p: 2,
									bgcolor: "#fff",
									borderRadius: "10px",
								}}
								gap={2}
							>
								<Box
									position={"relative"}
									sx={{
										width: "300px",
										height: "200px",
										borderRadius: "10px",
									}}
									className="hotel-loader"
								></Box>
								<Stack direction={"row"} flex={1}>
									<Stack
										gap={2}
										alignItems={"flex-start"}
										sx={{ width: "75%" }}
									>
										<Box
											sx={{
												width: "250px",
												height: "24px",
												borderRadius: "4px",
											}}
											className="hotel-loader"
										></Box>
										<Box
											sx={{
												width: "180px",
												height: "22px",
												borderRadius: "4px",
											}}
											className="hotel-loader"
										></Box>
									</Stack>
									<Stack
										gap={1}
										sx={{ width: "25%" }}
										alignItems={"flex-end"}
										justifyContent={"flex-end"}
									>
										<Box
											sx={{
												height: "22px",
												width: "80px",
												borderRadius: "4px",
											}}
											className="hotel-loader"
										></Box>
										<Box
											sx={{
												height: "30px",
												width: "140px",
												borderRadius: "4px",
											}}
											className="hotel-loader"
										></Box>
									</Stack>
								</Stack>
							</Stack>
						);
					})}
				</Stack>
			</Box>
		</Container>
	);
}
