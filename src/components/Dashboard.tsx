import { ArrowCircleDown, ArrowCircleUp, Money } from '@phosphor-icons/react';
import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import formatPrice from '../utils/FormatPrice';

const Dashboard = () => {
    const { total } = useContext(TransactionsContext);

    return (
        <div className='w-full mt-20 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 '>
            <div className='w-full h-28 md:h-[8.5rem] bg-zinc-900 rounded px-8 py-6'>
                <div className='flex items-center justify-between mb-4'>
                    <p>Entradas</p>
                    <ArrowCircleUp className='text-green-600' size={26} />
                </div>

                <span className='  text-xl md:text-2xl font-medium '>
                    {' '}
                    {formatPrice(total.totalDeposits.toString())}{' '}
                </span>
            </div>
            <div className='w-full h-28 md:h-[8.5rem] bg-zinc-900 rounded px-8 py-6'>
                <div className='flex items-center justify-between mb-4'>
                    <p>Saídas</p>
                    <ArrowCircleDown className='text-red-600' size={26} />
                </div>
                <span className='  text-xl md:text-2xl font-medium '>
                    {formatPrice(total.totalWithdraws.toString())}
                </span>
            </div>
            <div
                className={`w-full h-28 md:h-[8.5rem]  rounded transition-colors px-8 py-6 ${
                    total.rest >= 0 ? 'bg-green-700' : 'bg-red-700'
                }`}
            >
                <div className='flex items-center justify-between mb-4'>
                    <p>Total</p>
                    <Money className='text-zinc-300' size={26} />
                </div>
                <span className='  text-xl md:text-2xl font-medium '>
                    {formatPrice(total.rest.toString())}
                </span>
            </div>
        </div>
    );
};

export default Dashboard;
