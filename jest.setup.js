import { server } from "./src/mocks/server";
import ResizeObserver from "resize-observer-polyfill";
// import { Headers, Request, Response } from "node-fetch";

require("@testing-library/jest-dom");

global.ResizeObserver = ResizeObserver;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Object.defineProperty(window, 'Request', {
//   writable: true,
//   value: jest.fn(),
//   configurable: true
// })


Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
