export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "text-green-800";
    case "pending":
      return "text-yellow-800";
    case "failed":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
};

export const getTypeIcon = (type) => {
  switch (type) {
    case "deposit":
      return "arrow_downward";
    case "withdrawal":
      return "arrow_upward";
    case "transfer":
      return "compare_arrows";
    default:
      return "receipt";
  }
};
