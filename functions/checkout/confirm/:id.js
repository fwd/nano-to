export async function onRequest(ctx) {

  // POST: https://nano.to/api
  const response = Response.json({ error: 404, message: "Payment not found." });

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Headers", "*")
  response.headers.set("Access-Control-Allow-Methods", "HEAD,POST,OPTIONS")

  return response;

}
