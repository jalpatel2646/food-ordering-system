import { FoodItem } from "./types";

export const menuItems: FoodItem[] = [
    { id: "1", name: "Margherita Pizza", price: 300, category: "pizza", isVeg: true },
    { id: "2", name: "Pepperoni Pizza", price: 450, category: "pizza", isVeg: false },
    { id: "3", name: "Veggie Burger", price: 150, category: "burger", isVeg: true },
    { id: "4", name: "Chicken Burger", price: 200, category: "burger", isVeg: false },
    { id: "5", name: "Coca Cola", price: 60, category: "drink", isVeg: true },
    { id: "6", name: "Cold Coffee", price: 120, category: "drink", isVeg: true },
    { id: "7", name: "Chocolate Brownie", price: 180, category: "dessert", isVeg: true },
    { id: "8", name: "Cheesecake", price: 250, category: "dessert", isVeg: true }
];
