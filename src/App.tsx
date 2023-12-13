import Dashboard from './components/Dashboard';
import Header from './components/Header';
import TransactionTable from './components/TransactionTable';
import './index.css';

function App() {
    return (
        <div className='min-h-screen w-full max-w-[1200px] mx-auto px-4'>
            <Header />
            <Dashboard />
            <TransactionTable />
        </div>
    );
}

export default App;
