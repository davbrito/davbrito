export class FormatTransform
  implements ReadableWritablePair<Uint8Array, Uint8Array>
{
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;

  constructor(ext = "md") {
    const command = new Deno.Command(Deno.execPath(), {
      args: ["fmt", "--ext", ext, "-"],
      stdin: "piped",
      stdout: "piped",
      stderr: "piped",
    });
    const proccess = command.spawn();

    this.readable = proccess.stdout;
    this.writable = proccess.stdin;
  }
}
