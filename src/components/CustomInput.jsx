import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from "@mui/material";
import React from "react";

export default function CustomInput({ type = "text", value, setValue, label }) {
	// const [showClear, setShowClear] = React.useState(false);

	const handleClickClear = () => setValue("");

	const handleMouseDownClear = (event) => {
		event.preventDefault();
	};
	return (
		<FormControl
			color="error"
			sx={{
				m: 1,
				width: "25ch",
				// ":hover": { border: "none", scale: 5 },

				// "&:hover:not($disabled):after": {
				// 	borderBottom: "none",
				// },
			}}
			variant="standard"
		>
			<InputLabel sx={{ fontSize: "16px" }} shrink>
				{label}
			</InputLabel>
			<Input
				sx={{
					// ":focus": { borderColor: "secondary.hover" },
					"::after": {
						borderBottomWidth: "3px",
						borderBottomColor: "secondary.hover",
					},
				}}
				placeholder="Enter City"
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				endAdornment={
					<InputAdornment position="end">
						{value != "" && (
							<IconButton
								sx={{ ":hover path": { fill: "black" } }}
								disableRipple
								// aria-label="toggle password visibility"
								onClick={handleClickClear}
								onMouseDown={handleMouseDownClear}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="16"
									width="12"
									viewBox="0 0 384 512"
								>
									<path
										fill="rgba(0, 0, 0, 0.5)"
										d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
									/>
								</svg>
							</IconButton>
						)}
					</InputAdornment>
				}
			/>
		</FormControl>
	);
}
