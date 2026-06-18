import React from 'react';

export default function TopNavBar({ title, subtitle }) {
    return (
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md px-margin-desktop h-20 flex justify-between items-center max-w-container-max mx-auto border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
                <span className="lg:hidden material-symbols-outlined text-primary cursor-pointer" data-icon="menu">menu</span>
                <div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary">{title || "Dashboard"}</h2>
                    {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant hidden md:block">{subtitle}</p>}
                </div>
            </div>
            
            <div className="flex items-center gap-md">
                <div className="hidden md:flex relative items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline" data-icon="search">search</span>
                    <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 w-64 text-body-sm outline-none" placeholder="Search transactions..." type="text" />
                </div>
                <button className="relative p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors outline-none">
                    <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
                    <div className="text-right hidden sm:block">
                        <p className="font-label-lg text-label-lg text-on-surface leading-tight">Alexander Wright</p>
                        <p className="font-label-md text-label-md text-primary leading-tight">Premium Member</p>
                    </div>
                    <img alt="User profile" className="w-10 h-10 rounded-full border-2 border-primary-container shadow-sm object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGm-z_b2JSN-wLTXloLsWgBm0XZKkxwtpH3Y_kaqIFd-wkNd6eoUI2E7ALB277vpS5WH03jHwH0-1fvX1XCSPMZC_w1YpWscOkOxQVHr4_yicQY9uytjrlfe4uDWkzqCXmiPL_yyibw-re90HaVcX9xBc6OkNUhqWcNaA-JP1ap3pa_PsLu7VIOCGaQOUTt0TD4fe89rq7eah91tu-xpySooJ5DkxKdPQ68RtbtiYy-FhRGukpGKJ1ZLhwo6v7pN48ITOtE_JspA1A" />
                </div>
            </div>
        </header>
    );
}
