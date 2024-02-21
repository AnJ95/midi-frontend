import react from '@vitejs/plugin-react-swc'
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],
        base: "/midi-frontend/",
        envDir: "env/",
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    }
})