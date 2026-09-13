import * as readline from "readline";
import { menuItems } from "./data";
import { addToCart, removeFromCart, updateQuantity, calculateSubtotal } from "./cart";
import { generateBill } from "./billing";
import { createGuest, createMember } from "./customer";
import { processPayment } from "./payment";
import { updateOrderStatus } from "./order";
import { Customer, CartItem, OrderStatus, MembershipLevel, Payment, BillSuccess } from "./types";

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

// ANSI color codes
const c = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
    bold: "\x1b[1m"
};

// Application State
let currentCustomer: Customer | null = null;
let currentCart: CartItem[] = [];
let currentOrderStatus: OrderStatus = "pending";
let orderHistory: BillSuccess[] = []; // Option D implementation

const displayMenu = () => {
    console.log(`\n${c.cyan}${c.bold}==========================================
       🍕 FOOD ORDERING SYSTEM 🍔
==========================================${c.reset}
  1. View Food Menu
  2. Create Customer (Guest or Member)
  3. Add Item to Cart
  4. View Cart
  5. Update Quantity
  6. Remove Item from Cart
  7. Checkout & Pay
  8. Change Order Status
  9. View Order History ${c.yellow}(Extra Feature)${c.reset}
 10. Exit
${c.cyan}==========================================${c.reset}`);
};

async function handleViewMenu() {
    console.log(`\n${c.magenta}--- Food Menu ---${c.reset}`);
    menuItems.forEach(item => {
        const vegIcon = item.isVeg ? `${c.green}[Veg]${c.reset}` : `${c.red}[Non-Veg]${c.reset}`;
        console.log(` ID: ${c.bold}${item.id}${c.reset} | ${item.name.padEnd(20)} | $${item.price.toString().padEnd(4)} | (${item.category}) ${vegIcon}`);
    });
}

