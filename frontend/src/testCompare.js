import { useState, useEffect, useCallback } from "react";
import { accountService } from "../services/accountService.js";

export function useTransactions(initialLimit = 5, initialOffset = 0) {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(
    async (l = limit, o = offset) => {
      setLoading(true);
      setError(null);
      try {
        const res = await accountService.get_transactions(l, o);
        setTransactions(res?.data?.transactions ?? []);
      } catch (err) {
        setError(err);
        console.error("useTransactions fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [limit, offset],
  );

  useEffect(() => {
    fetchTransactions(limit, offset);
  }, [fetchTransactions, limit, offset]);

  const refresh = useCallback(
    () => fetchTransactions(limit, 0),
    [fetchTransactions, limit],
  );
  const loadMore = useCallback(async () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    await fetchTransactions(limit, newOffset);
  }, [fetchTransactions, limit, offset]);

  return {
    transactions,
    loading,
    error,
    refresh,
    loadMore,
    setLimit,
    setOffset,
  };
}
