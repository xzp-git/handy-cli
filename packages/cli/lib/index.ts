import importLocal from 'import-local'
import { log } from '@handy-cli/utils'
import { fileURLToPath } from 'url'
import core from './core.js'
import { MESSAGE_PREFIX } from './const'

function cli() {
  const filename = fileURLToPath(import.meta.url)
  if (importLocal(filename)) {
    log.info(MESSAGE_PREFIX, '正在使用本地版本的 handy-cli')
  } else {
    core(process.argv.slice(2))
  }
}

export default cli
