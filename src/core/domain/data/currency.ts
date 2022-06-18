import Dictionary from '../../../_shared/domain/dictionary';

export interface Currency {
  name: string;
  symbol: string;
}

export const CURRENCIES: Dictionary<Currency> = {
  BRL: {
    name: 'BRL',
    symbol: 'R$',
  },
  DOLLAR: {
    name: 'DOLLAR',
    symbol: '$',
  },
};

export default Currency;
