import api from "../api";

export const accountService = {
  account_details: async () => {
    const response = await api.get("/api/account/account_details");
    return response;
  },
  get_transactions: async (limit = 50, offset = 0, filters = {}) => {
    const response = await api.get("/api/transactions/get_transactions", {
      params: { limit, offset, ...filters },
    });
    return response;
  },
  deposit: async (amount, account_id) => {
    const response = await api.post("/api/account/deposit", {
      amount,
      account_id,
    });
    return response;
  },
  withdraw: async (amount, account_id) => {
    const response = await api.post("/api/account/withdraw", {
      amount,
      account_id,
    });
    return response;
  },
  recent_withdraws: async (limit = 3) => {
    const response = await api.get("/api/transactions/recent_withdraws", {
      params: { limit },
    });
    return response.data;
  },
  transfer: async (source_account_id, destination_account_number, amount) => {
    const response = await api.post("/api/transactions/transfer", {
      source_account_id,
      destination_account_number,
      amount,
    });
    return response;
  },
  createAccount: async (account_type, pin) => {
    const response = await api.post("/api/account/create", {
      account_type,
      pin,
    });
    return response;
  },
  changePin: async (account_id, old_pin, new_pin) => {
    const response = await api.post("/api/account/change_pin", {
      account_id,
      old_pin,
      new_pin,
    });
    return response;
  },
};
