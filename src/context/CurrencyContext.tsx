"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import siteConfigData from "@/data/site_config.json";
import { Currency } from "@/types";

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (priceInAed: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("gottqatar_curr_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("gottqatar_curr_change", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "EUR";
  return localStorage.getItem("gottqatar_currency") || "EUR";
}

function getServerSnapshot(): string {
  return "EUR";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currencies: Currency[] = siteConfigData.currencies;
  const currentCode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const currentCurrency = currencies.find((c) => c.code === currentCode) || currencies[0];

  const setCurrency = (code: string) => {
    localStorage.setItem("gottqatar_currency", code);
    window.dispatchEvent(new Event("gottqatar_curr_change"));
  };

  const formatPrice = (priceInEur: number): string => {
    if (currentCurrency.code === "EUR") {
      return `EUR ${priceInEur.toFixed(2)}`;
    }
    const converted = Math.round(priceInEur * currentCurrency.rate);
    if (currentCurrency.code === "USD") {
      return `$${converted.toLocaleString()}`;
    }
    if (currentCurrency.code === "GBP") {
      return `£${converted.toLocaleString()}`;
    }
    return `${currentCurrency.code} ${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currentCurrency, setCurrency, formatPrice, currencies }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
