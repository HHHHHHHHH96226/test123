import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
    return new Response(null, {
        status: 204,
        statusText: 'No Content'
    });
}

export const config: Config = {
    path: "/generate_204"
};
