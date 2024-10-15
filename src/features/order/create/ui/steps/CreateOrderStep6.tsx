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


const createDate = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

let time = new Date();
time.setHours(22, 0, 0, 0); // Устанавливаем время на 22:00

const nightSlots: string[] = [];

for (let i = 0; i < 21; i++) { // Генерируем 12 часов * 60 минут = 720 минут
    const hours = time.getHours();
    const minutes = time.getMinutes();
    nightSlots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    time.setMinutes(time.getMinutes() + 30); // Переходим к следующему временному слоту через 30 минут
}


export const CreateOrderStep6 = () => {
    const { timeToTake, timeToDeliver, setTimeToTake, setTimeToDeliver, setTariff } = useContext(Context)
    const [get, setGet] = useState<Date | undefined>(new Date())
    const [give, setGive] = useState<Date | undefined>(new Date())
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
        if (nightSlots.includes(getTimeFrom)) {
            setTariff('night')
        }

        else {
            setTariff('day')
        }
    }, [getTimeFrom, setTariff]);

    useEffect(() => {
        if (give && get) {
            if (give < get) {
                setGive(get)
            }
        }
    }, [get, give]);

    useEffect(() => {
        const currentDate = new Date()

        setTimeToTake(`${createDate(currentDate)} как можно быстрее`)
        setTimeToDeliver(`${createDate(currentDate)} как можно быстрее`)
    }, [setTimeToDeliver, setTimeToTake])

    useEffect(() => {
        if (getTimeTo && getTimeFrom) {
            const newTimeSlots = generateTimeSlots()

            if ((get?.getDate() === give?.getDate())) {
                setTimeSlots3(newTimeSlots.slice(newTimeSlots.indexOf(getTimeFrom), newTimeSlots.length))
                setTimeSlots4(newTimeSlots.slice(newTimeSlots.indexOf(getTimeFrom), newTimeSlots.length))
            }

            else {
                setTimeSlots3(generateTimeSlots())
                setTimeSlots4(generateTimeSlots())
            }
        }

        if (get) {
            if (getTimeFrom || getTimeTo) {
                setTimeToTake(`${createDate(get)} ${getTimeFrom ? `с ${getTimeFrom}` : 'как можно быстрее, '} ${getTimeTo ? `до ${getTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToTake(`${createDate(get)} как можно быстрее`)
            }
        }

        else {
            const currentDate = new Date()

            if (getTimeFrom || getTimeTo) {
                setTimeToTake(`${createDate(currentDate)} ${getTimeFrom ? `с ${getTimeFrom}` : 'как можно быстрее, '} ${getTimeTo ? `до ${getTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToTake(`${createDate(currentDate)} как можно быстрее`)
            }
        }
    }, [getTimeFrom, getTimeTo, get, give, setTimeToTake]);

    useEffect(() => {
        if (getTimeFrom ) {
            const newTimeSlots = generateTimeSlots()
            setTimeSlots2(newTimeSlots.slice(newTimeSlots.indexOf(getTimeFrom) + 1, newTimeSlots.length))
            setTimeSlots4(newTimeSlots.slice(newTimeSlots.indexOf(giveTimeFrom) + 1, newTimeSlots.length))
        }
    }, [getTimeFrom]);


    useEffect(() => {
        if (give) {
            if (giveTimeFrom || giveTimeTo) {
                setTimeToDeliver(`${createDate(give)} ${giveTimeFrom ? `с ${giveTimeFrom}` : 'как можно быстрее, '} ${giveTimeTo ? `до ${giveTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToDeliver(`${createDate(give)} как можно быстрее`)
            }
        }

        else {
            const currentDate = new Date()

            if (giveTimeFrom || giveTimeTo) {
                setTimeToDeliver(`${createDate(currentDate)} ${giveTimeFrom ? `с ${giveTimeFrom}` : 'как можно быстрее, '} ${giveTimeTo ? `до ${giveTimeTo}` : ', как можно быстрее'}`)
            }

            else {
                setTimeToDeliver(`${createDate(currentDate)} как можно быстрее`)
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
                                onSelect={d => {
                                    console.log(d)
                                    setGet(d)
                                }}
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