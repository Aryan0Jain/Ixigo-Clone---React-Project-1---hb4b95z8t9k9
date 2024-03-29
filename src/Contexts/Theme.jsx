import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
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
		tabcolor: {
			main: "#0770e4",
			light: "rgba(0, 0, 0, 0.87)",
		},
	},
	typography: { fontFamily: `"Open Sans", Helvetica, Arial, sans-serif` },
});
