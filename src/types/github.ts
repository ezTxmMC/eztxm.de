export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  fork: boolean
  archived: boolean
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

export interface GitHubOrganization {
  login: string
  id: number
  url: string
  repos_url: string
  avatar_url: string
  description: string | null
}

export type SortOption = 'stars' | 'updated' | 'name'
export type FilterLanguage = string | null

export interface RepositoryFilters {
  language: FilterLanguage
  sortBy: SortOption
  hideForked: boolean
}
