"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CanvassItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  imageUrl?: string;
  quantity: number;
}

interface CanvassState {
  items: CanvassItem[];
}

type CanvassAction =
  | { type: 'ADD_ITEM'; payload: Omit<CanvassItem, 'quantity'> & { quantity?: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

const initialState: CanvassState = {
  items: [],
};

function canvassReducer(state: CanvassState, action: CanvassAction): CanvassState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    
    default:
      return state;
  }
}

interface CanvassContextType {
  state: CanvassState;
  addItem: (item: Omit<CanvassItem, 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalQuantity: () => number;
}

const CanvassContext = createContext<CanvassContextType | undefined>(undefined);

export function CanvassProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(canvassReducer, initialState);

  const addItem = (item: Omit<CanvassItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.length;
  };

  const getTotalQuantity = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CanvassContext.Provider
      value={{
        state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalItems,
        getTotalQuantity,
      }}
    >
      {children}
    </CanvassContext.Provider>
  );
}

export function useCanvass() {
  const context = useContext(CanvassContext);
  if (context === undefined) {
    throw new Error('useCanvass must be used within a CanvassProvider');
  }
  return context;
}
