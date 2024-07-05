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


export const CreateOrderStep6 = () => {
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
                                Сегодня
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                mode="single"
                                className="rounded-md border"
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Select>
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

                    <Select>
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
                                Сегодня
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Calendar
                                mode="single"
                                className="rounded-md border"
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Select>
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

                    <Select>
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