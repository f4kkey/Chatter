import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { useAuthStore } from '../../store/useAuthStore'
import ChatHeader from './ChatHeader'

function ChatContainer() {
    const { selectedUser, isMessagesLoading, messages, getMessages } = useChatStore()
    const { authUser } = useAuthStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [getMessages, selectedUser])

    return (
        <>
            <ChatHeader />

        </>
    )
}

export default ChatContainer