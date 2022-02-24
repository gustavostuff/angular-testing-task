import { Bug } from './bug.model';

export interface GithubResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Bug[]
}