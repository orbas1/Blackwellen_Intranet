import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'INTRANET_');

  return {
    plugins: [react()],
    server: {
      port: Number(env.INTRANET_WEB_PORT ?? '5173'),
      host: '0.0.0.0'
    },
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  };
});
