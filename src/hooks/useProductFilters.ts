import { useState, useCallback } from 'react';
import { Product } from '../data/retail/products';

export interface FilterState {
  priceRange?: { min: number; max: number };
  brands: number[];
  categories: number[];
  featured: boolean;
  inStock: boolean;
  searchTerm?: string;
}

export interface SortState {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

export interface UseProductFiltersReturn {
  filters: FilterState;
  sortBy: SortState;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortBy: (sortBy: SortState) => void;
  resetFilters: () => void;
  resetSort: () => void;
  clearAll: () => void;
}

const defaultFilters: FilterState = {
  brands: [],
  categories: [],
  featured: false,
  inStock: false,
};

const defaultSort: SortState = {
  field: 'name',
  direction: 'asc',
};

export const useProductFilters = (): UseProductFiltersReturn => {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortByState] = useState<SortState>(defaultSort);

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const setSortBy = useCallback((newSortBy: SortState) => {
    setSortByState(newSortBy);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const resetSort = useCallback(() => {
    setSortByState(defaultSort);
  }, []);

  const clearAll = useCallback(() => {
    setFiltersState(defaultFilters);
    setSortByState(defaultSort);
  }, []);

  return {
    filters,
    sortBy,
    setFilters,
    setSortBy,
    resetFilters,
    resetSort,
    clearAll,
  };
}; 