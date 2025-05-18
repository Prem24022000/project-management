'use client'

import { useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { useGetProjectsQuery } from '@/state/api'
import { AlertCircle,AlertOctagon,AlertTriangle,Briefcase,ChevronDown,ChevronUp,Home,Layers3,LockIcon,LucideIcon,Search,Settings,ShieldAlert,User,Users,X,} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'

const Sidebar = () => {
    const [showProjects,setShowProjects] = useState(true)
    const [showPriority,setShowPriority] = useState(true)
    const isSideabarCollapsed = useAppSelector(state => state.global.isSidebarCollapsed)
    const dispatch = useDispatch()
    const { data: projects } = useGetProjectsQuery()
    const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl z-40 dark:bg-black overflow-y-auto bg-white ${isSideabarCollapsed ? 'w-0 hiddem' : 'w-64'}`
    return (
        <div className={sidebarClassNames}>
            {/* Top Logo */}
            <div className='flex h-full w-full flex-col justify-start'>
                <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
                    <div className='text-xl font-bold text-gray-800 dark:bg-white'>
                        LOVELIST
                    </div>
                    {isSideabarCollapsed ? null : <button className='py-3' onClick={() => dispatch(setIsSidebarCollapsed(!isSideabarCollapsed))}><X className='size-6 text-gray-600 hover:text-gray-500 dark:text-white' /></button>}
                </div>
                {/* Team */}
                <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:bg-gray-700'>
                    <Image src='/logo.png' alt='Logo' width={40} height={40} />
                    <div>
                        <h3 className='text-sm font-bold tracking-wide dark:text-gray-200'>
                            LOVE TEAM
                        </h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className='mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400' />
                            <p className='text-xs text-gray-500'>Private</p>
                        </div>
                    </div>
                </div>
                {/* NAVBAR LINKS */}
                <nav className='z-10 w-full'>
                    <SidebarLink icon={Home} label='Home' href='/' />
                    <SidebarLink icon={Briefcase} label='Timeline' href='/timeline' />
                    <SidebarLink icon={Search} label='Search' href='/search' />
                    <SidebarLink icon={Settings} label='Settings' href='/settings' />
                    <SidebarLink icon={User} label='Users' href='/users' />
                    <SidebarLink icon={Users} label='Teams' href='/teamsx' />
                </nav>
                {/* Projects List */}
                <button onClick={() => setShowProjects(prev => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                    <span className=''>Projects</span>
                    {showProjects ? <ChevronUp className='size-5' /> : <ChevronDown className='size-5' />}
                </button>

                {showProjects && (
                    <div className='flex flex-col gap-2'>
                        {projects?.map((project) => (
                            <SidebarLink key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`} />
                        ))}
                    </div>
                )}


                {/* Projects Links */}
                <button onClick={() => setShowPriority(prev => !prev)} className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                    <span className=''>Priority</span>
                    {showPriority ? <ChevronUp className='size-5' /> : <ChevronDown className='size-5' />}
                </button>
                {showPriority && (
                    <>
                        <SidebarLink icon={AlertCircle} label='Urgent' href='/priority/urgent' />
                        <SidebarLink icon={ShieldAlert} label='High' href='/priority/high' />
                        <SidebarLink icon={AlertTriangle} label='Medium' href='/priority/medium' />
                        <SidebarLink icon={AlertOctagon} label='Low' href='/priority/low' />
                        <SidebarLink icon={Layers3} label='Backlog' href='/priority/backlog' />
                    </>
                )}
            </div>
        </div>
    )
}

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
}: SidebarLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard')


    return (
        <Link href={href} className="w-full" >
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''} justify-start px-8 py-3`}>
                {isActive && <div className='absolute h-full w-1 left-0 top-0 bg-blue-200' />}
                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

export default Sidebar