# 🍔 TypeScript Food Ordering & Billing System

A fully interactive, strictly-typed terminal-based application built natively in Node.js and TypeScript. This project serves as a robust backend logic simulation of a restaurant's ordering and billing lifecycle—operating entirely without a frontend.

**🔗 GitHub Repository:** [jalpatel2646/food-ordering-system](https://github.com/jalpatel2646/food-ordering-system)

---

## ✨ Features

- **Interactive Terminal Menu:** Clean ANSI-colored CLI navigation using Node's `readline`.
- **Customer Segmentation:** Dynamically assign users as either strict `Guest` or tiered `Member` using type constraints.
- **Cart Management:** Complete flow for adding, dynamically updating quantities, and removing menu items.
- **Dynamic Billing Engine:** Automatically computes subtotals, cascading tiered discounts, and tax derivations natively.
- **State Management:** Preserves live order modifications inherently tracking current order status across processing phases.
- **Robust Error Handling:** Defends against anomalous inputs utilizing strict try-catch handlers blocking system crashes.

## 🚀 Extra Feature
*This project encompasses an enhanced capability beyond standard assignment expectations:*
- **Order History Viewer:** Successfully checked-out orders are locally cached into a session state layer, which can be elegantly mapped and reprinted via **Menu Option 9**.

---

## 🛠 Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Environment:** [Node.js](https://nodejs.org/)
- **Core Modules:** `readline` (No external prompt dependencies utilized)

---

## 📂 Project Structure

```text
food-ordering-system/
├── dist/                # Compiled JavaScript output
├── node_modules/        # Dependencies
├── src/                 # Main TypeScript Source Files
│   ├── billing.ts       # Logic for subtotals, complex discounts, and GST scaling
│   ├── cart.ts          # Pure mapped array functions for item manipulations
│   ├── customer.ts      # Profile generation and Member type narrowing definitions
│   ├── data.ts          # Base storage generating 8 hardcoded test restaurant products
│   ├── index.ts         # Central Interactive entry point & CLI Application State
│   ├── order.ts         # State flow validations mapping status updates
│   ├── payment.ts       # Discriminated handling gateway executing Exhaustive Checks
│   └── types.ts         # Foundational interfaces and global strict types
├── .gitignore           # Ignored system files & environment chunks
├── package.json         # Node CLI initialization scripts targeting TS-Node
├── tsconfig.json        # Strict compilation rules routing src to dist
└── README.md            # You are here!
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jalpatel2646/food-ordering-system.git
   cd food-ordering-system
   ```

2. **Install local dependencies:**
   *(Ensure you have [Node.js](https://nodejs.org/en/) installed securely on your machine)*
   ```bash
   npm install
   ```

---

## ▶️ How to Run

Compile and start the central terminal wizard natively using:
```bash
npm start
```
*(Optionally, you can strictly evaluate checking syntax by running `npm run build` directly and viewing typescript behaviors natively).*

---

## 📖 How to Use

Simply press numbers **1-10** on your keyboard to navigate through the interactive terminal options seamlessly:
1. **View Food Menu:** Prints all structured menu arrays wrapping Categories & System IDs cleanly.
2. **Create Customer:** Initializes an active structural session formatted safely as Guest or standard Tiered Member.
3. **Add Item to Cart:** Submits IDs and Quantities tracking exact parameters into our state bounds natively.
4. **View Cart:** Evaluates mapping subtotal values outputting structural receipts dynamically.
5. **Update Quantity:** Scales nested mapped numerical properties precisely.
6. **Remove Item from Cart:** Discards ID alignments efficiently pulling elements directly out of the primary sequence.
7. **Checkout & Pay:** Finalizes strict calculations resolving taxes, processes Payment Discriminated options, and commits securely to order states!
8. **Change Order Status:** Pushes the state hierarchy string (pending ➔ confirmed ➔ preparing ➔ delivered ➔ cancelled).
9. **View Order History:** Extracts and reprints verified completion `BillSuccess` shapes executed specifically via Option 7.
10. **Exit:** Resolves bindings clearing up RAM scaling securely.

---

## 💸 Discount Rules

Members are granted flat discounts calculated off standard cart subtotals natively. 

| Membership Tier  | Base Discount (%) |
|------------------|-------------------|
| Standard Guest   | 0%                |
| Silver Member    | 5%                |
| Gold Member      | 10%               |
| Platinum Member  | 15%               |

**Volume Bonus:** If the total cart mapped value strictly exceeds **₹2000**, a structurally integrated **extra flat 5% discount** is sequentially chained onto the base value simultaneously!

---

## 🧾 GST Information

A uniform standard **5% Goods and Services Tax (GST)** processes accurately mapped across all final bills securely. 
*(Note: Following rigorous logic validations, strict GST configurations mathematically resolve purely **after** layered discounts and volume compensations have natively applied directly onto the subtotal element).*

---

## 💳 Payment Methods Supported

- 💵 **Cash:** Simple structural return wrapping.
- 💳 **Card:** Prompts directly narrowing exactly onto secure digits mappings processing explicit bounds.
- 📱 **UPI:** Dynamic extraction bindings mapping ID endpoints directly.

---

## 🧠 TypeScript Concepts Used

1. **Discriminated Unions:** Securely structuring mutually exclusive logic variants independently scaling (e.g., cleanly mapping between `BillError` vs `BillSuccess`).
2. **Intersection Types:** Wrapping elements elegantly resolving dual conditions concurrently (combining `FoodItem` deeply targeting distinct mapping options).
3. **Type Narrowing / Type Guards:** Leveraging Javascript's inherent `"in"` traits routing interface elements explicitly natively filtering standard interfaces.
4. **Exhaustive Type Checking:** Hardcoded `assertNever(x: never)` configurations enforce developers cleanly align endpoints evaluating every variant inside dynamic conditions natively (`OrderStatus`).
5. **Strict Literal Typings:** Global logic explicitly omitting any insecure occurrences of generic `any` values.

---

## ✅ Assignment Checklist

- [x] Application runs successfully from terminal natively
- [x] At least 8 food items structured 
- [x] Guest and Member properties validate optimally mapped
- [x] Cart add, update, and remove functions execute immutably
- [x] Subtotal generation resolves natively correctly
- [x] Membership tier rules logic binds efficiently
- [x] Additional ₹2000 discount evaluates dynamically 
- [x] GST mathematical applications execute explicitly *after* discounts 
- [x] Cash/Card/UPI options segregate uniquely securely
- [x] Order status bounds manipulate strictly mapped 
- [x] **`BillResult` definitively leverages true Discriminated Unions**
- [x] **Type Narrowing operates optimally processing nested elements** 
- [x] **`never` is actively hardcoded verifying continuous Switch Exhaustiveness natively**
- [x] **NO `any` configurations are structurally utilized**
- [x] **NO `Classes` constructed fundamentally (Pure ES structural derivations deployed)**
- [x] Target Functions route efficiently strictly referencing proper Interfaces natively
- [x] Clear Separation of Concerns (Logic is decoupled explicitly into 8 internal sub-modules)
- [x] **Extra Assignment Feature:** `Order History Viewer` dynamically integrated seamlessly via UI Option 9 

---

## 👨‍💻 Author

**Jal Patel**  
Feel free to connect or view the interactive logic patterns natively executed on GitHub at [jalpatel2646](https://github.com/jalpatel2646).