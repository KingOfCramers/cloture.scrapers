import readline from "readline";

export const askQuestion = (query: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans: any) => {
      rl.close();
      resolve(ans);
    })
  );
};
