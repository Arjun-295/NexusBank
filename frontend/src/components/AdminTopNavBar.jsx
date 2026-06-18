import React from 'react';

export default function AdminTopNavBar() {
    return (
        <header className="flex justify-between items-center h-[64px] px-lg w-full sticky top-0 z-50 bg-surface border-b border-outline-variant lg:ml-[260px] lg:w-[calc(100%-260px)]">
            <div className="flex items-center gap-md">
                <div className="relative hidden sm:block">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline" data-icon="search">search</span>
                    <input className="pl-xl pr-md py-xs bg-surface-container-low border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64 transition-all" placeholder="Search accounts or ID..." type="text" />
                </div>
            </div>
            <div className="flex items-center gap-lg">
                <div className="flex gap-md text-secondary">
                    <button className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors outline-none" data-icon="notifications">notifications</button>
                    <button className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors outline-none" data-icon="settings">settings</button>
                    <button className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors outline-none" data-icon="help">help</button>
                </div>
                <div className="h-8 w-px bg-outline-variant hidden sm:block"></div>
                <div className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-xs rounded-lg transition-colors">
                    <div className="text-right hidden sm:block">
                        <p className="font-label-md text-label-md text-on-surface">Admin Profile</p>
                        <p className="text-[10px] text-secondary">Senior Overseer</p>
                    </div>
                    <img alt="Administrator profile photo" className="w-8 h-8 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPGBG1OOi__iXZC1yxebI07fNlVZbCMeVbJ0l5jh2vJf2p3EraZ7ZVCkjWOh9T0xFcF9sclJyaAzeBTntQg-nosvcyvauQQgeaBFKy07QszROy0831erAtKOh2KrfBODma7ZbbFR5rn8gBvaR9XhfTr99kKqo6aToDkZG2PDCYpj4L2AWS6ANz3sM9psOUeShacePR0h3RUJJaG8D_mZeUQ12Qk4Pt8SPQGpCNE3SBPM9dsogn1YxUSZ7q1vatK7ZnzO_MhTzmV3wN" />
                </div>
            </div>
        </header>
    );
}
