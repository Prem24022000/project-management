import React from 'react'
import { Menu,Moon,Search,Settings,Sun } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/redux'
import { setIsDarkMode,setIsSidebarCollapsed } from '@/state'

const Navbar = () => {
    const dispatch = useDispatch()
    const isSideabarCollapsed = useAppSelector(state => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector(state => state.global.isDarkMode)
    return (
        <div className='flex justify-between items-center bg-white px-4 py-3 dark:bg-black dark:px-4 dark:py-3'>
            <div className='flex items-center gap-8'>
                {!isSideabarCollapsed ? null : <button onClick={() => dispatch(setIsSidebarCollapsed(!isSideabarCollapsed))}><Menu className='size-8 dark:text-white' /></button>}
                <div className='relative flex h-min w-[200px]'>
                    <Search className='absolute left-1 top-1/2 mr-2 size-5 -translate-y-1/2 hover:cursor-pointer dark:text-white' />
                    <input className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:text-white' type='search' placeholder='Search...' />
                </div>
            </div>
            <div className='flex items-center'>
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))} className={isDarkMode ? 'rounded p-2 dark:hover:bg-gray-700' : 'rounded p-2 dark:hover:bg-gray-100'}>
                    {isDarkMode ? <Sun className='size-6 cursor-pointer dark:text-white' /> : <Moon className='size-6 cursor-pointer dark:text-white' />}
                </button>
                <Link href='/settings' className={isDarkMode ? 'rounded p-2 h-min dark:hover:bg-gray-700' : 'rounded h-min p-2 dark:hover:bg-gray-100'} >
                    <Settings className='size-6 cursor-pointer dark:text-white' />
                </Link>
                <div className='ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-200 md:inline-block' />
            </div>
        </div>
    )
}

export default Navbar