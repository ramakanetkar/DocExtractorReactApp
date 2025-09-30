import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type definitions
interface User {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

interface SignupResponse {
  success: boolean;
  user?: User;
  error?: string;
}

interface SignupData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (userData: SignupData) => Promise<SignupResponse>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData: User = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      // In real app, you'd verify the password hash
      // For now, we'll just simulate successful login (password unused in mock)
      console.log('Login attempt with password:', password.length > 0 ? 'provided' : 'empty');
      
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (userData: SignupData): Promise<SignupResponse> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some(u => u.email === userData.email);
      
      if (emailExists) {
        throw new Error('An account with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`,
        createdAt: new Date().toISOString()
      };
      
      // Store user
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export type { User, LoginResponse, SignupResponse, SignupData, AuthContextType };