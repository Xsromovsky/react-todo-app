
import { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';
import { Headers, Request, Response } from 'node-fetch';
/**
* Initializes and returns a mock server using the specified request handlers.
* This server intercepts HTTP requests using the `msw` library to facilitate testing.
*
* @param {RequestHandler[]} handlers - An array of request handlers to define server
responses.
* @returns {Server} The initialized mock server that can intercept and respond to HTTP
requests.
*
* @example
* const handlers = [
* rest.get('/api/test', (req, res, ctx) => {
* return res(ctx.json({ data: 'test data' }));
* }),
* ];
* mockServer(handlers);
*/
export const mockServer = (handlers: RequestHandler[]) => {
    const server = setupServer(...handlers);
    // @ts-ignore
    beforeAll(() => {
        global.fetch = fetch as any;
        global.Headers = Headers as any;
        global.Request = Request as any;
        global.Response = Response as any;
        // @ts-ignore
        // Start the interception.
        server.listen();
        server.listen({ onUnhandledRequest: 'error' });
        server.events.on('request:start', ({ request, requestId }) => {
            // eslint-disable-next-line no-console
            console.log('Outgoing request:', request.method,
                request.url);

        })

        server.events.on('response:mocked', ({ request, requestId,
            response }) => {
            // eslint-disable-next-line no-console
            console.log(
            '%s %s received %s %s',
            request.method,

            request.url,
            response.status,
            response.statusText
            );
        });
    });
    afterEach(() => server.resetHandlers());
    // @ts-ignore
    afterAll(() => server.close());
    return server;
};