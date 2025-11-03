
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'business' | 'superadmin' | 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: 'individual' | 'superadmin') => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('ZCard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: 'individual' | 'superadmin'): boolean => {
    // Check for super admin credentials - ONLY these exact credentials work
    if (role === 'superadmin') {
      if (email === "admin@gmail.com" && password === "PASSWORD") {
        const adminUser: AuthUser = {
          id: 'admin-1',
          email: email,
          name: 'Super Admin',
          role: 'superadmin'
        };
        setUser(adminUser);
        localStorage.setItem('ZCard_user', JSON.stringify(adminUser));
        return true;
      }

      // Check for admin members when trying to login as superadmin
      const adminMembersData = localStorage.getItem('ZCard_admin_members');
      const adminMembers = adminMembersData ? JSON.parse(adminMembersData) : [];
      
      const foundAdmin = adminMembers.find((admin: any) => admin.email === email && admin.password === password);
      if (foundAdmin) {
        const authUser: AuthUser = {
          id: foundAdmin.id,
          email: foundAdmin.email,
          name: foundAdmin.name,
          role: 'admin'
        };
        setUser(authUser);
        localStorage.setItem('ZCard_user', JSON.stringify(authUser));
        return true;
      }
      
      return false; // No other credentials can access super admin
    }

    // Check for existing users in localStorage (individual users only)
    const usersData = localStorage.getItem('ZCard_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: 'individual'
      };
      setUser(authUser);
      localStorage.setItem('ZCard_user', JSON.stringify(authUser));
      return true;
    }

    return false;
  };

  const signup = (email: string, password: string, name: string): boolean => {
    // Check if user already exists
    const usersData = localStorage.getItem('ZCard_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    // Create new user with password for authentication and sync with UserContext format
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password, // Keep password for authentication
      name,
      plan: 'Free',
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('ZCard_users', JSON.stringify(users));

    // Trigger UserContext to reload users
    window.dispatchEvent(new Event('userDataChanged'));

    // Auto login the new user
    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: 'individual'
    };
    setUser(authUser);
    localStorage.setItem('ZCard_user', JSON.stringify(authUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ZCard_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
