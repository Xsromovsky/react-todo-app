import { http, HttpResponse } from 'msw'


export const handlers = [
    http.get('http://localhost:4950/user', () => {
        return HttpResponse.json({
            id: 123,
            name: 'John',
            email: 'john@example.com',
            age: 23,
        })
    }),
    http.post('http://localhost:4950/task', () => {
        return HttpResponse.json({
            id: "a7c9",
            title: "tested task",
            description: "be in the process"
        },{status: 201, statusText: "created"});
    })
]