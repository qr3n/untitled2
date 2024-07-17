'use client';

import {ChangeEvent, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ChatContext} from "@/app/admin/model";
import {CgClose} from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import {Loader2} from "lucide-react";

interface IMessage {
    id: string,
    from_: 'user' | 'admin',
    text: string,
    status: 'sending' | 'sent',
    order_id: number
}

const userMessageStyle = {
    alignSelf: 'start',
    borderRadius: '0px 16px 16px 16px',
}

const adminMessageStyle = {
    alignSelf: 'end',
    borderRadius: '16px 16px 0px 16px',
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

interface IWebsocketMessage {
    type: 'init' | 'receiveMessage' | 'messageCallback',
    status: 'success',
    id: string,
    messages: IMessage[],
    text: string,
    from_: 'user' | 'admin',
}


export const Chat = ({ children }: PropsWithChildren) => {
    const [init, setInit] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [chatOpen, setChatOpen] = useState(false)
    const [orderId, setOrderId] = useState(0)
    const [websocket, setWebsocket] = useState<WebSocket | null>(null)
    const [text, setText] = useState('')

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    },[])

    useEffect(() => {
        setWebsocket(chatOpen ? new WebSocket(`wss://emarket-1ans.onrender.com/chat/admin?admin_token=secret&order_id=${orderId}`) : null)
    }, [chatOpen, orderId]);

    useEffect(() => {
        if (websocket) {
            websocket.onmessage = (msg) => {
                const data: IWebsocketMessage = JSON.parse(msg.data)

                switch (data.type) {
                    case 'init':
                        setMessages(data.messages)
                        setInit(true)
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
                            order_id: orderId
                        }])

                        break

                }
            }
        }
    }, [orderId, websocket]);

    const sendMessage = () => {
        const newMsg: IMessage = {
            order_id: orderId,
            id: new Date().valueOf().toString(),
            text,
            from_: 'admin',
            status: 'sending',
        }

        setMessages(prev => [...prev, newMsg])
        setText('')

        websocket?.send(JSON.stringify(newMsg))
    }

    return (
        <ChatContext.Provider value={{chatOpen, setChatOpen, orderId, setOrderId}}>
            { children }

            { chatOpen &&
                <div className='z-50 border border-[#444] shadow-2xl rounded-xl fixed bottom-0 left-0 sm:left-auto w-screen h-screen sm:bottom-16 sm:right-8 sm:h-[500px] sm:w-[340px] bg-[#151515]'>
                    <div className='flex flex-col rounded-t-xl items-center justify-center p-4'>
                        <CgClose className='absolute text-[#aaa] hover:text-white cursor-pointer right-4 top-4' onClick={() => {
                            websocket?.close()
                            setWebsocket(null)
                            setChatOpen(false)
                        }}/>
                        {
                            websocket?.OPEN ? (
                                <>
                                    <h1 className='font-semibold'>Заказ #1</h1>
                                    <h1 className='text-[#aaa] text-sm'>qtter85@gmail.com</h1>
                                    <div className='mt-4 overflow-y-auto w-full h-[calc(100vh-180px)] sm:h-[350px] px-4 flex flex-col gap-3'>
                                        { init ? messages.map(msg => <Message {...msg} key={msg.text}/>) : (
                                            <div
                                                className="left-1/2 -translate-x-1/2 absolute top-1/2 -translate-y-1/2">
                                                <Loader2 className="gap-2 text-[#999] h-4 w-4 animate-spin"/>
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-full flex mt-6 gap-3 items-center justify-center'>
                                        <input onChange={handleOnChange} value={text}
                                               className='px-3 py-2 w-full bg-[#222] rounded-lg border-none outline-none'
                                               placeholder='Добрый день...'/>
                                        <div
                                            className='border border-[#444] p-2 w-max h-max bg-[#222] rounded-lg hover:bg-[#333] cursor-pointer'
                                            onClick={sendMessage}>
                                            <IoSend/>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='absolute top-1/2 gap-2 -translate-y-1/2 flex items-center justify-center'>
                                    <p className='text-[#999]'>Подключаемся...</p>
                                    <Loader2 className="text-[#999] h-4 w-4 animate-spin" />
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </ChatContext.Provider>
    )
}

