import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

const DateFilter = () => {
    const {
        endDate,
        startDate,
        handleEndDate,
        handleStartDate,
        handleResetDates,
    } = useContext(TransactionsContext);

    return (
        <Dialog.Portal>
            <Dialog.Overlay
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.75)',
                    zIndex: '20',
                }}
            />
            <Dialog.Content
                className={`z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] fixed rounded-md w-full  max-w-[28rem] bg-zinc-900 `}
            >
                <div>
                    <header className=' p-4 text-center border-b border-zinc-500'>
                        <h2 className='text-xl font-medium'>
                            Filtrar por data
                        </h2>

                        <Dialog.Close className='absolute top-5 right-3 hover:text-zinc-200 text-zinc-400 transition-colors'>
                            <X size={24} />
                        </Dialog.Close>
                    </header>

                    <div className='p-4 space-y-4'>
                        <div className='space-y-2'>
                            <p>Data de início</p>
                            <input
                                value={startDate}
                                onChange={handleStartDate}
                                className='bg-zinc-800 focus:outline-none text-zinc-200 h-10 rounded w-full px-4 cursor-pointer '
                                type='date'
                            />
                        </div>

                        <div className='space-y-2'>
                            <p>Data de fim</p>
                            <input
                                value={endDate}
                                onChange={handleEndDate}
                                className='bg-zinc-800 focus:outline-none text-zinc-200 h-10 rounded w-full px-4 cursor-pointer '
                                type='date'
                                min={startDate}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center border-t border-zinc-500 gap-4 p-4'>
                        <Dialog.Close
                            onClick={handleResetDates}
                            className='btn-secondary bg-red-600'
                        >
                            Cancelar
                        </Dialog.Close>

                        <Dialog.Close
                            type='submit'
                            className='btn-secondary bg-transparent border border-zinc-600'
                        >
                            Filtrar
                        </Dialog.Close>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default DateFilter;
