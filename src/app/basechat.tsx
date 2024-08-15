'use client';

import {ChangeEvent, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {BaseChatContext} from "@/app/basechatmodel";
import {CgClose} from "react-icons/cg";
import {Loader2} from "lucide-react";
import {IoSend} from "react-icons/io5";

interface IMessage {
    id: string,
    from_: 'user' | 'admin',
    text: string,
    status: 'sending' | 'sent',
}
const adminMessageStyle = {
    alignSelf: 'start',
    borderRadius: '0px 16px 16px 16px',
}

const userMessageStyle = {
    alignSelf: 'end',
    borderRadius: '16px 16px 0px 16px',
}

interface IWebsocketMessage {
    type: 'init' | 'receiveMessage' | 'messageCallback',
    status: 'success',
    id: string,
    messages: IMessage[],
    text: string,
    from_: 'user' | 'admin',
}

const Message = (props: IMessage) => {
    return (
        <div
            className='sm:max-w-[180px] bg-[#222] px-4 py-2.5 text-sm'
            style={props.from_ === 'user' ? userMessageStyle : adminMessageStyle}
        >
            <p style={{ color: props.status === 'sending' ? '#999' : 'white' }}>
                { props.text }
            </p>
        </div>
    )
}

export const BaseUserChat = (props: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    },[])

    useEffect(() => {
        if (websocket) {
            websocket.onmessage = (msg) => {
                const data: IWebsocketMessage = JSON.parse(msg.data)

                switch (data.type) {
                    case 'init':
                        setMessages(data.messages)
                        break

                    case "messageCallback":
                        setMessages(prev => prev.map(m => m.id === data.id ? { ...m, status: 'sent' } : m))
                        break

                    case "receiveMessage":
                        setMessages(prev => [...prev, {
                            id: data.id,
                            from_: data.from_,
                            text: data.text,
                            status: 'sent',
                        }])

                        break

                }
            }
        }
    }, [websocket]);

    const sendMessage = () => {
        const newMsg: IMessage = {
            id: new Date().valueOf().toString(),
            text,
            from_: 'user',
            status: 'sending',
        }

        setMessages(prev => [...prev, newMsg])
        setText('')

        websocket?.send(JSON.stringify(newMsg))
    }

    return (
        <BaseChatContext.Provider value={{
            open,
            setOpen,
            websocket,
            setWebsocket
        }}>
            {props.children}
            {open && <div
                className='z-50 border border-[#444] shadow-2xl rounded-xl fixed bottom-0 left-0 sm:left-auto w-screen h-[100dvh] sm:bottom-24 sm:right-8 sm:h-[500px] sm:w-[340px] bg-[#151515]'>
                <div className='flex flex-col rounded-t-xl items-center justify-center p-4'>
                    <CgClose onClick={() => {
                        websocket?.close()
                        setWebsocket(null)
                        setOpen(false)
                        setMessages([])
                    }} className='absolute text-[#aaa] hover:text-white cursor-pointer right-4 top-4'
                    />
                    <h1 className='font-semibold'>Чат с поддержкой</h1>
                    <h1 className='text-[#aaa] text-sm'>Мы всегда онлайн!</h1>
                    <div
                        className='mt-4 overflow-y-auto w-full h-[calc(100dvh-180px)] sm:h-[350px] px-4 flex flex-col gap-3'>
                        <Message id={'-1'} from_={'admin'} text={'Добрый день! Чем можем вам помочь?'} status={'sent'}/>
                        {messages.map(msg => <Message {...msg} key={msg.text}/>)}
                    </div>
                    <div className='w-full flex mt-6 gap-3 items-center justify-center'>
                        <input
                            onChange={handleOnChange}
                            value={text}
                            className='px-3 py-2 w-full bg-[#222] rounded-lg border-none outline-none'
                            placeholder='Добрый день...'/>
                        <div
                            onClick={sendMessage}
                            className='border border-[#444] p-2 w-max h-max bg-[#222] rounded-lg hover:bg-[#333] cursor-pointer'
                        >
                            <IoSend/>
                        </div>
                    </div>
                </div>
            </div>}
        </BaseChatContext.Provider>
    )
}