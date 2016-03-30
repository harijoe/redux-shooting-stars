import axios from 'axios';
import parameters from '../../config/parameters';

export const apiClient = axios.create({
  baseURL: parameters.homeApiHost,
  timeout: 1000
});

export const githubClient = axios.create({
  baseURL: parameters.githubApiHost,
  timeout: 1000,
  headers: {'Authorization': 'token ' + parameters.githubApiToken}
});
