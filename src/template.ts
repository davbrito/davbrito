import { extract } from "@std/front-matter/yaml";
import { readFileSync } from "node:fs";
import { isValidElement } from "preact";
import { render } from "preact-render-to-string";
import { z } from "zod/v4";

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
) => void;

export function processTemplate(path: URL | string, fn: PrepareFunction) {
  const templateFile = readFileSync(path, "utf-8");
  const { attrs, body } = extract(templateFile);

  const attributes = attributesSchema.parse(attrs);

  let result: string = body;

  const replace = (
    regexp: RegExp,
    context: Record<string, unknown> | ((key: string) => unknown)
  ) => {
    result = replaceTemlateMatches(result, regexp, context);
  };

  fn?.(attributes, replace);

  return result;
}
