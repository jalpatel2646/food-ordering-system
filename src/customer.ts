import { Guest, Member, Customer, MembershipLevel } from "./types";

export const createGuest = (name: string): Guest => {
    return {
        type: "guest",
        name
    };
};

export const createMember = (name: string, memberId: string, level: MembershipLevel): Member => {
    let discountPercentage = 0;
    
    switch (level) {
        case "silver": 
            discountPercentage = 5; 
            break;
        case "gold": 
            discountPercentage = 10; 
            break;
        case "platinum": 
            discountPercentage = 15; 
            break;
    }
    
    return {
        type: "member",
        name,
        memberId,
        level,
        discountPercentage
    };
};

export const isMember = (customer: Customer): customer is Member => {
    return "level" in customer;
};
