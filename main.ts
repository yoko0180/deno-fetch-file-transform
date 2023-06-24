import HandlebarsJS from "https://esm.sh/handlebars@4.7.7"
import { toTransformStream } from "https://deno.land/std@0.170.0/streams/to_transform_stream.ts"

type Context = Record<string, unknown>

function makeTransform(context: Context) {
  return toTransformStream(async function* (src: ReadableStream) {
    for await (const chunk of src) {
      const template = HandlebarsJS.compile(chunk)
      const text = template(context)
      yield text
    }
  })
}

async function transform(rs: ReadableStream, w: WritableStream, context: Context) {
  await rs
    .pipeThrough(new TextDecoderStream()) // Uint8Arrayをstringに変換
    .pipeThrough(makeTransform(context))
    .pipeThrough(new TextEncoderStream()) // to Uint8Array

    // preventClose: true オプション未指定ではクローズされる
    // prevent : 防ぐ
    .pipeTo(w, {preventClose: true})
}

async function fetchToStream(url: string) {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  const data = new Uint8Array(buf)
  const blob = new Blob([data])
  return blob.stream()
}

export async function fetchTransform(url: string, w: WritableStream, context: Context) {
  const res = await fetchToStream(url)
  await transform(res, w, context)
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const outfile = await Deno.open("out.txt", { create: true, write: true })
  const context = { name: "fooooooo3" }
  const url = "https://github.com/yoko0180/deno-handlebars/raw/master/template.hbs"
  const w = outfile.writable
  await fetchTransform(url, w, context)
}
