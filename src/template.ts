import { extract } from "@std/front-matter/yaml";
import { z } from "zod/v4";
import { isValidElement } from "preact";
import { render } from "preact-render-to-string";

const attributesSchema = z.object({
  username: z.string(),
  favRepos: z.array(
    z.object({
      name: z.string(),
      username: z.string(),
      repo: z.string(),
    })
  ),
  personal: z.array(
    z.object({
      name: z.string(),
      url: z.url(),
      description: z.string(),
    })
  ),
});

export type Repo = z.infer<typeof attributesSchema>["favRepos"][number];
export type Project = z.infer<typeof attributesSchema>["personal"][number];

function replaceTemlateMatches(
  text: string,
  regexp: RegExp,
  context: Record<string, unknown> | ((key: string) => unknown)
) {
  const getValue =
    typeof context === "function"
      ? (key: string) => context(key)
      : (key: string) => context[key as keyof typeof context];

  return text.replace(regexp, (str, key) => {
    const value = getValue(key);
    if (value === undefined) return str;

    if (isValidElement(value)) return render(value);

    return String(value);
  });
}

type PrepareFunction = (
  attrs: z.infer<typeof attributesSchema>,
  replace: (
    regexp: RegExp,
    context: Record<string, unknown> | ((key: string) => unknown)
  ) => void
) => void | Promise<void>;

export async function processTemplate(path: URL, fn: PrepareFunction) {
  const templateFile = await Deno.readTextFile(path);

  const { attrs, body } = extract(templateFile);

  const attributes = attributesSchema.parse(attrs);

  let result = body;

  const replace = (
    regexp: RegExp,
    context: Record<string, unknown> | ((key: string) => unknown)
  ) => {
    result = replaceTemlateMatches(result, regexp, context);
  };

  await fn?.(attributes, replace);

  return result;
}
