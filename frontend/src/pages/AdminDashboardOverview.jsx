import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopNavBar from '../components/AdminTopNavBar';

export default function AdminDashboardOverview() {
    return (
        <div className="bg-surface font-body-md text-on-surface min-h-screen">
            {/* SideNavBar */}
            <AdminSidebar />

            {/* TopNavBar */}
            <AdminTopNavBar />

            {/* Main Content */}
            <main className="lg:ml-[260px] p-lg space-y-lg max-w-[1600px]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <h2 className="font-display-sm text-display-sm text-on-surface">System Overview</h2>
                        <p className="font-body-md text-body-md text-secondary">Global metrics and real-time operations status.</p>
                    </div>
                    <div className="flex gap-sm">
                        <button className="flex items-center gap-xs px-md py-sm bg-surface border border-outline-variant rounded-lg font-label-md text-on-surface hover:bg-surface-container-low transition-all outline-none">
                            <span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
                            Last 30 Days
                        </button>
                        <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm outline-none">
                            <span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Top Section: 4 Key Stat Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">
                    {/* Total Users */}
                    <div className="bg-surface p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-default group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-sm">
                            <span className="p-xs bg-primary-container text-on-primary rounded-lg material-symbols-outlined" data-icon="person">person</span>
                            <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed px-xs py-[2px] rounded-full flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[12px]" data-icon="trending_up">trending_up</span>
                                12.5%
                            </span>
                        </div>
                        <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Total Users</p>
                        <h3 className="font-display-sm text-display-sm text-on-surface mt-xs">1.28M</h3>
                    </div>

                    {/* Total Deposits */}
                    <div className="bg-surface p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-default group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-sm">
                            <span className="p-xs bg-secondary-container text-on-secondary-container rounded-lg material-symbols-outlined" data-icon="account_balance">account_balance</span>
                        </div>
                        <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Total Deposits</p>
                        <h3 className="font-display-sm text-display-sm text-on-surface mt-xs">$4.92B</h3>
                        <p className="font-label-sm text-label-sm text-secondary mt-xs">+2.4% from last month</p>
                    </div>

                    {/* Active Transactions */}
                    <div className="bg-surface p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-default group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-sm">
                            <span className="p-xs bg-surface-container-high text-primary rounded-lg material-symbols-outlined" data-icon="sync_alt">sync_alt</span>
                        </div>
                        <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Active Transactions</p>
                        <h3 className="font-display-sm text-display-sm text-on-surface mt-xs">14,208</h3>
                        <p className="font-label-sm text-label-sm text-secondary mt-xs">Real-time processing</p>
                    </div>

                    {/* System Health */}
                    <div className="bg-surface p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-default group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-sm">
                            <span className="p-xs bg-surface-container-low text-[#10B981] rounded-lg material-symbols-outlined" data-icon="check_circle">check_circle</span>
                        </div>
                        <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">System Health</p>
                        <h3 className="font-display-sm text-display-sm text-[#10B981] mt-xs">Optimal</h3>
                        <p className="font-label-sm text-label-sm text-secondary mt-xs">Latency: 24ms</p>
                    </div>
                </section>

                {/* Middle Section: Banking Volume Chart */}
                <section className="bg-surface rounded-xl border border-outline-variant p-lg overflow-hidden">
                    <div className="flex justify-between items-center mb-xl">
                        <h4 className="font-title-lg text-title-lg text-on-surface">Banking Volume</h4>
                        <div className="flex gap-md font-label-md">
                            <div className="flex items-center gap-xs">
                                <span className="w-3 h-3 rounded-full bg-primary"></span> Deposits
                            </div>
                            <div className="flex items-center gap-xs">
                                <span className="w-3 h-3 rounded-full bg-secondary"></span> Withdrawals
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full relative border-l border-b border-outline-variant" style={{backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                        {/* Visual Placeholder for a complex chart */}
                        <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                            {/* Area for blue chart */}
                            <path d="M0 250 Q 100 220, 200 240 T 400 180 T 600 140 T 800 190 T 1000 100 V 300 H 0 Z" fill="rgba(0, 75, 202, 0.05)"></path>
                            <path d="M0 250 Q 100 220, 200 240 T 400 180 T 600 140 T 800 190 T 1000 100" fill="none" stroke="#004BCA" strokeWidth="3"></path>
                            {/* Secondary comparison line */}
                            <path d="M0 280 Q 150 260, 300 270 T 500 240 T 700 255 T 900 220 T 1000 210" fill="none" opacity="0.5" stroke="#505F76" strokeDasharray="8 4" strokeWidth="2"></path>
                            {/* Data Points */}
                            <circle cx="20%" cy="80%" fill="white" r="4" stroke="#004BCA" strokeWidth="2"></circle>
                            <circle cx="60%" cy="46%" fill="white" r="4" stroke="#004BCA" strokeWidth="2"></circle>
                            <circle cx="100%" cy="33%" fill="white" r="4" stroke="#004BCA" strokeWidth="2"></circle>
                        </svg>
                        {/* Chart Labels */}
                        <div className="absolute left-0 bottom-[-24px] w-full flex justify-between font-label-sm text-secondary">
                            <span>Oct 01</span>
                            <span>Oct 08</span>
                            <span>Oct 15</span>
                            <span>Oct 22</span>
                            <span>Oct 30</span>
                        </div>
                    </div>
                </section>

                {/* Bottom Section: Two Columns */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                    {/* Left Column: Flagged Transactions Table */}
                    <div className="lg:col-span-2 bg-surface rounded-xl border border-outline-variant flex flex-col overflow-hidden">
                        <div className="p-md border-b border-outline-variant flex justify-between items-center">
                            <h4 className="font-title-md text-title-md text-on-surface flex items-center gap-sm">
                                <span className="material-symbols-outlined text-error" data-icon="report">report</span>
                                Flagged Transactions
                            </h4>
                            <span className="font-label-sm text-label-sm px-sm py-xs bg-error-container text-on-error-container rounded-lg">12 High Priority</span>
                        </div>
                        <div className="overflow-x-auto flex-grow">
                            <table className="w-full text-left">
                                <thead className="bg-surface-container-low">
                                    <tr>
                                        <th className="px-md py-sm font-label-sm text-label-sm text-secondary uppercase tracking-widest whitespace-nowrap">ID</th>
                                        <th className="px-md py-sm font-label-sm text-label-sm text-secondary uppercase tracking-widest whitespace-nowrap">User</th>
                                        <th className="px-md py-sm font-label-sm text-label-sm text-secondary uppercase tracking-widest whitespace-nowrap">Amount</th>
                                        <th className="px-md py-sm font-label-sm text-label-sm text-secondary uppercase tracking-widest whitespace-nowrap">Reason</th>
                                        <th className="px-md py-sm font-label-sm text-label-sm text-secondary uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                    <tr className="hover:bg-surface-container-low transition-colors group">
                                        <td className="px-md py-md font-data-mono text-data-mono text-primary whitespace-nowrap">#TXN-90210</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <div className="flex items-center gap-sm">
                                                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-[10px]">JD</div>
                                                <div>
                                                    <p className="font-label-md text-label-md text-on-surface">Julianne Devis</p>
                                                    <p className="text-[10px] text-secondary">Premium Tier</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-md py-md font-label-md text-label-md text-on-surface whitespace-nowrap">$52,400.00</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <span className="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-lg text-[10px] font-bold">Large Transfer</span>
                                        </td>
                                        <td className="px-md py-md text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="px-sm py-xs bg-primary text-on-primary rounded text-[11px] font-semibold outline-none">Review</button>
                                                <button className="px-sm py-xs border border-outline-variant rounded text-[11px] font-semibold hover:bg-surface-container outline-none">Hold</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low transition-colors group">
                                        <td className="px-md py-md font-data-mono text-data-mono text-primary whitespace-nowrap">#TXN-88421</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <div className="flex items-center gap-sm">
                                                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-[10px]">ML</div>
                                                <div>
                                                    <p className="font-label-md text-label-md text-on-surface">Marcus Loxley</p>
                                                    <p className="text-[10px] text-secondary">New Account</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-md py-md font-label-md text-label-md text-on-surface whitespace-nowrap">$8,200.00</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <span className="px-sm py-xs bg-surface-container-highest text-secondary rounded-lg text-[10px] font-bold">Velocity Alert</span>
                                        </td>
                                        <td className="px-md py-md text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="px-sm py-xs bg-primary text-on-primary rounded text-[11px] font-semibold outline-none">Review</button>
                                                <button className="px-sm py-xs border border-outline-variant rounded text-[11px] font-semibold hover:bg-surface-container outline-none">Hold</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low transition-colors group">
                                        <td className="px-md py-md font-data-mono text-data-mono text-primary whitespace-nowrap">#TXN-77219</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <div className="flex items-center gap-sm">
                                                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-[10px]">AK</div>
                                                <div>
                                                    <p className="font-label-md text-label-md text-on-surface">Amara Kalu</p>
                                                    <p className="text-[10px] text-secondary">Standard Tier</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-md py-md font-label-md text-label-md text-on-surface whitespace-nowrap">$12,000.00</td>
                                        <td className="px-md py-md whitespace-nowrap">
                                            <span className="px-sm py-xs bg-error-container text-on-error-container rounded-lg text-[10px] font-bold">High Risk Region</span>
                                        </td>
                                        <td className="px-md py-md text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="px-sm py-xs bg-primary text-on-primary rounded text-[11px] font-semibold outline-none">Review</button>
                                                <button className="px-sm py-xs border border-outline-variant rounded text-[11px] font-semibold hover:bg-surface-container outline-none">Hold</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-auto p-md border-t border-outline-variant bg-surface-container-low">
                            <button className="w-full text-center font-label-md text-primary hover:underline outline-none">View All Flagged Transactions (48)</button>
                        </div>
                    </div>

                    {/* Right Column: Recent Admin Activity Log */}
                    <div className="bg-surface rounded-xl border border-outline-variant flex flex-col">
                        <div className="p-md border-b border-outline-variant">
                            <h4 className="font-title-md text-title-md text-on-surface">Recent Admin Activity</h4>
                        </div>
                        <div className="p-md space-y-md flex-grow">
                            {/* Activity Item 1 */}
                            <div className="flex gap-md">
                                <div className="mt-xs">
                                    <span className="material-symbols-outlined text-primary text-[20px]" data-icon="edit_calendar">edit_calendar</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md text-on-surface">System parameters updated</p>
                                    <p className="font-body-md text-body-md text-secondary text-[12px]">Alex Rivera changed withdrawal limits for 'Tier 2' users.</p>
                                    <span className="font-label-sm text-label-sm text-secondary opacity-60">2 minutes ago</span>
                                </div>
                            </div>
                            
                            {/* Activity Item 2 */}
                            <div className="flex gap-md">
                                <div className="mt-xs">
                                    <span className="material-symbols-outlined text-[#10B981] text-[20px]" data-icon="verified">verified</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md text-on-surface">Identity Verified</p>
                                    <p className="font-body-md text-body-md text-secondary text-[12px]">Verification approved for account <span className="font-data-mono">#ACC-4022</span>.</p>
                                    <span className="font-label-sm text-label-sm text-secondary opacity-60">1 hour ago</span>
                                </div>
                            </div>
                            
                            {/* Activity Item 3 */}
                            <div className="flex gap-md">
                                <div className="mt-xs">
                                    <span className="material-symbols-outlined text-tertiary text-[20px]" data-icon="lock">lock</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md text-on-surface">Account Frozen</p>
                                    <p className="font-body-md text-body-md text-secondary text-[12px]">Sarah Chen suspended access for <span className="font-data-mono">#ACC-9912</span> due to suspicious activity.</p>
                                    <span className="font-label-sm text-label-sm text-secondary opacity-60">3 hours ago</span>
                                </div>
                            </div>
                            
                            {/* Activity Item 4 */}
                            <div className="flex gap-md">
                                <div className="mt-xs">
                                    <span className="material-symbols-outlined text-primary text-[20px]" data-icon="key">key</span>
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md text-on-surface">Auth Protocol Updated</p>
                                    <p className="font-body-md text-body-md text-secondary text-[12px]">Root admin enabled mandatory WebAuthn for all staff logins.</p>
                                    <span className="font-label-sm text-label-sm text-secondary opacity-60">Yesterday</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto p-md bg-surface-container-low border-t border-outline-variant">
                            <button className="w-full text-center font-label-md text-secondary hover:text-on-surface transition-colors outline-none">View Audit Logs</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
