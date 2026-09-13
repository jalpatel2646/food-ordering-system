import { CartItem, FoodItem } from "./types";

export const addToCart = (cart: CartItem[], item: FoodItem, quantity: number, specialInstruction?: string): CartItem[] => {
    const existingItem = cart.find(c => c.id === item.id && c.specialInstruction === specialInstruction);
    if (existingItem) {
        return cart.map(c => 
            (c.id === item.id && c.specialInstruction === specialInstruction)
                ? { ...c, quantity: c.quantity + quantity }
                : c
        );
    }
    return [...cart, { ...item, quantity, specialInstruction }];
};

export const removeFromCart = (cart: CartItem[], itemId: string, specialInstruction?: string): CartItem[] => {
    return cart.filter(c => !(c.id === itemId && c.specialInstruction === specialInstruction));
};

export const updateQuantity = (cart: CartItem[], itemId: string, quantity: number, specialInstruction?: string): CartItem[] => {
    if (quantity <= 0) {
        return removeFromCart(cart, itemId, specialInstruction);
    }
    return cart.map(c => 
        (c.id === itemId && c.specialInstruction === specialInstruction)
            ? { ...c, quantity }
            : c
    );
};

export const calculateItemTotal = (item: CartItem): number => {
    return item.price * item.quantity;
};

export const calculateSubtotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
};
