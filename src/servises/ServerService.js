import { delay } from '../utils/generalUtils.js';

const CONST_WELCOME = 'Welcome';
class ServerService {
  constructor(url) {
    this.url = url;
  }
  async requestTodos() {
    console.log(`serverService -> requestTodos`);
    const data = await fetch(`${this.url}/todos`, {
      method: 'GET',
    })
      .then((response) => {
        console.log(`serverService -> requestTodos: response.data = `, response);
        return response.ok ? response.json() : new Error('');
      })
      .catch((e) => {
        console.log(`serverService -> requestTodos:error = ${e}`);
        return [];
      });
    console.log(`serverService -> requestTodos: data =`, data);
    await delay(3000);
    return data;
  }
}

export default ServerService;
