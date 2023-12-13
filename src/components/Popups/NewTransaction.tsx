import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useContext, useState } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import { v4 as uuid } from 'uuid';

const NewTransaction = () => {
    const { addNewTransaction } = useContext(TransactionsContext);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newTransaction = {
            id: uuid(),
            title,
            price,
            category,
            type,
            date: new Date().toLocaleDateString(),
        };

        addNewTransaction(newTransaction);
        handleResetFieldsForm();
    };

    const handleResetFieldsForm = () => {
        setTitle('');
        setPrice('');
        setCategory('');
    };

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
                        <h2 className='text-xl font-medium'>Nova Transação</h2>

                        <Dialog.Close className='absolute top-5 right-3 hover:text-zinc-200 text-zinc-400 transition-colors'>
                            <X size={24} />
                        </Dialog.Close>
                    </header>

                    <form
                        onSubmit={handleSubmit}
                        className='py-5 px-4 space-y-4'
                    >
                        <div>
                            <p className='block text-zinc-300 text-sm font-bold mb-2'>
                                Título
                            </p>
                            <input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='shadow appearance-none  rounded w-full py-2 px-3 bg-zinc-800 text-zinc-100 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                            />
                        </div>
                        <div>
                            <p className='block text-zinc-300 text-sm font-bold mb-2'>
                                Preço
                            </p>
                            <input
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='shadow appearance-none  rounded w-full py-2 px-3 bg-zinc-800 text-zinc-100 leading-tight focus:outline-none focus:shadow-outline'
                                type='number'
                                min={0}
                            />
                        </div>

                        <div className='flex items-start flex-col '>
                            <p className='block text-zinc-300 text-sm font-bold mb-2'>
                                Tipo
                            </p>
                            <div className='flex items-center  gap-4 w-full'>
                                <button
                                    className={`h-12 w-full flex items-center  transition-colors  justify-center gap-2  border rounded ${
                                        type == 'deposit'
                                            ? 'border-green-600 bg-green-950'
                                            : 'bg-transparent border-zinc-800 hover:border-zinc-500 '
                                    }`}
                                    type='button'
                                    onClick={() => setType('deposit')}
                                >
                                    {' '}
                                    <ArrowCircleUp
                                        className='text-green-600'
                                        size={24}
                                    />
                                    Entrada
                                </button>
                                <button
                                    className={`h-12 w-full flex items-center  transition-colors  justify-center gap-2  border rounded ${
                                        type == 'withdraw'
                                            ? 'border-red-600 bg-red-950'
                                            : 'bg-transparent border-zinc-800 hover:border-zinc-500 '
                                    }`}
                                    type='button'
                                    onClick={() => setType('withdraw')}
                                >
                                    {' '}
                                    <ArrowCircleDown
                                        className='text-red-600'
                                        size={24}
                                    />
                                    Saida
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className='block text-zinc-300 text-sm font-bold mb-2'>
                                Categoria
                            </p>
                            <input
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='shadow appearance-none  rounded w-full py-2 px-3 bg-zinc-800 text-zinc-100 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                            />
                        </div>

                        <div className='flex items-center justify-center border-t border-zinc-500 gap-4 p-4'>
                            <Dialog.Close className='btn-secondary bg-red-600'>
                                Cancelar
                            </Dialog.Close>

                            <button
                                type='submit'
                                className='btn-secondary bg-green-600'
                            >
                                Criar
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default NewTransaction;
