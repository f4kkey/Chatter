import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import UserLoader from '../loader/UserLoader'
import NoChatsFound from '../NoChatFound'

function ChatList() {
    const { getChatters, chatters, isUsersLoading, setSelectedUser } = useChatStore()
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
                        className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
                        onClick={() => setSelectedUser(chat)}
                    >
                        <div className='flex items-center gap-3'>
                            <div className='avatar online'>
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