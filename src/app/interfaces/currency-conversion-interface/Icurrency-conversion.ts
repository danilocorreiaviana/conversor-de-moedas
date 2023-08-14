export default interface CurrencyConversion {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  historical: boolean;
  date: string;
  result: number;
}