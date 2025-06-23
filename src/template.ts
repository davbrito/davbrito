import { extract } from "@std/front-matter/yaml";
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

export async function parseTemplate() {
  const templateFile = await Deno.readTextFile(
    new URL("./template.md", import.meta.url)
  );

  const { attrs, body } = extract(templateFile);

  const attributes = attributesSchema.parse(attrs);

  return { ...attributes, body };
}

export type Repo = z.infer<typeof attributesSchema>["favRepos"][number];
export type Project = z.infer<typeof attributesSchema>["personal"][number];
