import { Status,useGetTasksQuery,useUpdateTaskStatusMutation } from '@/state/api'
import React from 'react'

type BoardViewProps = {
    id: string,
    setModalNewTaskOpen: (isOpen: boolean) => void
}

const taskStatuses = [
    "To Do",
    "Work In Progress",
    "Under Review",
    "Completed",
]

const BoardView = ({ id,setModalNewTaskOpen }: BoardViewProps) => {

    const { data: tasks,isLoading,error } = useGetTasksQuery({ projectId: Number(id) })

    const [updateTaskStatus] = useUpdateTaskStatusMutation()
    const moveTask = (taskId: number,toStatus: string) => {
        updateTaskStatus({ taskId,status: toStatus as Status })
    }
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occurred while fetching tasks</div>




    const handleNewTask = () => {
        setModalNewTaskOpen(true)
    }
    return (
        <div>BoardView</div>
    )
}

export default BoardView