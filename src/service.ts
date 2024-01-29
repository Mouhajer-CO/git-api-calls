import { GitHubRefs } from "type";
import { headers } from "./config";

export const fetchCall = async (url: string, body?: any): Promise<any> => {
    try {
        const response = (body)
            ? await fetch(url, { method: "POST", headers, body: JSON.stringify(body) })
            : await fetch(url, { headers });

        const result = await response.json();

        console.log("Success:", result);

        return result
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
    }
};