export interface Storage {
    filename: string;
    path: string;
    idUser: string;
    reference: string;
    type: 'cash' | 'transfer' | 'mobile';
}