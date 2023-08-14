export default interface HistoryInterface {
  date: string;
  time: string;
  input: number;
  output: number;
  originCurrency: string;
  destinyCurrency: string;
  rate: number;
  highValue: boolean;
}