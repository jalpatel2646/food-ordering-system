import { CartItem, Customer, BillResult, OrderStatus } from "./types";
import { calculateSubtotal } from "./cart";

export const calculateDiscount = (customer: Customer, subtotal: number): number => {
    let discountRate = 0;
    
    // Membership discount
    if (customer.type === "member") {
        switch (customer.level) {
            case "silver":
                discountRate += 0.05; // 5%
                break;
            case "gold":
                discountRate += 0.10; // 10%
                break;
            case "platinum":
                discountRate += 0.15; // 15%
                break;
        }
    }
    
    // Additional 5% discount if subtotal > 2000
    if (subtotal > 2000) {
        discountRate += 0.05;
    }
    
    return subtotal * discountRate;
};

export const calculateTax = (amountAfterDiscount: number): number => {
    // 5% GST after discounts
    return amountAfterDiscount * 0.05;
};

export const calculateFinalAmount = (subtotal: number, discountAmount: number): number => {
    const amountAfterDiscount = subtotal - discountAmount;
    const tax = calculateTax(amountAfterDiscount);
    return amountAfterDiscount + tax;
};

export const generateBill = (cart: CartItem[], customer: Customer, orderStatus: OrderStatus = "confirmed"): BillResult => {
    if (cart.length === 0) {
        return {
            status: "error",
            errorMessage: "Cart cannot be empty to generate a bill."
        };
    }
    
    const subtotal = calculateSubtotal(cart);
    const discountApplied = calculateDiscount(customer, subtotal);
    const finalAmount = calculateFinalAmount(subtotal, discountApplied);
    
    return {
        status: "success",
        totalAmount: subtotal,
        discountApplied: discountApplied,
        finalAmount: finalAmount,
        orderStatus: orderStatus,
        customer,
        items: cart
    };
};
