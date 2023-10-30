const { resolve, join } = require('path')

const { build } = require('esbuild')
const fastGlob = require('fast-glob')
const { replaceTscAliasPaths } = require('tsc-alias')

const BASE_PATH = resolve(__dirname, '.')

async function run() {
  await build({
    platform: 'node',
    outdir: 'dist',
    format: 'cjs',
    target: 'es2020',
    logLevel: 'info',
    tsconfig: 'tsconfig.json',
    absWorkingDir: BASE_PATH,
    minify: true,
    entryPoints: fastGlob.sync('src/**/*'),
    loader: {
      '.sql': 'copy',
      '.prisma': 'copy',
      '.toml': 'copy',
    },
  })

  await replaceTscAliasPaths({
    configFile: join(BASE_PATH, 'tsconfig.json'),
    outDir: 'dist',
    verbose: true,
  })
}

run()
