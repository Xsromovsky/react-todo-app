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
    })
]