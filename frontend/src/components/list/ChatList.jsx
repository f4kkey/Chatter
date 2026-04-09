import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import UserLoader from '../loader/UserLoader'
import NoChatsFound from '../NoChatFound'
import { useAuthStore } from '../../store/useAuthStore'

function ChatList() {
    const { getChatters, chatters, isUsersLoading, setSelectedUser, selectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
    useEffect(() => {
        getChatters()
    }, [getChatters])

    if (isUsersLoading) return <UserLoader />
    if (chatters.length === 0) return <NoChatsFound />

    return (
        <>
            {
                chatters.map(chat => (
                    <div key={chat._id}
                        className={`bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors
                        ${selectedUser?._id === chat._id ? "bg-cyan-500/50" : ""} `}
                        onClick={() => setSelectedUser(chat)}
                    >


                        <div className='flex items-center gap-3'>
                            <div className={`avatar ${onlineUsers.includes(chat._id) ? 'online' : 'offline'}`}>
                                <div className='size-12 rounded-full'>
                                    <img src={chat.profilePicture || '/avatar.png'} alt="chat.fullName" />
                                </div>
                            </div>
                            <p className='text-slate-200 font-medium truncate'>{chat.fullName}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ChatList