import { http, HttpResponse } from 'msw'

const backendURL = 'http://localhost:3100';

const loginTokens = {

    accessToken: "mocked-access-token",
    refreshToken: "mocked-refresh-token"
}

export const handlers = [


    http.post(`${backendURL}/user/login`, (info) => {
        return HttpResponse.json(loginTokens, { status: 200, statusText: "OK" });

    }),
    http.post(`${backendURL}/user/signup`, (info) => {

        return HttpResponse.json({
            message: 'User successfully created'
        }, { status: 201, statusText: "Created" });
    }),

    http.post(`${backendURL}/task/inbox/add`, () => {
        return HttpResponse.json({
            id: "cm0wxcj3c000dr90yh0ru3lxx",
            created_at: "2024-09-10T21:08:59.688Z",
            updated_at: "2024-09-10T21:08:59.688Z",
            title: "Task title",
            description: "Task description",
            isDone: false,
            projectId: null,
            inbox_taskId: "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8",
        }, { status: 201, statusText: "Created" });
    }),

    http.put(`${backendURL}/task/inbox`, () => {
        return HttpResponse.json({

            id: "cm06e5ign000a7ivdputdt87l",
            created_at: "2024-08-23T07:29:39.000Z",
            updated_at: "2024-09-11T17:11:09.721Z",
            title: "najskdfadf",
            description: "i asdfasd to try update controller",
            isDone: false,
            projectId: null,
            inbox_taskId: "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"

        }, { status: 200, statusText: "OK" })
    }),

    http.get(`${backendURL}/task/inbox/all`, () => {
        return HttpResponse.json([
            {
                "id": "cm0xosr440000s6vojufoh1di",
                "created_at": "2024-09-11T09:57:26.212Z",
                "updated_at": "2024-09-11T21:18:36.257Z",
                "title": "first title",
                "description": "",
                "isDone": true,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            },
            {
                "id": "cm0xossvy0001s6vokoeqbvci",
                "created_at": "2024-09-11T09:57:28.511Z",
                "updated_at": "2024-09-11T21:18:37.494Z",
                "title": "dasf",
                "description": "",
                "isDone": false,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            },
            {
                "id": "cm0yd51xt0002s6vo3dju449i",
                "created_at": "2024-09-11T21:18:50.898Z",
                "updated_at": "2024-09-11T21:18:52.641Z",
                "title": "n",
                "description": "",
                "isDone": true,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            },
            {
                "id": "cm06dz46c00097ivdskmgq56e",
                "created_at": "2024-08-23T07:24:40.549Z",
                "updated_at": "2024-09-11T21:19:59.873Z",
                "title": "aaa",
                "description": "",
                "isDone": false,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            },
            {
                "id": "clzzznw6y0000dqbfhtkc6vrw",
                "created_at": "2024-08-18T19:57:25.306Z",
                "updated_at": "2024-09-11T21:20:00.849Z",
                "title": "fixing tasks",
                "description": "",
                "isDone": false,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            },
            {
                "id": "cm0dm7x6300056bz5kebzojyg",
                "created_at": "2024-08-28T08:49:51.532Z",
                "updated_at": "2024-09-11T09:46:49.832Z",
                "title": "another new task task",
                "description": "blablablablabla",
                "isDone": true,
                "projectId": null,
                "inbox_taskId": "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8"
            }
        ], { status: 200, statusText: "OK" })
    })
]