import { forwardRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { BUS_CITIES } from "../../../constants";

const BusCityInput = forwardRef(
	(
		{
			Icon,
			placeholder,
			value,
			setValue,
			removeError,
			bgColor,
			borderRadius,
		},
		ref
	) => {
		return (
			<Box
				sx={{
					display: "flex",
					border: "1px solid rgba(0,0,0,0.1)",
					borderRadius: borderRadius ?? "15px",
					alignItems: "center",
					height: "fit-content",
					py: 0.75,
					px: 1,
					background: bgColor,
				}}
			>
				<Autocomplete
					ref={ref}
					disableClearable
					disablePortal
					autoComplete
					options={BUS_CITIES}
					value={BUS_CITIES[value]}
					onChange={(e, v) => {
						removeError();
						setValue(BUS_CITIES.findIndex((item) => item == v));
					}}
					componentsProps={{
						paper: {
							sx: {
								position: "absolute",
								top: 10,
								width: 250,
								left: 50,
							},
						},
					}}
					sx={{
						px: 2,
						width: 250,
						"& svg": {
							color: "#000000",
						},
						"&.Mui-focused svg": {
							color: "#ec5b24",
						},
					}}
					renderInput={(params) => (
						<TextField
							variant="standard"
							{...params}
							sx={{
								border: "none",
								outline: "none",
							}}
							InputProps={{
								...params.InputProps,
								placeholder: placeholder,
								startAdornment: (
									<InputAdornment position="start">
										<Icon />
									</InputAdornment>
								),
								disableUnderline: true,
							}}
							// label="Movie"
						/>
					)}
				/>
			</Box>
		);
	}
);
export default BusCityInput;
