'use client'

import React,{ useEffect } from 'react'
import Navbar from '@/app/(components)/navbar'
import Sidebar from '@/app/(components)/sidebar'
import StoreProvider,{ useAppSelector } from './redux'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isSideabarCollapsed = useAppSelector(state => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector(state => state.global.isDarkMode)
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })
    return (
        <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
            <Sidebar />
            <main className={`w-full flex flex-col bg-gray-50 dark:bg-dark-bg ${isSideabarCollapsed ? 'pl-0' : 'md:pl-64'}`}>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
    )
}

export default DashboardWrapper