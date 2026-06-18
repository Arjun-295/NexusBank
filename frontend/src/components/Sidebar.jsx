import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();

    const getLinkClass = (path) => {
        if (location.pathname === path || (path === '/dashboard' && location.pathname === '/')) {
            return "bg-primary-container text-on-primary-container font-bold rounded-lg px-4 py-3 mx-2 flex items-center gap-3 transition-all scale-[0.98]";
        }
        return "text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 mx-2 flex items-center gap-3 transition-colors";
    };

    return (
        <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-low w-64 z-40">
            <div className="px-6 py-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
                    </div>
                    <div>
                        <h1 className="font-headline-md text-headline-md font-extrabold text-primary">Nexus Bank</h1>
                        <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Secure Banking</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto">
                <Link className={getLinkClass('/dashboard')} to="/dashboard">
                    <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    <span className="font-label-lg text-label-lg">Dashboard</span>
                </Link>
                <Link className={getLinkClass('/deposit')} to="/deposit">
                    <span className="material-symbols-outlined" data-icon="payments">payments</span>
                    <span className="font-label-lg text-label-lg">Deposit</span>
                </Link>
                <Link className={getLinkClass('/withdraw')} to="/withdraw">
                    <span className="material-symbols-outlined" data-icon="account_balance_wallet" style={{fontVariationSettings: location.pathname === '/withdraw' ? "'FILL' 1" : ""}}>account_balance_wallet</span>
                    <span className="font-label-lg text-label-lg">Withdraw</span>
                </Link>
                <Link className={getLinkClass('/transfer')} to="/transfer">
                    <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
                    <span className="font-label-lg text-label-lg">Transfer</span>
                </Link>
                <Link className={getLinkClass('/transactions')} to="/transactions">
                    <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                    <span className="font-label-lg text-label-lg">Transactions</span>
                </Link>
                <Link className={getLinkClass('/profile')} to="#">
                    <span className="material-symbols-outlined" data-icon="person">person</span>
                    <span className="font-label-lg text-label-lg">Profile</span>
                </Link>
            </nav>
            <div className="px-2 py-6 border-t border-outline-variant/30">
                <Link className="text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 mx-2 flex items-center gap-3 transition-colors" to="#">
                    <span className="material-symbols-outlined" data-icon="help">help</span>
                    <span className="font-label-lg text-label-lg">Support</span>
                </Link>
                <Link className="text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 mx-2 flex items-center gap-3 transition-colors" to="/settings">
                    <span className="material-symbols-outlined" data-icon="settings">settings</span>
                    <span className="font-label-lg text-label-lg">Settings</span>
                </Link>
                <Link to="/login" className="w-full mt-4 flex items-center gap-3 px-6 py-3 text-error font-label-lg hover:bg-error-container/20 transition-colors rounded-lg mx-2 w-[calc(100%-16px)]">
                    <span className="material-symbols-outlined" data-icon="logout">logout</span>
                    Logout
                </Link>
            </div>
        </aside>
    );
}
