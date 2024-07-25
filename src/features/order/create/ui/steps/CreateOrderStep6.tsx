'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Calendar} from "@/components/ui/calendar";
import { IoCalendarOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useContext, useEffect, useState} from "react";
import {Context} from "@/features/order/create/model/context";


export const CreateOrderStep6 = () => {
    const currentDate = new Date()
    const { setTimeToTake, setTimeToDeliver } = useContext(Context)
    const [get, setGet] = useState<Date | undefined>()
    const [give, setGive] = useState<Date | undefined>()
    const [getTimeFrom, setGetTimeFrom] = useState('')
    const [getTimeTo, setGetTimeTo] = useState('')
    const [giveTimeFrom, setGiveTimeFrom] = useState('')
    const [giveTimeTo, setGiveTimeTo] = useState('')

    useEffect(() => {
        setTimeToTake(`${get?.getDate()}.${get && get.getMonth() + 1}.${get?.getFullYear()} с ${getTimeFrom} до ${getTimeTo}`)
    }, [getTimeFrom, getTimeTo, get, setTimeToTake]);

    useEffect(() => {
        setTimeToDeliver(`${give?.getDate()}.${give && give.getMonth() + 1}.${give?.getFullYear()} с ${giveTimeFrom} до ${giveTimeTo}`)
    }, [giveTimeFrom, giveTimeTo, give, setTimeToDeliver]);

    const timeSlots = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? 0 : 30;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    const timeSlots2 = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? 0 : 30;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });


    return (
        <CreateOrderStepTemplate title='Когда выполнить?' description='Условия для каждого варианта различаются'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Забрать</h1>
                <div className='flex gap-2 items-center justify-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className='flex cursor-pointer items-center justify-center gap-2 bg-[#2A2A2A] border-2 border-transparent mt-4 px-3 py-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'>
                                <IoCalendarOutline className='text-[#777] w-5 h-5'/>
                                { get ? get === new Date() ? 'Сегодня' : `${get.getDate()}.${get.getMonth() + 1}.${get.getFullYear()}` : 'Сегодня' }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                disabled={(date) =>
                                    date < new Date()
                                }
                                mode="single"
                                className="rounded-md border"
                                onSelect={d => setGet(d)}
                                selected={get}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Select onValueChange={v => setGetTimeFrom(v)}>
                        <SelectTrigger className="w-full mt-4">
                            <div className='flex gap-1'>
                                <p className='text-[#A2A2A2]'>с</p>
                                <SelectValue placeholder="00:00"/>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {timeSlots.map((item, i) => (
                                    <SelectItem value={item} key={i}>{item}</SelectItem>
                                ))}
                                <SelectItem value='23:59'>23:59</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={v => setGetTimeTo(v)}>
                        <SelectTrigger className="w-full mt-4">
                            <div className='flex gap-1'>
                                <p className='text-[#A2A2A2]'>до</p>
                                <SelectValue placeholder="00:00"/>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {timeSlots2.map((item, i) => (
                                    <SelectItem value={item} key={i}>{item}</SelectItem>
                                ))}
                                <SelectItem value='23:59'>23:59</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <h1 className='text-2xl font-semibold mt-12'>Доставить</h1>

                <div className='flex gap-2 items-center justify-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className='flex cursor-pointer items-center justify-center gap-2 bg-[#2A2A2A] border-2 border-transparent mt-4 px-3 py-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'>
                                <IoCalendarOutline className='text-[#777] w-5 h-5'/>
                                { give ? give === new Date() ? 'Сегодня' : `${give.getDate()}.${give.getMonth() + 1}.${give.getFullYear()}` : 'Сегодня' }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                disabled={(date) =>
                                    date < new Date()
                                }
                                mode="single"
                                className="rounded-md border"
                                onSelect={d => setGive(d)}
                                selected={give}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Select onValueChange={v => setGiveTimeFrom(v)}>
                        <SelectTrigger className="w-full mt-4">
                            <div className='flex gap-1'>
                                <p className='text-[#A2A2A2]'>с</p>
                                <SelectValue placeholder="00:00"/>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {timeSlots.map((item, i) => (
                                    <SelectItem value={item} key={i}>{item}</SelectItem>
                                ))}
                                <SelectItem value='23:59'>23:59</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={v => setGiveTimeTo(v)}>
                        <SelectTrigger className="w-full mt-4">
                            <div className='flex gap-1'>
                                <p className='text-[#A2A2A2]'>до</p>
                                <SelectValue placeholder="00:00"/>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {timeSlots2.map((item, i) => (
                                    <SelectItem value={item} key={i}>{item}</SelectItem>
                                ))}
                                <SelectItem value='23:59'>23:59</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}