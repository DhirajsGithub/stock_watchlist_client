import { ReactNode, createContext, useState } from "react";

interface userProps {
    name: string;
    email: string;
    isAuthenticated: boolean;
}
interface authContextValue {
    user: userProps;
    setAuthData: (data: userProps) => void;
}

const initaialValue: userProps = {
    name: "",
    email: "",
    isAuthenticated: false,
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<authContextValue | null>(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
    props
) => {
    const [authData, setAuthData] = useState<userProps>(initaialValue);
    return (
        <AuthContext.Provider value={{ user: authData, setAuthData }}>
            {props.children}
        </AuthContext.Provider>
    );
};
