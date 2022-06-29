export type UserDto = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    freeSession: number;
    disabled: boolean;
    skillr: boolean;
    firstName: string;
    lastName: string;
    email: string;
    newEmail: string;
    notification: boolean;
    forDelete: boolean;
    mobileNumber: string;
    stripeCustomerId: string;
    stripePaymentMethod: string;
    displayName: string;
    dob: Date;
};
