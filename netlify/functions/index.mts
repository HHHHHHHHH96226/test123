import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
    return new Response(JSON.stringify({}), {
        status: 200,
        statusText: 'OK'
    });
}

export const config: Config = {
    path: "/"
};
