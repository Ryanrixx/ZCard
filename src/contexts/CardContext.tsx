
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Card {
  id: string;
  userId: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  views: number;
  shares: number;
  createdAt: Date;
}

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'userId' | 'views' | 'shares' | 'createdAt'>) => void;
  updateCard: (id: string, card: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  getCard: (id: string) => Card | undefined;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const { user } = useAuth();

  // Load cards from localStorage on mount
  useEffect(() => {
    const savedCards = localStorage.getItem('ZCard_cards');
    if (savedCards) {
      setAllCards(JSON.parse(savedCards));
    }
  }, []);

  // Save cards to localStorage whenever allCards changes
  useEffect(() => {
    localStorage.setItem('ZCard_cards', JSON.stringify(allCards));
  }, [allCards]);

  // Filter cards for current user
  const cards = user ? allCards.filter(card => card.userId === user.id) : [];

  const addCard = (cardData: Omit<Card, 'id' | 'userId' | 'views' | 'shares' | 'createdAt'>) => {
    if (!user) return;
    
    const newCard: Card = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      views: 0,
      shares: 0,
      createdAt: new Date()
    };
    setAllCards(prev => [...prev, newCard]);
  };

  const updateCard = (id: string, updatedData: Partial<Card>) => {
    setAllCards(prev => prev.map(card => 
      card.id === id ? { ...card, ...updatedData } : card
    ));
  };

  const deleteCard = (id: string) => {
    setAllCards(prev => prev.filter(card => card.id !== id));
  };

  const getCard = (id: string) => {
    return allCards.find(card => card.id === id);
  };

  return (
    <CardContext.Provider value={{ cards, addCard, updateCard, deleteCard, getCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
