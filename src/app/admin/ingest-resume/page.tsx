import { Anthropic } from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { redirect } from "next/navigation";

const resumeSchema = readFileSync("src/generated/resume-schema.txt", "utf8");

async function parseResume(file: File): Promise<Record<string, unknown>> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const text = buffer.toString("utf8");
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = `Extract the following fields from this resume and return as JSON matching this exact TypeScript schema:\n\n${resumeSchema}\n\nHere is the resume text: ${text}`;
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  const first = msg.content[0];
  const content =
    typeof first === "object" &&
    "text" in first &&
    typeof first.text === "string"
      ? first.text
      : "{}";
  try {
    return JSON.parse(content);
  } catch {
    return { error: "Failed to parse LLM output", raw: content };
  }
}

type Props = { searchParams?: { parsed?: string } };

export default async function Page({ searchParams }: Props) {
  const parsed = searchParams?.parsed ? JSON.parse(searchParams.parsed) : null;

  async function action(formData: FormData) {
    "use server";
    const file = formData.get("file");
    if (!file || !(file instanceof File)) return;
    const parsed = await parseResume(file);
    redirect(
      `/admin/ingest-resume?parsed=${encodeURIComponent(
        JSON.stringify(parsed)
      )}`
    );
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Ingest Resume</h1>
      <form
        action={action}
        method="POST"
        encType="multipart/form-data"
        className="mb-6 flex flex-col gap-4"
      >
        <input type="file" name="file" accept=".pdf,.doc,.docx" required />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload & Parse
        </button>
      </form>
      {parsed && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Extracted Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}
