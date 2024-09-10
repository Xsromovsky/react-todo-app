const { TextDecoder, TextEncoder } = require('node:util')
const { ReadableStream } = require("node:stream/web");
// eslint-disable-next-line no-undef
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
})

const { Blob, File } = require('node:buffer')
const { fetch, Headers, Request, Response } = require('undici')
 
// eslint-disable-next-line no-undef
Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  // FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})