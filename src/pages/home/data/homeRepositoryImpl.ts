import { HomeRepository } from '../domain/repositories/HomeRepository';
import mock from './mock/home.mock.json';

export const homeRepositoryImpl: HomeRepository = {
  getDashboard() {
    return Promise.resolve(mock);
  },
};
