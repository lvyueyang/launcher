const typescript = require('@rollup/plugin-typescript');

module.exports = async () => {
  return {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        name: 'reactWindowLauncher',
        format: 'umd',
      },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          declaration: true,
          outDir: 'lib',
        },
      }),
    ],
    externals: ['react', 'react-dom', 'eventemitter3', 'nanoid'],
  };
};
