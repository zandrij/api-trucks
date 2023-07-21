import { Optional } from "sequelize";

export interface PaymentAttributes {
    id: number;
    idday: number;
    iduser: number;
    reference: string;
    image: string;
    type: 'cash' | 'transfer' | 'mobile'
    /**
     * ?wait: la data se creo y esta en espera de un pago,
     * paid: el cliente subio un pago,
     * !reject: el admin rechaza un pago (pago invalido) y el
     * cliente tiene que subir otro comprobante
     * *aproved: pago a sido aprovado
     * cancel: solo si por alguna razon deseas cancelar el pago
     */
    status: 'wait' | 'paid' | 'reject' | 'aproved' | 'cancel';
    createAt?: Date;
    updateAt?: Date;

}

export interface PaymentInput extends Optional<PaymentAttributes, 'id' | 'reference' | 'type' | 'image'> {}
export interface PaymentOuput extends Required<PaymentAttributes> {}