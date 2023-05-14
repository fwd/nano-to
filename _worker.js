export default {
    async fetch(request) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
        };
     
        const API_URL = "https://examples.cloudflareworkers.com/demos/demoapi";

        const PROXY_ENDPOINT = "/.well-known2/";

        async function handleRequest(request) {
        let url = new URL(request.url);

        async function gatherResponse(res) {
          const { headers } = res;
          const contentType = headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            return JSON.stringify(await res.json());
          }
          return res.text();
        }

        const init = {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        };

        const _response = await fetch('https://nano.to/known.json', init);
        const results = await gatherResponse(_response);
        let name = url.searchParams.get('names');
            name = name ? name : ''

        return Response.json({ names: JSON.parse(results).filter(a => a.name.toLowerCase() === name.toLowerCase()) });
        
            // // Recreate the response so you can modify the headers
            // response = new Response(response.body, response);
            // // Set CORS headers
            response.headers.set("Access-Control-Allow-Origin", url.origin);
            // // Append to/Add Vary header so browser will cache response correctly
            // response.headers.append("Vary", "Origin");
            // return response;
        }

        async function handleOptions(request) {
            if (request.headers.get("Origin") !== null && request.headers.get("Access-Control-Request-Method") !== null && request.headers.get("Access-Control-Request-Headers") !== null) {
                // Handle CORS preflight requests.
                return new Response(null, {
                    headers: { ...corsHeaders,
                        "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
                    },
                });
            } else {
                // Handle standard OPTIONS request.
                return new Response(null, {
                    headers: {
                        Allow: "GET, HEAD, POST, OPTIONS",
                    },
                });
            }
        }
        
        const url = new URL(request.url);
        if (url.pathname.startsWith(PROXY_ENDPOINT)) {
            if (request.method === "OPTIONS") {
                // Handle CORS preflight requests
                return handleOptions(request);
            } else if (request.method === "GET" || request.method === "HEAD" || request.method === "POST") {
                // Handle requests to the API server
                return handleRequest(request);
            } else {
                return new Response(null, {
                    status: 405,
                    statusText: "Method Not Allowed",
                });
            }
        } else {
            // return rawHtmlResponse(DEMO_PAGE);
        }

    },
};