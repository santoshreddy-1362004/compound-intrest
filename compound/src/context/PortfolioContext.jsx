// src/context/PortfolioContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    suppliedAssets: [],
    borrowedAssets: [],
    totalSupplied: 0,
    totalBorrowed: 0,
    netWorth: 0,
    healthFactor: 0,
    totalEarned: 0,
    totalInterestPaid: 0
  });

  const addSuppliedAsset = (asset) => {
    setPortfolio(prev => {
      const existingIndex = prev.suppliedAssets.findIndex(a => a.symbol === asset.symbol);
      let newSuppliedAssets;
      
      if (existingIndex >= 0) {
        // Update existing asset
        newSuppliedAssets = [...prev.suppliedAssets];
        newSuppliedAssets[existingIndex] = {
          ...newSuppliedAssets[existingIndex],
          amount: newSuppliedAssets[existingIndex].amount + asset.amount,
          value: newSuppliedAssets[existingIndex].value + asset.value
        };
      } else {
        // Add new asset
        newSuppliedAssets = [...prev.suppliedAssets, asset];
      }

      const newTotalSupplied = newSuppliedAssets.reduce((sum, a) => sum + a.value, 0);
      const newNetWorth = newTotalSupplied - prev.totalBorrowed;
      const newHealthFactor = prev.totalBorrowed > 0 ? (newTotalSupplied * 0.75) / prev.totalBorrowed : 999;

      return {
        ...prev,
        suppliedAssets: newSuppliedAssets,
        totalSupplied: newTotalSupplied,
        netWorth: newNetWorth,
        healthFactor: newHealthFactor
      };
    });
  };

  const addBorrowedAsset = (asset) => {
    setPortfolio(prev => {
      const existingIndex = prev.borrowedAssets.findIndex(a => a.symbol === asset.symbol);
      let newBorrowedAssets;
      
      if (existingIndex >= 0) {
        // Update existing asset
        newBorrowedAssets = [...prev.borrowedAssets];
        newBorrowedAssets[existingIndex] = {
          ...newBorrowedAssets[existingIndex],
          amount: newBorrowedAssets[existingIndex].amount + asset.amount,
          value: newBorrowedAssets[existingIndex].value + asset.value
        };
      } else {
        // Add new asset
        newBorrowedAssets = [...prev.borrowedAssets, asset];
      }

      const newTotalBorrowed = newBorrowedAssets.reduce((sum, a) => sum + a.value, 0);
      const newNetWorth = prev.totalSupplied - newTotalBorrowed;
      const newHealthFactor = newTotalBorrowed > 0 ? (prev.totalSupplied * 0.75) / newTotalBorrowed : 999;

      return {
        ...prev,
        borrowedAssets: newBorrowedAssets,
        totalBorrowed: newTotalBorrowed,
        netWorth: newNetWorth,
        healthFactor: newHealthFactor
      };
    });
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      addSuppliedAsset,
      addBorrowedAsset,
      setPortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
