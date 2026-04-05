import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import UserLoadingSkeleton from '../loader/UserLoader'

function ContactList() {
    const { getAllContacts, setSelectedUser, isUsersLoading, allContacts } = useChatStore()
    useEffect(() => {
        getAllContacts()
    }, [getAllContacts])

    if (isUsersLoading) return <UserLoadingSkeleton />

    return (
        <div>
            {
                allContacts.map(chat => (
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
        </div>
    )
}

export default ContactList