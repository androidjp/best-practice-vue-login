import {Message} from 'iview';
import ajax from '../common/ajax.axios';

// 设置错误提示信息
ajax.setTipFn((tips) => {
  Message.error(tips);
});

export default {
  user: {
    register: ajax.create('/api/session/register'),
    login: ajax.create('/api/session/login'),
    session: ajax.query('/api'),
    token: ajax.query('/api/token'),
  },
  auth: {
    github: ajax.query('/api/auth/github'),
    getGithubUser: ajax.query('/api/auth/github/user'),
  },
};
