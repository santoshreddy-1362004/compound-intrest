// src/utils/compound.js
import { networks } from '@compound-finance/compound-js';

const compound = networks['mainnet'];

export async function getSupplyRate(asset) {
  const cTokenAddress = compound.COMP[asset].cToken;
  return await compound.util.getSupplyRate(cTokenAddress);
}

export async function getBorrowRate(asset) {
  const cTokenAddress = compound.COMP[asset].cToken;
  return await compound.util.getBorrowRate(cTokenAddress);
}