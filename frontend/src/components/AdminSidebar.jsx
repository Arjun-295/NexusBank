import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
    const location = useLocation();

    const getLinkClass = (path) => {
        if (location.pathname.startsWith(path)) {
            return "flex items-center gap-md bg-primary-container text-on-primary-container border-l-4 border-primary px-md py-sm cursor-pointer active:scale-95 transition-all outline-none";
        }
        return "flex items-center gap-md text-secondary px-md py-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all cursor-pointer active:scale-95 outline-none";
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col py-lg z-40 bg-surface-container border-r border-outline-variant hidden lg:flex">
            <div className="px-lg mb-xl">
                <h1 className="font-headline-md text-headline-md font-black text-on-surface">Nexus Admin</h1>
                <p className="font-body-md text-body-md text-secondary opacity-70">Management Console</p>
            </div>
            <nav className="flex-grow space-y-xs">
                <Link className={getLinkClass('/admin/dashboard')} to="/admin/dashboard">
                    <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    <span className="font-body-md text-body-md">Dashboard</span>
                </Link>
                <Link className={getLinkClass('/admin/users')} to="#">
                    <span className="material-symbols-outlined" data-icon="group">group</span>
                    <span className="font-body-md text-body-md">User Management</span>
                </Link>
                <Link className={getLinkClass('/admin/transactions')} to="#">
                    <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                    <span className="font-body-md text-body-md">Transaction Monitoring</span>
                </Link>
                <Link className={getLinkClass('/admin/reports')} to="#">
                    <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
                    <span className="font-body-md text-body-md">Reports & Analytics</span>
                </Link>
                <Link className={getLinkClass('/admin/settings')} to="#">
                    <span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
                    <span className="font-body-md text-body-md">System Settings</span>
                </Link>
            </nav>
            <div className="mt-auto border-t border-outline-variant pt-md">
                <Link className="flex items-center gap-md text-secondary px-md py-sm hover:bg-secondary-container transition-all cursor-pointer outline-none" to="#">
                    <span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
                    <span className="font-body-md text-body-md">Security Audit</span>
                </Link>
                <Link className="flex items-center gap-md text-error px-md py-sm hover:bg-error-container transition-all cursor-pointer outline-none" to="/login">
                    <span className="material-symbols-outlined" data-icon="logout">logout</span>
                    <span className="font-body-md text-body-md">Logout</span>
                </Link>
            </div>
        </aside>
    );
}
