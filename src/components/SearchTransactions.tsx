import { Calendar, CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import DateFilter from './Popups/DateFilter';

interface SearchTransactionsProps {
    searchValue: string;
    setSearchValue: (v: string) => void;
    selectTypeFilter: string;
    setSelectTypeFilter: (v: string) => void;
}

const SearchTransactions = ({
    searchValue,
    setSearchValue,
    selectTypeFilter,
    setSelectTypeFilter,
}: SearchTransactionsProps) => {
    const clearSearchInput = () => {
        setSearchValue('');
    };

    return (
        <div className='flex items-center gap-4  mt-16 mb-8'>
            <div className='flex  items-center gap-2 bg-zinc-900 h-10 rounded  px-2 flex-1'>
                <MagnifyingGlass size={20} className='text-zinc-300' />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type='text'
                    className=' w-full bg-transparent placeholder:text-zinc-600 border-none shadow appearance-none  rounded   text-zinc-100 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Pesquiso por Título, Preço, Categoria ....'
                />

                <button
                    className={`${
                        searchValue.length > 3
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                    } transition-opacity`}
                    onClick={clearSearchInput}
                >
                    <X className={'text-zinc-200 '} size={20} />
                </button>
            </div>

            <div className='relative flex items-center justify-between w-full max-w-[200px]   h-10 rounded overflow-hidden  bg-zinc-900'>
                <select
                    value={selectTypeFilter}
                    onChange={(e) => setSelectTypeFilter(e.target.value)}
                    id='types'
                    className='border-none cursor-pointer shadow appearance-none w-full h-full pl-2 bg-zinc-900 text-zinc-100 leading-tight focus:outline-none focus:shadow-outline '
                >
                    <option className='hover:bg-zinc-600' value='all'>
                        Todos
                    </option>
                    <option className='hover:bg-zinc-600' value='deposit'>
                        Depósito
                    </option>
                    <option className='hover:bg-zinc-600' value='withdraw'>
                        Saída
                    </option>
                </select>

                <CaretDown
                    size={18}
                    className='text-zinc-300 z-10 absolute pointer-events-none right-2'
                />
            </div>

            <Dialog.Root>
                <Dialog.Trigger
                    asChild
                    className=' cursor-pointer w-full max-w-[200px] h-10 rounded overflow-hidden  bg-zinc-900 px-2 '
                >
                    <div className='flex items-center justify-between'>
                        <p>Selecionar Data</p>
                        <Calendar size={20} className='text-zinc-200' />
                    </div>
                </Dialog.Trigger>

                <DateFilter />
            </Dialog.Root>
        </div>
    );
};

export default SearchTransactions;
