export class FormatTransform extends TransformStream<Uint8Array, Uint8Array> {
  constructor(ext = "md") {
    const command = new Deno.Command(Deno.execPath(), {
      args: ["fmt", "--ext", ext, "-"],
      stdin: "piped",
      stdout: "piped",
      stderr: "piped",
    });

    let proccess: Deno.ChildProcess;
    let stdin: WritableStream<Uint8Array>;
    let stdout: ReadableStream<Uint8Array>;
    let finished: Promise<void> | undefined;
    let writer: WritableStreamDefaultWriter<Uint8Array> | undefined;

    super({
      start: (controller) => {
        proccess = command.spawn();
        stdin = proccess.stdin;
        stdout = proccess.stdout;
        writer = stdin.getWriter();

        const read = async (): Promise<void> => {
          for await (const chunk of stdout) {
            controller.enqueue(chunk);
          }

          const { success } = await proccess.status;

          if (!success) {
            console.error("Error while running `deno fmt`:");
            await proccess.stderr.pipeTo(Deno.stderr.writable);
            throw new Error("Failed to format code");
          }

          controller.terminate();
        };

        finished = read().catch((error) => {
          controller.error(error);
        });
      },
      flush: async () => {
        writer?.close();
        await finished;
      },
      transform: (chunk) => {
        return writer?.write(chunk);
      },
    });
  }
}
