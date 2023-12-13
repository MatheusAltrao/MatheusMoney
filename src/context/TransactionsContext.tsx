import { format } from 'date-fns';
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
    startDate: string;
    endDate: string;
    handleStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetDates: () => void;
    showDateFilterResult: () => ReactNode | undefined;
}

export const TransactionsContext = createContext<TransactionsContextProps>({
    transactions: [],
    total: { totalDeposits: 0, totalWithdraws: 0, rest: 0 },
    addNewTransaction: () => {},
    clearTransaction: () => {},
    deleteTransaction: () => {},
    startDate: '',
    endDate: '',
    handleStartDate: () => {},
    handleEndDate: () => {},
    handleResetDates: () => {},
    showDateFilterResult: () => undefined,
});

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<TransactionType[]>(
        JSON.parse(localStorage.getItem('@matheus-money/transactions') || '[]'),
    );

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    /*   const [dateResult, setDateResult] = useState(''); */

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

    const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleResetDates = () => {
        setStartDate('');
        setEndDate('');
    };

    const showDateFilterResult = () => {
        if (startDate && endDate) {
            const formatStartDate = format(new Date(startDate), 'dd/MM/yyyy');
            const formatEndtDate = format(new Date(endDate), 'dd/MM/yyyy');

            return (
                <div className='flex items-center justify-start gap-2 '>
                    <p>{formatStartDate}</p>
                    <div className='w-2 h-px bg-zinc-200' />
                    <p>{formatEndtDate}</p>
                </div>
            );
        } else {
            return <p>Selecionar Data</p>;
        }
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
                    startDate,
                    endDate,
                    handleStartDate,
                    handleEndDate,
                    handleResetDates,
                    showDateFilterResult,
                }}
            >
                {children}
            </TransactionsContext.Provider>
        </div>
    );
};

export default TransactionsProvider;
