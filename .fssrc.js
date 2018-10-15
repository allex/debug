// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:

import { resolve } from 'path'
import babel from 'rollup-plugin-babel'

const { version, name, author, license, dependencies } = require('./package.json')

const banner = (name, short = false) => {
  let s;
  if (short) {
    s = `/*! ${name} v${version} | ${license} licensed | ${author} */`
  } else {
    s = `/*!
 * ${name} v${version}
 *
 * @author ${author}
 * Released under the ${license} license.
 */`
  }
  return s
}

export default {
  destDir: resolve(__dirname, './dist'),
  dependencies: Object.keys(dependencies).concat([ 'fs', 'path', 'events', 'module', 'util' ]),
  entry: [
    {
      input: 'src/browser.js',
      plugins: [ babel, 'resolve', 'commonjs' ],
      targets: [
        { format: 'es', file: 'debug.esm.js', banner: banner(name, true) },
        { format: 'umd', file: 'debug.js', name: 'debug', banner: banner(name) }
      ]
    }
  ]
}
