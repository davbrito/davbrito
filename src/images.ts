import { join } from "std/path/mod.ts";
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

  const imagePath = getImagePath(filename);
  const file = await Deno.open(imagePath, { create: true, write: true });
  await response.body!.pipeTo(file.writable);

  return imagePath;
}
