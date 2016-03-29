import axios from 'axios';
import parameters from '../../config/parameters';

let client = {
  apiCLient: axios.create({
    baseURL: parameters.homeApiHost,
    timeout: 1000
  }),
  githubCLient: axios.create({
    baseURL: parameters.githubApiHost,
    timeout: 1000,
    headers: {'Authorization': 'token ' + parameters.githubApiToken}
  })
};

export default client;
