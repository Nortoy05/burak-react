import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie/cjs/Cookies";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";


const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cookies = new Cookies();
    if (!cookies.get("accessToken")) {
        localStorage.removeItem("memberData");
        localStorage.removeItem("authMember");
    }

    const [authMember, setAuthMember] = useState<Member | null>(() => {
        const storedMember = localStorage.getItem("memberData") ?? localStorage.getItem("authMember");
        if (!storedMember) return null;

        try {
            const member = JSON.parse(storedMember) as Member;
            // Keep older sessions compatible while using memberData as the canonical key.
            localStorage.setItem("memberData", JSON.stringify(member));
            return member;
        } catch {
            localStorage.removeItem("memberData");
            localStorage.removeItem("authMember");
            return null;
        }
    });
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    console.log("===verify===");

    return (
        <GlobalContext.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextProvider;

