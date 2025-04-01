import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
    id: string;
    email: string;
    name: string;
} | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    const login = async (email: string, password: string) => {
        // Mock implementation
        const mockUser = {
            id: '1',
            email,
            name: 'Test User'
        };
        setUser(mockUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
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