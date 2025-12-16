import { Country } from './country.type';

export type School = {
  id: number;
  label: string;
  url: string;
  city: string;
  country: Country;
};

export type SchoolForm = {
  id?: number;
  label: string;
  url: string;
  city: string;
  country: number;
};
