import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts"
import { fetchTransform } from "./main.ts"

/**
 * 関数内で指定されたwritableをクローズするかしないか
 * 
 * 利用側でopenするため利用側でクローズするのが望ましいのかもしれない
 * テストでstdoutを使うとテストメソッド外で開かれているものがテスト内でクローズしないでくださいというエラーになることも裏付けているのかもしれない。
 */



Deno.test("fetchTransform stdout test", async () => {
  const context = { name: "fooooooo3" }
  const url = "https://github.com/yoko0180/deno-handlebars/raw/master/template.hbs"
  const w = Deno.stdout.writable
  await fetchTransform(url, w, context)
  // assertEquals(add(2, 3), 5)
})

Deno.test("fetchTransform file out test", async () => {
  const TEST_OUT = "test-out.txt"
  const outfile = await Deno.open(TEST_OUT, { create: true, write: true })
  const context = { name: "fooooooo3" }
  const url = "https://github.com/yoko0180/deno-handlebars/raw/master/template.hbs"
  const w = outfile.writable
  await fetchTransform(url, w, context)
  w.close()
  await Deno.remove(TEST_OUT)
})
