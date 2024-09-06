import { server } from './src/mocks/server'
import ResizeObserver from 'resize-observer-polyfill';

require('@testing-library/jest-dom');
global.ResizeObserver = ResizeObserver;

beforeAll(() =>{
    server.listen();
    // server.listen({ onUnhandledRequest: 'error' });

    //     server.events.on('request:start', ({ request, requestId }) => {
    //         // eslint-disable-next-line no-console
    //         // console.log('Outgoing request:', request.method, request.url);
    //     });

    //     server.events.on('response:mocked', ({ request, requestId, response }) => {
    //         // eslint-disable-next-line no-console
    //         // console.log(
    //         //   '%s %s received %s %s',
    //         //   request.method,
    //         //   request.url,
    //         //   response.status,
    //         //   response.statusText
    //         // );
    //     });
 });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());