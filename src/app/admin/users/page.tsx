import { Users } from "@/app/admin/users/users";

export default function UsersPage() {
    return (
        <>
            <h1 className='text-center mt-24 text-3xl font-semibold'>
                Пользователи
            </h1>
            <div className='flex w-full justify-center'>
                <Users/>
            </div>
        </>
    )
}