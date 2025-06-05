import { defineConfig } from "@umijs/max";
import { request as umiRequest } from '@umijs/max';

export const authorizedRequest = (url: string, options: any = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : ''
    };

    return umiRequest(url, { ...options, headers });
};


export default defineConfig({
  request: {},
  proxy: {
    '/api/': {
      'target': 'http://127.0.0.1:5294/',
      'changeOrigin': true,
      
    }
  },
  routes: [
    { path: "/Auth", component: "Auth" },
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/user", component: "user" },
    { path: "/Group", component: "Group" },
    //{ path: "/Auth", component: "Auth" },

    {
       path: "/user/:id",
       component:"user/$id"
    }
 
  ],

  npmClient: 'npm',
});
