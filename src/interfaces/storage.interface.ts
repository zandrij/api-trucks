export interface Storage {
    filename: string;
    path: string;
    idUser: string;
    reference: string;
    type: 'cash' | 'transfer' | 'mobile';
    status: "wait" | "paid" | "reject" | "aproved" | "cancel";
    amount: number;
}