export const setupListeners = async (queue) => {
  queue.on("global:completed", (job, result) => {
    // Check that shit against MongoDB
    let parsed = JSON.parse(result);
    console.log(job);
    console.log(result);
  });
};
