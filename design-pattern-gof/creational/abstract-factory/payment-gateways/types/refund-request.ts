export type RefundRequest = {
  transactionId: string;
  amount: number;
  reason: string;
};
