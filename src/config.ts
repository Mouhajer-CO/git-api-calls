export const GITHUB_KEY = process.env.GITHUB_KEY_NEW;
export const headers = {
    'Authorization': `Bearer ${GITHUB_KEY}`,
    'Content-Type': 'application/json'
};

// Replace these values with your GitHub credentials and repository information
export const OWNER = 'xyz';
export const LABEL = "terraform"
export const ASSIGNEE = "xyz"

export const REPOS = 'test1';
export const BASE_BRANCH = 'main';
// export const TARGET_BRANCH = "development";
export const FEATURE_BRANCH = 'feature/app-generated-branch';
