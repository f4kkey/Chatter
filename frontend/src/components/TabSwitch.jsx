import React from 'react'
import { useChatStore } from '../store/useChatStore'

function TabSwitch() {
    const { tab, setTab } = useChatStore()
    return (
        <div className='tabs tabs-boxed bg-transparent p-2 m-2'>
            <button onClick={() => setTab("chats")}
                className={`tab ${tab === "chats" ?
                    "bg-cyan-500/20 text-cyan-400" :
                    "text-slate-400"
                    }`}
            >Chats</button>
            <button onClick={() => setTab("contacts")}
                className={`tab ${tab === "contacts" ?
                    "bg-cyan-500/20 text-cyan-400" :
                    "text-slate-400"
                    }`}
            >Contacts</button>
        </div>
    )
}

export default TabSwitch