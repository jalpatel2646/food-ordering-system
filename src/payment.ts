import { Payment } from "./types";

export function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

export const processPayment = (payment: Payment): boolean => {
    if (payment.method === "cash") {
        console.log("Processing Cash Payment...");
        return true;
    } else if (payment.method === "card") {
        console.log(`Processing Card Payment for card ending in ${payment.cardNumber.slice(-4)}`);
        return true;
    } else if (payment.method === "upi") {
        console.log(`Processing UPI Payment for ID ${payment.upiId}`);
        return true;
    } else {
        return assertNever(payment);
    }
};
