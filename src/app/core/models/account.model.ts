export interface Account {
    id: string;
    balance: number;
    definition: {
        name: string;
        icon: string;
    };
    lastUpdate: string;
}

export interface AccountResponse{
accounts: Account[];
totalBalance: number;
}