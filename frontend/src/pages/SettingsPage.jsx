import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavBar from "../components/TopNavBar";
import { accountService } from "../services/accountService";

export default function SettingsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Account State
  const [newAccountType, setNewAccountType] = useState("savings");
  const [newPin, setNewPin] = useState("");
  const [createMsg, setCreateMsg] = useState(null);

  // Change PIN State
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [changePinNew, setChangePinNew] = useState("");
  const [changeMsg, setChangeMsg] = useState(null);

  const fetchAccounts = async () => {
    try {
      const res = await accountService.account_details();
      setAccounts(res.data.accounts || []);
      if (res.data.accounts && res.data.accounts.length > 0 && !selectedAccountId) {
        setSelectedAccountId(res.data.accounts[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setCreateMsg(null);
    if (!newPin || newPin.length < 4) {
      setCreateMsg({ type: "error", text: "PIN must be at least 4 characters" });
      return;
    }
    try {
      await accountService.createAccount(newAccountType, newPin);
      setCreateMsg({ type: "success", text: "Account created successfully!" });
      setNewPin("");
      fetchAccounts();
    } catch (err) {
      setCreateMsg({ type: "error", text: err.response?.data?.detail || "Failed to create account" });
    }
  };

  const handleChangePin = async (e) => {
    e.preventDefault();
    setChangeMsg(null);
    if (!oldPin || !changePinNew) {
      setChangeMsg({ type: "error", text: "Please provide both old and new PIN" });
      return;
    }
    try {
      await accountService.changePin(selectedAccountId, oldPin, changePinNew);
      setChangeMsg({ type: "success", text: "PIN updated successfully!" });
      setOldPin("");
      setChangePinNew("");
    } catch (err) {
      setChangeMsg({ type: "error", text: err.response?.data?.detail || "Failed to change PIN" });
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <TopNavBar title="Settings" subtitle="Manage your accounts and security preferences." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-8">
          {/* Create Account Section */}
          <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/20 shadow-sm">
            <h3 className="font-headline-md text-headline-md mb-6">Create New Account</h3>
            <form onSubmit={handleCreateAccount} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Account Type</label>
                <select 
                  className="bg-surface-container-low border-0 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  value={newAccountType}
                  onChange={(e) => setNewAccountType(e.target.value)}
                >
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Set 4-Digit PIN</label>
                <input 
                  type="password" 
                  maxLength="4"
                  className="bg-surface-container-low border-0 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="****"
                />
              </div>
              <button type="submit" className="mt-2 bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-primary/90 transition-all">
                Create Account
              </button>
              {createMsg && (
                <div className={`mt-2 p-3 rounded ${createMsg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {createMsg.text}
                </div>
              )}
            </form>
          </section>

          {/* Change PIN Section */}
          <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/20 shadow-sm">
            <h3 className="font-headline-md text-headline-md mb-6">Change Account PIN</h3>
            <form onSubmit={handleChangePin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Select Account</label>
                <select 
                  className="bg-surface-container-low border-0 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.account_type.toUpperCase()} - {acc.account_number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Current PIN</label>
                <input 
                  type="password" 
                  maxLength="4"
                  className="bg-surface-container-low border-0 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="****"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant">New 4-Digit PIN</label>
                <input 
                  type="password" 
                  maxLength="4"
                  className="bg-surface-container-low border-0 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  value={changePinNew}
                  onChange={(e) => setChangePinNew(e.target.value)}
                  placeholder="****"
                />
              </div>
              <button type="submit" className="mt-2 bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-primary/90 transition-all">
                Update PIN
              </button>
              {changeMsg && (
                <div className={`mt-2 p-3 rounded ${changeMsg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {changeMsg.text}
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
