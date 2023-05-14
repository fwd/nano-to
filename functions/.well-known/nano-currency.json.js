export default {
  async fetch(request, env, ctx) {
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      }
      return response.text();
    }
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    const url = new URL(request.url);
    const response = await fetch('https://nano.to/known.json', init);
    const results = await gatherResponse(response);
    const name = url.searchParams.get('names');
    return new Response(JSON.stringify({ names: JSON.parse(results).filter(a => a.name.toLowerCase() === name.toLowerCase()) }), init);
  },
};