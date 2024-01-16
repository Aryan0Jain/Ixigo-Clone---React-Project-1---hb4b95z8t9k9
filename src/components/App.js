import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import { ThemeProvider } from "@mui/material";
import theme from "./Contexts/Theme";
import Flights from "./Flights";
import Trains from "./Trains";
import AuthProvider from "./Contexts/AuthProvider";
import Search from "./Search";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Flights />} />
						<Route path="/flights" element={<Flights />} />
						<Route path="/trains" element={<Trains />} />
						<Route path="/search/:type" element={<Search />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
