/** @type {import('vite').UserConfig} */
export default {
  base: "./",
  esbuild: {
    supported: {
      'top-level-await': true
    }
  }
}
