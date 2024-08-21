export type Task = {
    id: string,
    title: string,
    description?: string,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date,
    projectId?: string,
    inbox_taskId?: string,
    
}

export type ProjectType = {
    id: string,
    label: string,
    created_at: Date,
    updated_at: Date,
    ownerId: string,
    tasks: Task[]
}