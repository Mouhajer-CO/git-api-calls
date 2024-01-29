import { v4 as uuidv4 } from 'uuid';

import { FEATURE_BRANCH, BASE_BRANCH, OWNER, REPOS, LABEL, ASSIGNEE } from './config';
import { fetchCall } from './service';
import { GitHubRefs } from './type';

export const getRefsHead = async (): Promise<GitHubRefs | undefined> => {
    const url = `https://api.github.com/repos/${OWNER}/${REPOS}/git/refs/heads/main`;
    return await fetchCall(url);
}

export const createBranch = async () => {
    try {
        // Get the latest commit SHA from the default branch (e.g., 'main')
        const response = await getRefsHead();
        const latestCommitSHA = response?.object.sha;

        // Create a new branch using GitHub REST API
        const newBranch = `${FEATURE_BRANCH}-${uuidv4()}`
        const url = `https://api.github.com/repos/${OWNER}/${REPOS}/git/refs`;
        const body = { ref: `refs/heads/${newBranch}`, sha: latestCommitSHA }
        await fetchCall(url, body)

        return newBranch;
    } catch (error: any) {
        console.error('Error:', error);
    }
}

// export const createPullRequest = async (title: string, description: string) => {
//     try {
//         const newBranch = await createBranch();
//         const url = `https://api.github.com/repos/${OWNER}/${REPOS}/pulls`;
//         const body = { title, body: description, head: newBranch, base: BASE_BRANCH }
//         const response = await fetchCall(url, body)

//         return response;
//     } catch (error: any) {
//         console.error('Error:', error);
//     }
// }

export const createIssue = async (title: string, description: string) => {
    try {
        const url = `https://api.github.com/repos/${OWNER}/${REPOS}/issues`;
        const body = { title, body: description, assignees: [ASSIGNEE], labels: [LABEL] }
        const response = await fetchCall(url, body)

        return response;
    } catch (error: any) {
        console.error('Error:', error);
    }
}