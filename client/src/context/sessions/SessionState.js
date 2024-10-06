import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';

const SessionState = (props) => {
    const [sData, setSData] = useState([]); // Should start as an empty array, not object
    const [chats, setChats] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const[currentSession, setCurrentSession] = useState({});

    // Fetch the initial data
    const fetchData = async () => {

        try {
            const response = await fetch(`https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=1&per_page=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();

            setTotalPages(result.pages);
            setSData(result.chat_sessions);
        } catch (error) {
            console.error("Error:", error);
            props.notify();
        }
    };

    // Fetch more data when user scrolls down
    const fetchMoreData = async () => {
        try {

            setTimeout(async () => {
                const nextPage = page + 1;
                const response = await fetch(`https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=${nextPage}&per_page=10`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                const result = await response.json();
    
                // Append the new sessions and ids
                setSData(prevData => prevData.concat(result.chat_sessions));
                setPage(nextPage); // Increment the page number

              }, 2000);
        } catch (error) {
            console.error("Error:", error);
            props.notify();
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const findChat = (sessionId, icon) => {
        if (sData.length) {
            const currentChats = sData.find(session => session.id === sessionId);
            setChats(currentChats);
            setCurrentSession({icon: icon, sessionId: sessionId});
        }
    };

    return (
        <SessionContext.Provider value={{ findChat, chats, sData, fetchMoreData, totalPages, page, currentSession, setCurrentSession }}>
            {props.children}
        </SessionContext.Provider>
    );
}

export default SessionState;
