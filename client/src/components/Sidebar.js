import React, { useContext, useRef } from 'react';
import { SidebarComp, SidebarItem } from './SidebarComp';
import { Avatar } from "@nextui-org/react";
import SessionContext from '../context/sessions/SessionContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from "@nextui-org/react";

const Sidebar = () => {
    const iconSize = 25;
    const { sData, totalPages, fetchMoreData, page } = useContext(SessionContext);

    const avatarUrls = [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c"
    ];

    // Store a reference for session avatars to persist across renders
    const avatarMapRef = useRef({});

    // Assign random avatars to sessions (persisting across renders)
    const getAvatarForSession = (sessionId) => {
        if (!avatarMapRef.current[sessionId]) {
            const randomIndex = Math.floor(Math.random() * avatarUrls.length);
            avatarMapRef.current[sessionId] = avatarUrls[randomIndex];
        }
        return avatarMapRef.current[sessionId];
    };

    // Sort sessions by the timestamp of their last message (newest first)
    const sortedSessions = [...sData].sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1].timestamp;
        const lastMessageB = b.messages[b.messages.length - 1].timestamp;
        return new Date(lastMessageB) - new Date(lastMessageA); // Sort descending
    });

    return (
        <SidebarComp>
            <InfiniteScroll
                dataLength={sData.length}
                next={fetchMoreData}
                hasMore={page < totalPages}
                loader={<div className='flex justify-center my-3'><Spinner /></div>}
                scrollableTarget="sidebar-scroll"
                style={{ overflow: 'hidden' }}
            >
                {sortedSessions.map(session => {
                    const lastMessage = session.messages[session.messages.length - 1];
                    const avatar = getAvatarForSession(session.id); // Get or assign avatar
                    return (
                        <SidebarItem
                            key={session.id}
                            icon={<Avatar src={avatar} size={iconSize} />}
                            text={`Session ${session.id}`}
                            timestamp={new Date(lastMessage.timestamp).toLocaleString()}
                            ids={session.id}
                        />
                    );
                })}
            </InfiniteScroll>
        </SidebarComp>
    );
}

export default Sidebar;
