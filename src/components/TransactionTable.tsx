import { useContext, useMemo, useState } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import formatPrice from '../utils/FormatPrice';
import SearchTransactions from './SearchTransactions';
import { Trash } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import ClearTable from './Popups/ClearTable';
import { JsonToExcel } from 'react-json-to-excel';
import { isAfter, isBefore } from 'date-fns';

const TransactionTable = () => {
    const { transactions, deleteTransaction, startDate, endDate } =
        useContext(TransactionsContext);

    const [searchValue, setSearchValue] = useState('');
    const [selectTypeFilter, setSelectTypeFilter] = useState('all');

    const handleDeleteTrasaction = (transactionId: string) => {
        deleteTransaction(transactionId);
    };

    const date = new Date().toLocaleDateString();

    const filteredTypeTransactions = useMemo(() => {
        if (selectTypeFilter === 'all') {
            return transactions || [];
        } else if (selectTypeFilter === 'deposit') {
            return (transactions || []).filter(
                (transaction) => transaction.type === 'deposit',
            );
        } else if (selectTypeFilter === 'withdraw') {
            return (transactions || []).filter(
                (transaction) => transaction.type === 'withdraw',
            );
        }
        return [];
    }, [transactions, selectTypeFilter]);

    const filteredTransactions = useMemo(() => {
        return filteredTypeTransactions
            .filter((transaction) => {
                const searchValueLowerCase = searchValue.toLowerCase();

                return (
                    transaction.title
                        .toLowerCase()
                        .includes(searchValueLowerCase) ||
                    transaction.price
                        .toLowerCase()
                        .includes(searchValueLowerCase) ||
                    transaction.category
                        .toLowerCase()
                        .includes(searchValueLowerCase) ||
                    transaction.date
                        .toLowerCase()
                        .includes(searchValueLowerCase)
                );
            })
            .filter((transaction) => {
                if (startDate && endDate) {
                    const saleStartDate = new Date(transaction.date);
                    const formatStartDate = new Date(startDate);
                    const formatEndDate = new Date(endDate);

                    return (
                        isAfter(saleStartDate, formatStartDate) &&
                        isBefore(saleStartDate, formatEndDate)
                    );
                } else {
                    return true;
                }
            });
    }, [searchValue, filteredTypeTransactions, startDate, endDate]);

    return (
        <div className='pb-10'>
            <SearchTransactions
                selectTypeFilter={selectTypeFilter}
                setSelectTypeFilter={setSelectTypeFilter}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            {filteredTransactions.length > 0 && (
                <div className='grid  grid-cols-[1fr_1fr_1fr_20px]  md:grid-cols-[4fr_1fr_1fr_1fr_1fr_20px]  px-2 md:px-8 text-zinc-500 mb-4 w-full'>
                    <p>Título</p>
                    <p>Preço</p>
                    <p className='hidden  md:inline'>Categoria</p>
                    <p className='hidden md:inline'>Tipo</p>
                    <p>Data</p>
                </div>
            )}

            <div>
                <div className='flex flex-col gap-2 min-h-[300px] max-h-[300px]  overflow-y-auto scrollbar pr-2 '>
                    {filteredTransactions.map((transaction, index) => (
                        <div
                            key={index}
                            className='  grid grid-cols-[1fr_1fr_1fr_20px]  md:grid-cols-[4fr_1fr_1fr_1fr_1fr_20px] px-4 py-5 md:px-8 transaction '
                        >
                            <div>
                                <p>{transaction.title}</p>
                            </div>
                            <div className='w-[130px]'>
                                <p className={`${transaction.type}  truncate`}>
                                    {formatPrice(transaction.price)}
                                </p>
                            </div>
                            <div className='hidden md:block'>
                                <p>{transaction.category}</p>
                            </div>
                            <div className='hidden md:block'>
                                <p>
                                    {transaction.type == 'deposit'
                                        ? 'Depósito'
                                        : 'Saída'}
                                </p>
                            </div>
                            <div>
                                <p>{transaction.date}</p>
                            </div>

                            <button
                                onClick={() =>
                                    handleDeleteTrasaction(transaction.id)
                                }
                            >
                                <div className='border hover:text-red-600 text-zinc-500 border-transparent hover:border-zinc-500 transition-colors h-8 w-8 flex items-center justify-center  rounded'>
                                    <Trash size={20} />
                                </div>
                            </button>
                        </div>
                    ))}

                    {filteredTransactions.length == 0 && (
                        <p className='text-center mt-8 text-zinc-500'>
                            Nenhum Item Encontrado.
                        </p>
                    )}
                </div>

                {filteredTransactions.length > 0 && (
                    <div className='flex items-center justify-center w-full mt-12 gap-2 '>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className='btn-secondary  bg-transparent transition-colors border border-zinc-600'>
                                    Limpar Histórico
                                </button>
                            </Dialog.Trigger>
                            <ClearTable />
                        </Dialog.Root>
                        <div className='overflow-hidden bg-[#4caf50] rounded-sm h-10 px-3  flex items-center justify-center'>
                            <abbr title='Fazer backup'>
                                <JsonToExcel
                                    colors='bg-zinc-900'
                                    title={
                                        <p className='text-base font-normal '>
                                            Fazer Backup
                                        </p>
                                    }
                                    data={transactions}
                                    fileName={`Transações-${date}`}
                                    btnClassName='btn-dowload'
                                />
                            </abbr>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionTable;
