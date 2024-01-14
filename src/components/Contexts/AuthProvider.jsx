import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
// const JWT = JSON.parse(localStorage.getItem("authToken"));
const user = JSON.parse(localStorage.getItem("userDetails")) || {};
const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";

export const useAuthContext = () => {
	return useContext(AuthContext);
};
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
		console.log(data);
		if (data.status == "success") {
			localStorage.setItem("authToken", JSON.stringify(data.token));
			const user = { name: data.data.name, email: data.data.email };
			localStorage.setItem("userDetails", JSON.stringify(user));
		}
	} catch (error) {
		console.log(error);
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
		console.log(data);
		if (data.status == "success") {
			localStorage.setItem("authToken", JSON.stringify(data.token));
			const user = { name: data.data.name, email: data.data.email };
			localStorage.setItem("userDetails", JSON.stringify(user));
		}
	} catch (error) {
		console.log(error);
	}
}
const userDetail = {
	name: "John Doe",
	email: "johndoe@gmail.com",
	password: "123456",
};
logIn(userDetail);
export default function AuthProvider({ children }) {
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const provider = {
		showLoginForm,
		setShowLoginForm,
		isLoggedIn,
		setIsLoggedIn,
		logIn,
		signUp,
	};
	return (
		<AuthContext.Provider value={{ ...provider }}>
			{children}
		</AuthContext.Provider>
	);
}
