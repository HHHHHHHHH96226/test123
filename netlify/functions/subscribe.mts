import type { Config, Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
    try {
        request.headers.set("Accept-Encoding", "gzip, deflate, br");
        request.headers.set("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1)AppleWebKit/532.2.2 (KHTML, like Gecko) Version/5.0.7 Safari/532.2.2");
        if (request.method !== "GET") {
            return new Response(JSON.stringify({
                code: 405,
                message: "Method Not Allowed"
            }), {
                status: 405,
                statusText: 'Method Not Allowed',
                headers: {
                    'Content-Type': 'application/json',
                    'Allow': 'GET'
                }
            });
        }
        let response: Response = await fetch("https://www.85la.com/internet-access", request);
        let body: string = await response.text();
        const current = new Date();
        let regex: RegExp = new RegExp(
            `<a\\s+href="(https://www\\.85la\\.com/\\d+\\.html)">\\s*` +
            `${current.getFullYear()}年${current.getMonth() + 1}月${current.getDate()}日 免费节点[^<]+<\\/a>`,
            'g'
        );
        // https://metacubex-subconverter-1.zeabur.app/sub?target=clash&url=https%3A%2F%2Fwww.85la.com%2Fwp-content%2Fuploads%2F2025%2F08%2F202508243615kmxj2q.yaml&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Full.ini&filename=85LA&emoji=true&list=false&tfo=false&scv=true&fdn=false&expand=true&sort=false&new_name=true
        // https://metacubex-subconverter-1.zeabur.app/sub?target=clash&url=https%3A%2F%2Fwww.85la.com%2Fwp-content%2Fuploads%2F2025%2F08%2F202508243615kmxj2q.yaml&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini&filename=85LA&emoji=true&list=false&tfo=false&scv=true&fdn=false&expand=true&sort=false&new_name=true
        let match: RegExpExecArray | RegExpMatchArray | null = regex.exec(body);
        if (!(match && match[1])) {
            throw new Error("Not Found 1000");
        }
        console.log(match[1])
        response = await fetch(match[1], request);
        body = await response.text();
        regex = /<div[^>]*style=[^>]*margin-bottom:\s*20px[^>]*>\s*<h3[^>]*>5\.\s*Clash\.Mihomo\s*订阅地址<\/h3>\s*<p[^>]*><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/p>\s*<\/div>/i;
        match = body.match(regex);
        if (!(match && match[1])) {
            throw new Error("Not Found 1001");
        }
        console.log(match[1])
        const subconverter = `https://metacubex-subconverter-1.zeabur.app/sub?target=clash&url=${encodeURI(match[1])}&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Full.ini&filename=85LA&emoji=true&list=false&tfo=false&scv=true&fdn=false&expand=true&sort=false&new_name=true`;
        console.log(subconverter)
        response = await fetch(subconverter, request);
        const headers = new Headers(response.headers);
        headers.set('profile-web-page-url', 'https://www.85la.com/internet-access');
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({
            code: 500,
            message: "Internal Server Error",
            info: error.message
        }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}

export const config: Config = {
    path: "/api/v1/client/subscribe"
};
