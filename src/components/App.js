import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import { ThemeProvider } from "@mui/material";
import theme from "./Contexts/Theme";
import Flights from "./Flights/Flights";
import Trains from "./Trains/Trains.jsx";
import AuthProvider from "./Contexts/AuthProvider";
import Search from "./Flights/Search";
import SearchProvider from "./Contexts/SearchProdiver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TrainSearchProvider from "./Contexts/TrainSearchProvider";
import TrainsSearch from "./Trains/TrainsSearch.jsx";
import Footer from "./Footer";
import Buses from "./Buses/Buses.jsx";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<BrowserRouter>
						<SearchProvider>
							<TrainSearchProvider>
								<Navbar />
								<Routes>
									<Route path="/" element={<Flights />} />
									<Route
										path="/flights"
										element={<Flights />}
									/>
									<Route
										path="/flights/search"
										element={<Search />}
									/>
									<Route
										path="/trains"
										element={<Trains />}
									/>
									<Route
										path="/trains/search"
										element={<TrainsSearch />}
									/>
									<Route path="/buses" element={<Buses />} />
									<Route
										path="/search/:type"
										element={<Search />}
									/>
								</Routes>
								<Footer />
							</TrainSearchProvider>
						</SearchProvider>
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
