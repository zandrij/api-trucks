export interface AccountMail {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
}

export const account: AccountMail = {
    host: <string>process.env.HOST,
    port: process.env.PORT as unknown as number,
    secure: process.env.SECURE as unknown as boolean,
    user: <string>process.env.USER,
    pass: <string>process.env.PASS
}