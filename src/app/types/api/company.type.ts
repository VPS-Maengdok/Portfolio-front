import { Country } from './country.type';

export type Company = {
  id: number;
  label: string;
  url: string | null;
  city: string;
  country: Country;
};

export type CompanyForm = {
  id?: number;
  label: string;
  url?: string;
  city: string;
  country: number;
};
