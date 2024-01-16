import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const JWT = JSON.parse(localStorage.getItem("authToken"));
const user = JSON.parse(localStorage.getItem("userDetails")) || {};
const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";

export const useAuthContext = () => {
	return useContext(AuthContext);
};

// const tempUserDetail = {
// 	name: "John Doe",
// 	email: "johndoe@gmail.com",
// 	password: "123456",
// };
const tempUserDetail = {
	name: "Gurpreet",
	email: "guru@guru.guru",
	password: "guru",
};
// logIn(userDetail);
export default function AuthProvider({ children }) {
	async function signUp(user) {
		const bodyObj = { ...user, appType: "bookingportals" };
		try {
			const respone = await fetch(
				"https://academics.newtonschool.co/api/v1/bookingportals/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
					body: JSON.stringify(bodyObj),
				}
			);
			const data = await respone.json();
			if (data.status == "fail") {
				return new Error("User already exists");
			}
			if (data.status == "success") {
				localStorage.setItem("authToken", JSON.stringify(data.token));
				const user = {
					name: data.data.user.name,
					email: data.data.user.email,
				};
				localStorage.setItem("userDetails", JSON.stringify(user));
				setIsLoggedIn(true);
			}
		} catch (error) {
			return error;
		}
	}
	async function logIn(user) {
		const bodyObj = { ...user, appType: "bookingportals" };
		try {
			const respone = await fetch(
				"https://academics.newtonschool.co/api/v1/bookingportals/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
					body: JSON.stringify(bodyObj),
				}
			);
			const data = await respone.json();
			if (data.status == "fail") {
				return new Error("Incorrect EmailId or Password");
			}
			if (data.status == "success") {
				localStorage.setItem("authToken", JSON.stringify(data.token));
				const user = { name: data.data.name, email: data.data.email };
				localStorage.setItem("userDetails", JSON.stringify(user));
				setIsLoggedIn(true);
			}
		} catch (error) {
			return error;
			// console.log(error);
		}
	}
	function logOut() {
		localStorage.setItem("authToken", null);
		localStorage.setItem("userDetails", null);
		setIsLoggedIn(false);
	}
	const [showLoginSignupForm, setShowLoginSignupForm] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const provider = {
		showLoginSignupForm,
		setShowLoginSignupForm,
		isLoggedIn,
		setIsLoggedIn,
		logIn,
		signUp,
		logOut,
	};
	// logIn(tempUserDetail);
	useEffect(() => {
		if (JWT) {
			setIsLoggedIn(true);
		}
	}, []);
	return (
		<AuthContext.Provider value={{ ...provider }}>
			{children}
		</AuthContext.Provider>
	);
}
