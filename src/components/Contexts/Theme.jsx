import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ec5b24",
			dark: "#ec5b24",
		},
		// secondary: {
		// 	main: "rgba(0, 0, 0, 0.87)",
		// },
		secondary: {
			main: "#ec5b24",
			light: "rgba(0, 0, 0, 0.87)",
			hover: "#ec5b24",
		},
	},
	typography: { fontFamily: `"Open Sans", Helvetica, Arial, sans-serif` },
});
export default theme;
