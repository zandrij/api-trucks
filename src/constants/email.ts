export interface AccountMail {
    host: string;
    port: number;
    // secure: boolean;
    user: string;
    pass: string;
}

export const account: AccountMail = {
    host: <string>process.env.HOST || '',
    port: process.env.PORTSMTP as unknown as number || 465,
    // secure: process.env.SECURE as unknown as boolean || true,
    user: <string>process.env.USER || '',
    pass: <string>process.env.PASS || ''
}