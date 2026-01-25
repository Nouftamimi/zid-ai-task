import { HomeRepository } from '../repositories/HomeRepository';

export const getHomeDashboard =
  (repo: HomeRepository) => async () => {
    return await repo.getDashboard();
  };
