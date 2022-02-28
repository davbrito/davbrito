import { join } from "path/mod.ts";
import { ASSETS_DIR } from "./constants.ts";

function getImagePath(filename: string) {
  return join(ASSETS_DIR, filename);
}

export async function fetchAndSaveImage(url: URL | string, filename: string) {
  const response = await fetch(url, {
    headers: {
      accept: "image/svg+xml",
    },
  });

  const data = new Uint8Array(await response.arrayBuffer());

  const imagePath = getImagePath(filename);

  await Deno.writeFile(imagePath, data, { create: true });

  return imagePath;
}
