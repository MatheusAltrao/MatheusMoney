import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import { JsonToExcel } from 'react-json-to-excel';

const ClearTable = () => {
    const { clearTransaction, transactions } = useContext(TransactionsContext);

    const date = new Date().toLocaleDateString();

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
                            Limpar Histórico
                        </h2>

                        <Dialog.Close className='absolute top-5 right-3 hover:text-zinc-200 text-zinc-400 transition-colors'>
                            <X size={24} />
                        </Dialog.Close>
                    </header>

                    <div className='p-4'>
                        <div className='max-h-[300px] overflow-y-scroll scrollbar space-y-5 px-2 '>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium  text-zinc-100'>
                                    Aviso Importante:
                                </h3>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />
                                    <p className='font-normal text-zinc-400'>
                                        Ao prosseguir com esta ação, você está
                                        prestes a excluir permanentemente todo o
                                        histórico de pagamentos associado à sua
                                        conta. Essa ação é irreversível e não
                                        poderá ser desfeita. Certifique-se de
                                        que você realmente deseja prosseguir com
                                        a exclusão antes de continuar.
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium mb-2 text-zinc-100'>
                                    Consequências da Exclusão:
                                </h3>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />
                                    <p className='font-normal text-zinc-400'>
                                        Todos os registros de transações,
                                        incluindo depósitos e retiradas, serão
                                        removidos.
                                    </p>
                                </div>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />
                                    <p className='font-normal text-zinc-400'>
                                        Informações como títulos, valores,
                                        categorias e datas associadas a cada
                                        transação serão perdidas. Não será
                                        possível recuperar ou restaurar o
                                        histórico de pagamentos após a exclusão.
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium mb-2 text-zinc-100'>
                                    Recomendações antes de Prosseguir:
                                </h3>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />

                                    <div className='relative'>
                                        <p className='font-normal text-zinc-400'>
                                            Exporte ou faça backup do histórico
                                            de pagamentos, se necessário, para
                                            referência futura.
                                        </p>

                                        <div className='overflow-hidden bg-[#4caf50] rounded-sm h-10 px-3  flex items-center justify-center'>
                                            <abbr title='Fazer backup'>
                                                <JsonToExcel
                                                    colors='bg-zinc-900'
                                                    title={
                                                        <p className='text-base font-normal '>
                                                            Backup
                                                        </p>
                                                    }
                                                    data={transactions}
                                                    fileName={`Transações-${date}`}
                                                    btnClassName='btn-dowload'
                                                />
                                            </abbr>
                                        </div>
                                    </div>
                                </div>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />
                                    <p className='font-normal text-zinc-400'>
                                        Certifique-se de revisar todas as
                                        transações importantes antes de excluir
                                        o histórico.
                                    </p>
                                </div>

                                <div className='grid grid-cols-[8px_1fr]  gap-2'>
                                    <div className='ball' />
                                    <p className='font-normal text-zinc-400'>
                                        Prossiga apenas se tiver certeza de sua
                                        decisão! Clique no botão "Limpar "
                                        abaixo apenas se você compreende as
                                        consequências da exclusão irreversível e
                                        está disposto a perder permanentemente
                                        todo o histórico de pagamentos associado
                                        à sua conta.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-center border-t border-zinc-500 gap-4 p-4'>
                        <Dialog.Close className='btn-secondary bg-red-600'>
                            Cancelar
                        </Dialog.Close>

                        <Dialog.Close
                            onClick={clearTransaction}
                            type='submit'
                            className='btn-secondary bg-transparent border border-zinc-600'
                        >
                            Limpar
                        </Dialog.Close>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default ClearTable;
