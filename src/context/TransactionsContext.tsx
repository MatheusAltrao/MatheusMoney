import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

export interface TransactionType {
    id: string;
    title: string;
    price: string;
    type: 'deposit' | 'withdraw';
    category: string;
    date: string;
}

interface TransactionsContextProps {
    transactions: TransactionType[];
    total: { totalDeposits: number; totalWithdraws: number; rest: number };
    addNewTransaction: (transaction: TransactionType) => void;
    clearTransaction: () => void;
    deleteTransaction: (transactionId: string) => void;
}

export const TransactionsContext = createContext<TransactionsContextProps>({
    transactions: [],
    total: { totalDeposits: 0, totalWithdraws: 0, rest: 0 },
    addNewTransaction: () => {},
    clearTransaction: () => {},
    deleteTransaction: () => {},
});

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<TransactionType[]>(
        JSON.parse(localStorage.getItem('@matheus-money/transactions') || '[]'),
    );

    useEffect(() => {
        localStorage.setItem(
            '@matheus-money/transactions',
            JSON.stringify(transactions),
        );
    }, [transactions]);

    const addNewTransaction = (transaction: TransactionType) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const total = useMemo(() => {
        const deposits = transactions.filter(
            (transaction) => transaction.type === 'deposit',
        );

        const withdraws = transactions.filter(
            (transaction) => transaction.type === 'withdraw',
        );

        const totalDeposits = deposits.reduce((acc, deposit) => {
            const depositPrice = Number(deposit.price);
            return acc + depositPrice;
        }, 0);

        const totalWithdraws = withdraws.reduce((acc, withdraw) => {
            const withdrawPrice = Number(withdraw.price);
            return acc + withdrawPrice;
        }, 0);

        const rest = totalDeposits - totalWithdraws;

        return {
            totalDeposits,
            totalWithdraws,
            rest,
        };
    }, [transactions]);

    const clearTransaction = () => {
        setTransactions([]);
    };

    const deleteTransaction = (transactionId: string) => {
        const transactionWithoutOne = transactions.filter(
            (transaction) => transaction.id != transactionId,
        );

        return setTransactions(transactionWithoutOne);
    };

    return (
        <div>
            <TransactionsContext.Provider
                value={{
                    transactions,
                    total,
                    addNewTransaction,
                    clearTransaction,
                    deleteTransaction,
                }}
            >
                {children}
            </TransactionsContext.Provider>
        </div>
    );
};

export default TransactionsProvider;