async function handleCreateCustomer() {
    try {
        const type = await askQuestion(`${c.yellow}Is the customer a (1) Guest or (2) Member? Enter 1 or 2: ${c.reset}`);
        const name = (await askQuestion("Enter Customer Name: ")).trim();
        if (!name) throw new Error("Name cannot be empty.");
        
        if (type === "1") {
            currentCustomer = createGuest(name);
            console.log(`${c.green}Guest customer '${name}' created successfully.${c.reset}`);
        } else if (type === "2") {
            const memberId = (await askQuestion("Enter Member ID: ")).trim();
            if (!memberId) throw new Error("Member ID cannot be empty.");
            
            const levelInput = await askQuestion("Enter Membership Level (silver/gold/platinum): ");
            const level = levelInput.toLowerCase();
            
            if (level === "silver" || level === "gold" || level === "platinum") {
                currentCustomer = createMember(name, memberId, level as MembershipLevel);
                console.log(`${c.green}Member customer '${name}' (${level}) created successfully.${c.reset}`);
            } else {
                throw new Error("Invalid membership level.");
            }
        } else {
            console.log(`${c.red}Invalid choice. Ignoring customer creation.${c.reset}`);
        }
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleAddToCart() {
    try {
        await handleViewMenu();
        const itemId = (await askQuestion(`\n${c.yellow}Enter Item ID to add: ${c.reset}`)).trim();
        const item = menuItems.find(i => i.id === itemId);
        
        if (!item) throw new Error("Invalid Item ID.");
        
        const qtyInput = await askQuestion(`Enter quantity for ${item.name}: `);
        const quantity = parseInt(qtyInput, 10);
        
        if (isNaN(quantity) || quantity <= 0) throw new Error("Quantity must be a positive number.");
        
        const instruction = await askQuestion("Any special instructions? (Leave blank if none): ");
        const sanitizedInstruction = instruction.trim() || undefined;
        
        currentCart = addToCart(currentCart, item, quantity, sanitizedInstruction);
        console.log(`${c.green}Item added to cart successfully.${c.reset}`);
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleViewCart() {
    console.log(`\n${c.magenta}--- Current Cart ---${c.reset}`);
    if (currentCart.length === 0) {
        console.log(`${c.yellow}Cart is currently empty.${c.reset}`);
        return;
    }
    
    currentCart.forEach((item, index) => {
        let msg = ` ${index + 1}. [ID: ${item.id}] ${item.name} x ${item.quantity} = $${item.price * item.quantity}`;
        if (item.specialInstruction) msg += ` ${c.cyan}(Note: ${item.specialInstruction})${c.reset}`;
        console.log(msg);
    });
    console.log(`${c.bold}\nSubtotal: $${calculateSubtotal(currentCart)}${c.reset}`);
}

async function handleUpdateQuantity() {
    try {
        await handleViewCart();
        if (currentCart.length === 0) return;
        
        const itemId = (await askQuestion(`\n${c.yellow}Enter Item ID to update: ${c.reset}`)).trim();
        const instructionStr = await askQuestion("Enter special instruction (must exactly match note, or blank if none): ");
        const instruction = instructionStr.trim() || undefined;
        const qtyInput = await askQuestion("Enter new quantity (0 to remove): ");
        const quantity = parseInt(qtyInput, 10);
        
        if (isNaN(quantity) || quantity < 0) throw new Error("Invalid quantity.");
        
        currentCart = updateQuantity(currentCart, itemId, quantity, instruction);
        console.log(`${c.green}Cart updated successfully.${c.reset}`);
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleRemoveItem() {
    try {
        await handleViewCart();
        if (currentCart.length === 0) return;
        
        const itemId = (await askQuestion(`\n${c.yellow}Enter Item ID to remove: ${c.reset}`)).trim();
        const instructionStr = await askQuestion("Enter special instruction (must exactly match note, or blank if none): ");
        const instruction = instructionStr.trim() || undefined;
        
        currentCart = removeFromCart(currentCart, itemId, instruction);
        console.log(`${c.green}Item removed if it existed.${c.reset}`);
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleCheckout() {
    try {
        if (currentCart.length === 0) throw new Error("Cart is empty. Cannot checkout.");
        if (!currentCustomer) throw new Error("No customer is active. Please create a customer first (Option 2).");
        
        currentOrderStatus = "confirmed";
        const bill = generateBill(currentCart, currentCustomer, currentOrderStatus);
        
        // Type narrowing discriminated union
        if (bill.status === "error") throw new Error(`Bill generation failed: ${bill.errorMessage}`);
        
        // At this point, bill is intrinsically typed as BillSuccess
        console.log(`\n${c.cyan}${c.bold}====== ORDER SUMMARY ======${c.reset}`);
        console.log(`Customer: ${c.bold}${bill.customer.name}${c.reset} (${bill.customer.type.toUpperCase()})`);
        if (bill.customer.type === "member") {
            console.log(`Active Tier: ${c.green}${bill.customer.level.toUpperCase()}${c.reset} (Discount: ${bill.customer.discountPercentage}%)`);
        }
        console.log("---------------------------");
        bill.items.forEach(item => {
            let mods = item.specialInstruction ? ` [${item.specialInstruction}]` : "";
            console.log(`${item.name}${mods} x ${item.quantity}: $${item.price * item.quantity}`);
        });
        console.log("---------------------------");
        console.log(`Subtotal: $${bill.totalAmount.toFixed(2)}`);
        if (bill.discountApplied > 0) {
            console.log(`Discount Applied: ${c.green}-$${bill.discountApplied.toFixed(2)}${c.reset}`);
        }
        console.log(`Final Tax & Total (+5% GST): ${c.bold}${c.green}$${bill.finalAmount.toFixed(2)}${c.reset}`);
        console.log(`${c.cyan}===========================${c.reset}\n`);
        
        const pMethod = await askQuestion(`${c.yellow}Select Payment Method - (1) Cash (2) Card (3) UPI: ${c.reset}`);
        let payment: Payment;
        
        if (pMethod === "2") {
            const cardNo = await askQuestion("Enter Card Number: ");
            if (!cardNo) throw new Error("Card number is required.");
            payment = { method: "card", cardNumber: cardNo };
        } else if (pMethod === "3") {
            const upi = await askQuestion("Enter UPI ID: ");
            if (!upi) throw new Error("UPI ID is required.");
            payment = { method: "upi", upiId: upi };
        } else {
            console.log(`${c.yellow}Defaulting to Cash.${c.reset}`);
            payment = { method: "cash" };
        }
        
        const success = processPayment(payment);
        if (success) {
            console.log(`${c.green}Payment successful! Order has been placed.${c.reset}`);
            updateOrderStatus(currentOrderStatus);
            // Option D: Save to order history
            orderHistory.push(bill);
            // Clear cart
            currentCart = [];
        }
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleChangeStatus() {
    try {
        console.log(`\nCurrent Status: ${c.bold}"${currentOrderStatus}"${c.reset}`);
        const newStatusInput = (await askQuestion("Enter new status (pending, confirmed, preparing, delivered, cancelled): ")).trim().toLowerCase();
        
        if (["pending", "confirmed", "preparing", "delivered", "cancelled"].includes(newStatusInput)) {
            currentOrderStatus = newStatusInput as OrderStatus;
            updateOrderStatus(currentOrderStatus);
            console.log(`${c.green}Status successfully updated.${c.reset}`);
        } else {
            throw new Error("Invalid Order Status! Ignoring update.");
        }
    } catch (e: unknown) {
        if (e instanceof Error) console.log(`${c.red}Error: ${e.message}${c.reset}`);
    }
}

async function handleViewOrderHistory() {
    console.log(`\n${c.magenta}--- Order History (${orderHistory.length} orders) ---${c.reset}`);
    if (orderHistory.length === 0) {
        console.log(`${c.yellow}No past orders found.${c.reset}`);
        return;
    }
    orderHistory.forEach((bill, idx) => {
        console.log(`\n${c.bold}Order #${idx + 1}${c.reset}:`);
        console.log(`  Customer: ${bill.customer.name}`);
        console.log(`  Items: ${bill.items.map(i => i.name).join(", ")}`);
        console.log(`  Total Paid: $${bill.finalAmount.toFixed(2)}`);
    });
}

async function runApplication() {
    let running = true;
    while (running) {
        try {
            displayMenu();
            const choice = (await askQuestion(`\n${c.bold}Select an option (1-10): ${c.reset}`)).trim();
            
            switch (choice) {
                case "1":
                    await handleViewMenu();
                    break;
                case "2":
                    await handleCreateCustomer();
                    break;
                case "3":
                    await handleAddToCart();
                    break;
                case "4":
                    await handleViewCart();
                    break;
                case "5":
                    await handleUpdateQuantity();
                    break;
                case "6":
                    await handleRemoveItem();
                    break;
                case "7":
                    await handleCheckout();
                    break;
                case "8":
                    await handleChangeStatus();
                    break;
                case "9":
                    await handleViewOrderHistory();
                    break;
                case "10":
                    console.log(`${c.green}Thank you for using the Food Ordering System. Goodbye!${c.reset}`);
                    running = false;
                    break;
                default:
                    console.log(`${c.red}Invalid choice. Please choose a valid number.${c.reset}`);
                    break;
            }
        } catch (e) {
            console.log(`${c.red}Fatal Error in main loop.${c.reset}`);
        }
    }
    rl.close();
}

// Boot application
runApplication();
