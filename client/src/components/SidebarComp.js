import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import SessionContext from '../context/sessions/SessionContext';



// Sidebar context to manage expanded/collapsed state
const SidebarContext = createContext();

export function SidebarComp({ children }) {
    const [expanded, setExpanded] = useState(true);
    
    // Collapse the sidebar on medium screens automatically
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setExpanded(true); // Expanded on larger screens
            } else {
                setExpanded(false); // Collapsed on smaller screens
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Call on mount to set the initial state
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <aside id="sidebar-scroll" className={`h-full flex flex-col bg-white border-r shadow-sm transition-all duration-300 ${expanded ? "w-64" : "w-20"} overflow-y-auto`}>

            <nav className="h-full flex flex-col">

                <div className="p-4 pb-2 flex justify-end">
                    <button
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        onClick={() => setExpanded(!expanded)} // Toggle expanded state
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <hr className="my-3" />

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, ids, timestamp }) {
    const { expanded } = useContext(SidebarContext);
    const { findChat } = useContext(SessionContext);

    return (
        <>
            <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                    }`}
                onClick={() => { findChat(ids, icon) }} >
                <div>
                    {icon}
                </div>
                <div className={`text-gray-500 overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {text}
                </div>

                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </li>
            {expanded && (
                <small className=" flex justify-end text-gray-400" style={{ fontSize: '12px' }}>
                    {timestamp}
                </small>
            )}
            <hr className="my-3" />
        </>
    );
}
