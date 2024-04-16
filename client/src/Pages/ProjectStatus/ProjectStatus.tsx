import {
  NODE_ENV,
  VITE_API_URL,
  VITE_CLIENT_URL,
  VITE_USER_NODE_ENV,
  VITE_SHUAL_DOMAIN,
} from '@Utils/Environment';
import { version } from '../../../package.json';

const ProjectStatus = () => {
  return (
    <div style={{ padding: '20px', direction: 'ltr' }}>
      <div>CLIENT_APP_VERSION: {version}</div>
      <br />
      <div>NODE_ENV: {NODE_ENV}</div>
      <br />
      <div>VITE_USER_NODE_ENV: {VITE_USER_NODE_ENV}</div>
      <br />
      <div>VITE_API_URL: {VITE_API_URL}</div>
      <br />
      <div>VITE_CLIENT_URL: {VITE_CLIENT_URL}</div>
      <br />
      <div>VITE_SHUAL_DOMAIN: {VITE_SHUAL_DOMAIN}</div>
      <br />
    </div>
  );
};

export default ProjectStatus;
