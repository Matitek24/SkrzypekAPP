export interface TransactionDto {
    id: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    category: string;
    description: string;
    transactionDate: string; // Możesz też użyć typu Date, ale z backendu zazwyczaj przychodzi string ISO
  }
  
  export interface FinanceDashboardResponse {
    totalNetWorth: number;
    financialRunwayMonths: number;
    emergencyFundProgressPercent: number;
    recentTransactions: TransactionDto[];
  }
  
  // TEGO BRAKOWAŁO:
  export interface MonthlyStatDto {
    month: number;
    income: number;
    expense: number;
  }