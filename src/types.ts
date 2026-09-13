export type FoodCategory = "pizza" | "burger" | "drink" | "dessert";

export type MembershipLevel = "silver" | "gold" | "platinum";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";

export interface FoodItem {
    id: string;
    name: string;
    price: number;
    category: FoodCategory;
    isVeg: boolean;
}

export interface Guest {
    type: "guest";
    name: string;
}

export interface Member {
    type: "member";
    name: string;
    memberId: string;
    level: MembershipLevel;
}

export type Customer = Guest | Member;

export type CartItem = FoodItem & {
    quantity: number;
    specialInstruction?: string;
};

export interface CashPayment {
    method: "cash";
}

export interface CardPayment {
    method: "card";
    cardNumber: string;
}

export interface UpiPayment {
    method: "upi";
    upiId: string;
}

export type Payment = CashPayment | CardPayment | UpiPayment;

export interface BillSuccess {
    status: "success";
    totalAmount: number;
    discountApplied: number;
    finalAmount: number;
    orderStatus: OrderStatus;
    customer: Customer;
    items: CartItem[];
}

export interface BillError {
    status: "error";
    errorMessage: string;
}

export type BillResult = BillSuccess | BillError;
