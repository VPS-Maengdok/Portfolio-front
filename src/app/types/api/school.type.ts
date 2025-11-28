import { Country } from './country.type';

export type School = {
  id: number;
  url: string;
  city: string;
  country: Country;
};

export type SchoolForm = {
  id?: number;
  url: string;
  city: string;
  country: number;
};
