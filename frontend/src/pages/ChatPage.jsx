import React from 'react'
import { useChatStore } from '../store/useChatStore'
import BorderAnimateContainer from '../components/BorderAnimateContainer'
import ProfileHeader from '../components/ProfileHeader'
import TabSwitch from '../components/TabSwitch'
import ChatContainer from '../components/chatContainer/ChatContainer'
import ChatPlaceholder from '../components/ChatPlaceholder'
import ChatList from '../components/list/ChatList'
import ContactList from '../components/list/ContactList'

function ChatPage() {
    const { tab, selectedUser } = useChatStore()
    return (
        <div className='relative w-full max-w-6xl h-[800px]'>
            <BorderAnimateContainer>
                {/*left*/}
                <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
                    <ProfileHeader />
                    <TabSwitch />
                    <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                        {tab === "chats" ? <ChatList /> : <ContactList />}
                    </div>
                </div>

                {/*right*/}
                <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
                    {selectedUser ? <ChatContainer /> : <ChatPlaceholder />}
                </div>
            </BorderAnimateContainer>
        </div>
    )
}

export default ChatPage