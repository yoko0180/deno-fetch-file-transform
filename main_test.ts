import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts"
import { fetchTransform } from "./fetchTransform.ts";

Deno.test("fetchTransform test", async () => {
  const TEST_OUT = "test-out.txt"
  const outfile = await Deno.open(TEST_OUT, { create: true, write: true })
  const context = { name: "foo" }
  const url = "https://github.com/yoko0180/deno-fetch-transform/raw/master/test_template.hbs"
  const w = outfile.writable
  await fetchTransform(new URL(url), w, context)
  w.close()
  assertEquals(Deno.readTextFileSync(TEST_OUT), "hello foo")
  await Deno.remove(TEST_OUT)
})
