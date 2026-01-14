
/**
 * @file sdk/core/index.ts
 */
export { ElmahrosaAuth } from './auth';

export const wallet = {
  getWallet: () => ({
    getBalance: async () => 1234.56,
    getAddress: () => 'teos1...address'
  })
};

export const governance = {
  createPetition: async (title: string) => ({ id: 'pet_1', status: 'active' }),
  vote: async (id: string, option: string) => ({ success: true })
};
