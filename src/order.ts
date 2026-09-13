import { OrderStatus } from "./types";

export function assertNever(x: never): never {
    throw new Error("Unexpected status: " + x);
}

export const updateOrderStatus = (status: OrderStatus): void => {
    switch (status) {
        case "pending":
            console.log("Order is currently pending.");
            break;
        case "confirmed":
            console.log("Order is confirmed and accepted.");
            break;
        case "preparing":
            console.log("Kitchen is currently preparing the order.");
            break;
        case "delivered":
            console.log("Order has been successfully delivered!");
            break;
        case "cancelled":
            console.log("Order was cancelled.");
            break;
        default:
            assertNever(status);
    }
};
