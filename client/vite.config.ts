import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import stringHash from 'string-hash';
import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint()],
  build: {},
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        if (name === 'theme-dark') return 'theme-dark';
        if (name === 'theme-light') return 'theme-light';
        const i = css.indexOf(`.${name}`);
        const lineNumber = css.substring(0, i).split(/[\r\n]/).length;
        const hash = stringHash(css).toString(36).substr(0, 5);

        return `_${name}_${hash}_${lineNumber}`;
      },
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
