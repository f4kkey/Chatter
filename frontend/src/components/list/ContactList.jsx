import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import UserLoader from '../loader/UserLoader'
import { useAuthStore } from '../../store/useAuthStore'

function ContactList() {
    const { getAllContacts, setSelectedUser, isUsersLoading, allContacts, selectedUser, unreadUsers } = useChatStore()
    const { onlineUsers } = useAuthStore()
    useEffect(() => {
        getAllContacts()
    }, [getAllContacts])

    if (isUsersLoading) return <UserLoader />

    return (
        <>
            {
                allContacts.map(chat => (
                    <div key={chat._id}
                        className={`bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors relative
                        ${selectedUser?._id === chat._id ? "bg-cyan-500/50" : ""} `}
                        onClick={() => setSelectedUser(chat)}
                    >
                        <div className='flex items-center gap-3'>
                            <div className={`avatar ${onlineUsers.includes(chat._id) ? 'online' : 'offline'}`}>
                                <div className='size-12 rounded-full'>
                                    <img src={chat.profilePicture || '/avatar.png'} alt="chat.fullName" />
                                </div>
                            </div>
                            <p className='text-slate-200 font-medium truncate flex-1'>{chat.fullName}</p>
                            {unreadUsers?.includes(chat._id) && (
                                <div className='w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(239,68,68,0.8)]'></div>
                            )}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ContactList