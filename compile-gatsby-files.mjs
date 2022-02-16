import { Parcel } from "@parcel/core"
import SegfaultHandler from "segfault-handler"

const COMPILED_CACHE_DIR = `.cache/compiled`

SegfaultHandler.registerHandler(`crash-${new Date().toISOString()}.log`)

function constructBundler(dir) {
  return new Parcel({
    entries: [`${dir}/gatsby-+(node|config).{ts,tsx,js}`, `${dir}/plugins/gatsby-local-plugin/gatsby-+(node|config).{ts,tsx,js}`],
    defaultConfig: `gatsby-parcel-config`,
    // mode: `production`,
    logLevel: `verbose`, // Added for this repro
    targets: {
      root: {
        distDir: `${dir}/${COMPILED_CACHE_DIR}`,
        outputFormat: `commonjs`,
        includeNodeModules: false,
        sourceMap: false,
        engines: {
          node: `>= 14.15.0`,
        },
      },
    },
    cacheDir: `${dir}/.cache/.parcel-cache`,
  })
}

/**
 * Compiles known gatsby-* files (e.g. `gatsby-config`, `gatsby-node`)
 * and stores them in `.cache/compiled` relative to the site root.
 */
async function compileGatsbyFiles(dir) {
  const bundler = constructBundler(dir)

  try {
    const { bundleGraph, buildTime } = await bundler.run()
    const bundles = bundleGraph.getBundles()
    console.log(`Built gatsby files (${bundles.length}) in ${buildTime}ms`)
  } catch (error) {
    console.error(error.diagnostics)
  }
}

await compileGatsbyFiles(process.cwd())