import fs from "fs";
import path from "path";

type RetrievedDocument = {
  source: string;
  content: string;
  score: number;
};

export async function retrieveRelevantDocuments(
  query: string
): Promise<RetrievedDocument[]> {
  const files = [
    "rabi.txt",
    "kharif.txt",
    "nmsa.txt",
  ];

  const results: RetrievedDocument[] = [];

  for (const file of files) {
    const text = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "knowledge",
        file
      ),
      "utf8"
    );

    const chunks: string[] = [];
      for (
        let i = 0;
        i < text.length;
        i += 1500
      ) {
        chunks.push(
          text.slice(i, i + 1500)
        );
      }

    for (const chunk of chunks) {
      let score = 0;

      const words = query
        .toLowerCase()
        .split(/\s+/);

      words.forEach((word) => {
        if (
          word.length > 2 &&
          chunk
            .toLowerCase()
            .includes(word)
        ) {
          score++;
        }
      });

      if (score > 0) {
        results.push({
          source: file,
          content: chunk,
          score,
        });
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}