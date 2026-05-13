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
export interface CreateAccountRequest {
    name: string;
    initialBalance: number;
    icon: string;
    groupType: string;
  }