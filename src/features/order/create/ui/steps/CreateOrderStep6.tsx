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
    const { timeToTake, timeToDeliver, setTimeToTake, setTimeToDeliver } = useContext(Context)
    const [get, setGet] = useState<Date | undefined>()
    const [give, setGive] = useState<Date | undefined>()
    const [getTimeFrom, setGetTimeFrom] = useState('')
    const [getTimeTo, setGetTimeTo] = useState('')
    const [giveTimeFrom, setGiveTimeFrom] = useState('')
    const [giveTimeTo, setGiveTimeTo] = useState('')

    const generateTimeSlots = () => Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? 0 : 30;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    })

    const [timeSlots, setTimeSlots] = useState(generateTimeSlots())
    const [timeSlots2, setTimeSlots2] = useState(generateTimeSlots())

    const [timeSlots3, setTimeSlots3] = useState(generateTimeSlots())
    const [timeSlots4, setTimeSlots4] = useState(generateTimeSlots())

    useEffect(() => {
        if (give && get) {
            if (give < get) {
                setGive(get)
            }
        }
    }, [get, give]);

    useEffect(() => {
        const currentDate = new Date()

        setTimeToTake(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}, как можно быстрее`)
        setTimeToDeliver(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}, как можно быстрее`)
    }, [])

    useEffect(() => {
        if (getTimeTo && getTimeFrom) {
            const newTimeSlots = generateTimeSlots()

            setTimeSlots3(newTimeSlots.slice(newTimeSlots.indexOf(getTimeTo) + 1, newTimeSlots.length))
            setTimeSlots4(newTimeSlots.slice(newTimeSlots.indexOf(getTimeTo), newTimeSlots.length))
        }

        if (get) {
            if (getTimeFrom || getTimeTo) {
                setTimeToTake(`${get?.getDate()}.${get && get.getMonth() + 1}.${get?.getFullYear()} ${getTimeFrom ? `с ${getTimeFrom}` : 'как можно быстрее, '} ${getTimeTo ? `до ${getTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToTake(`${get?.getDate()}.${get && get.getMonth() + 1}.${get?.getFullYear()} как можно быстрее`)
            }
        }

        else {
            const currentDate = new Date()

            if (getTimeFrom || getTimeTo) {
                setTimeToTake(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${getTimeFrom ? `с ${getTimeFrom}` : 'как можно быстрее, '} ${getTimeTo ? `до ${getTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToTake(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} как можно быстрее`)
            }
        }
    }, [getTimeFrom, getTimeTo, get]);

    useEffect(() => {
        if (getTimeFrom) {
            const newTimeSlots = generateTimeSlots()
            setTimeSlots2(newTimeSlots.slice(newTimeSlots.indexOf(getTimeFrom) + 1, newTimeSlots.length))
        }
    }, [getTimeFrom]);

    useEffect(() => {
        if (giveTimeFrom) {
            const newTimeSlots = generateTimeSlots()
            setTimeSlots4(newTimeSlots.slice(newTimeSlots.indexOf(giveTimeFrom) + 1, newTimeSlots.length))
        }
    }, [giveTimeFrom]);

    useEffect(() => {
        if (give) {
            if (giveTimeFrom || giveTimeTo) {
                setTimeToDeliver(`${give?.getDate()}.${give && give.getMonth() + 1}.${give?.getFullYear()} ${giveTimeFrom ? `с ${giveTimeFrom}` : 'как можно быстрее, '} ${giveTimeTo ? `до ${giveTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToDeliver(`${give?.getDate()}.${give && give.getMonth() + 1}.${give?.getFullYear()} как можно быстрее`)
            }
        }

        else {
            const currentDate = new Date()

            if (giveTimeFrom || giveTimeTo) {
                setTimeToDeliver(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${giveTimeFrom ? `с ${giveTimeFrom}` : 'как можно быстрее, '} ${giveTimeTo ? `до ${giveTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToDeliver(`${currentDate?.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} как можно быстрее`)
            }
        }
    }, [give, giveTimeFrom, giveTimeTo]);


    return (
        <CreateOrderStepTemplate title='Когда выполнить?' description='Время бесплатного ожидания 25 минут'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Забрать</h1>
                <div className='flex gap-2 items-center justify-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className='flex cursor-pointer items-center justify-center gap-2 bg-[#2A2A2A] border-2 border-transparent mt-4 px-3 py-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'>
                                <IoCalendarOutline className='text-[#777] w-5 h-5'/>
                                { get ? get.getDate() === new Date().getDate() ? 'Сегодня' : `${get.getDate()}.${get.getMonth() + 1}.${get.getFullYear()}` : 'Сегодня' }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                disabled={(date) => {
                                    const today = new Date();

                                    today.setHours(0, 0, 0, 0);

                                    return date < today;
                                }}
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
                                { give ? give.getDate() === new Date().getDate() ? 'Сегодня' : `${give.getDate()}.${give.getMonth() + 1}.${give.getFullYear()}` : 'Сегодня' }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                disabled={(date) => {
                                    const today = new Date();

                                    today.setHours(0, 0, 0, 0);

                                    return date < today || (get ? get > date : false);
                                }}
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
                                {timeSlots3.map((item, i) => (
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
                                {timeSlots4.map((item, i) => (
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