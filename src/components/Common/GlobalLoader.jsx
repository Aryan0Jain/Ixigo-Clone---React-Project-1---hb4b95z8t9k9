import { Box, Modal, Skeleton } from "@mui/material";
import React from "react";

export default function GlobalLoader() {
	return (
		<Modal open={true} onClose={() => {}} sx={{}}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					display: "flex",
					gap: 2,
					height: "fit-content",
				}}
			>
				<Skeleton
					sx={{
						bgcolor: "#ffffff",
						width: 20,
						height: 32,
						p: 0,
						m: "auto",
						borderRadius: "50%",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "#ffffff",
						width: 20,
						height: 32,
						p: 0,
						m: "auto",
						borderRadius: "50%",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "#ffffff",
						width: 20,
						height: 32,
						p: 0,
						m: "auto",
						borderRadius: "50%",
					}}
				/>
			</Box>
		</Modal>
	);
}
