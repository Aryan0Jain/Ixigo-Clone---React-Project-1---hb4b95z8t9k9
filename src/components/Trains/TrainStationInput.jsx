import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const TrainStationInput = forwardRef(
	({ value, setValue, label, placeholder, options, removeError }, ref) => {
		return (
			<Autocomplete
				ref={ref}
				disableClearable
				disablePortal
				autoComplete
				value={options[value]}
				onChange={(e, v) => {
					removeError();
					setValue(options.findIndex((item) => item == v));
				}}
				options={options}
				getOptionLabel={(option) => option}
				sx={{
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
						placeholder={placeholder}
						sx={{
							border: "none",
							outline: "none",
						}}
						label={label}
					/>
				)}
			/>
		);
	}
);
export default TrainStationInput;
