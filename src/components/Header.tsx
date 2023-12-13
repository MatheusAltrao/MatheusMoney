import Logo from '../assets/logoGradientCyan.png';
import * as Dialog from '@radix-ui/react-dialog';
import NewTransaction from './Popups/NewTransaction';

const Header = () => {
    return (
        <header className='pt-10 pb-4 border-b border-zinc-700 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <img className='w-10' src={Logo} alt='M' />
                <h1 className='text-xl font-semibold'>Matheus Money</h1>
            </div>

            <Dialog.Root>
                <Dialog.Trigger>
                    <div className='btn-primary cursor-pointer'>
                        {' '}
                        Nova Transação
                    </div>
                </Dialog.Trigger>
                <NewTransaction />
            </Dialog.Root>
        </header>
    );
};

export default Header;
