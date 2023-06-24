import { fetchTransform } from "./fetchTransform.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const outfile = await Deno.open("out.txt", { create: true, write: true })
  const context = { name: "fooooooo3" }
  const url = "https://github.com/yoko0180/deno-handlebars/raw/master/template.hbs"
  const w = outfile.writable
  await fetchTransform(url, w, context)
}
