# fetch transform

## transform by handlebars
file.hbs
```
hello {{name}}
```

out.txt
```
hello foo
```

see. https://handlebarsjs.com/

## usage
```ts
  import { fetchTransform } from "https://raw.githubusercontent.com/yoko0180/deno-fetch-transform/master/fetchTransform.ts"
  const context = { name: "foo" }
  const outfile = await Deno.open("out.txt", { create: true, write: true })
  const url = "https://something/file.hbs"
  const w = outfile.writable
  await fetchTransform(url, w, context)
  w.close()
```