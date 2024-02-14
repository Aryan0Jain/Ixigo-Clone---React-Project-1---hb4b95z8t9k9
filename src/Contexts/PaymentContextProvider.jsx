import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();
export const usePaymentContext = () => {
	return useContext(PaymentContext);
};
export default function PaymentContextProvider({ children }) {
	const [bookingFunction, setBookingFunction] = useState();
	const [paymentIsPending, setPaymentisPending] = useState(false);
	const [amount, setAmount] = useState(0);
	const context = {
		bookingFunction,
		setBookingFunction,
		paymentIsPending,
		setPaymentisPending,
		amount,
		setAmount,
	};
	return (
		<PaymentContext.Provider value={context}>
			{children}
		</PaymentContext.Provider>
	);
}
