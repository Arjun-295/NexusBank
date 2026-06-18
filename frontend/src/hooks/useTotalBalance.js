import { useState, useEffect, useCallback } from "react";
import { accountService } from "../services/accountService.js";

export function useTotalBalance() {
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await accountService.account_details();

      const account = res?.data?.accounts?.[0];

      if (!account) {
        throw new Error("No account found");
      }

      setBalance(account.balance ?? 0);
      setAccountNumber(account.account_number);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    accountNumber,
    loading,
    error,
    refresh: fetchBalance,
  };
}
