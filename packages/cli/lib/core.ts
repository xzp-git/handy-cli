import { log, getNpmSemverVersion } from '@handy-cli/utils'
import colors from 'colors'
import minimist from 'minimist'
import { pathExistsSync } from 'path-exists'
import rootCheck from 'root-check'
import semver from 'semver'
import userHome from 'user-home'
import dotenv from 'dotenv'
import pkg from '../package.json'
import { LOWEST_NODE_VERSION, MESSAGE_PREFIX, DEFAULT_CLI_HOME } from './const'
import path from 'path'

async function core(_argv: string[]) {
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    await checkGlobalUpdate()
  } catch (e) {
    log.error(MESSAGE_PREFIX, e.message)
  }
}

async function checkGlobalUpdate() {
  const currentVersion = pkg.version
  const npmName = pkg.name
  const lastVersion = await getNpmSemverVersion(npmName, currentVersion)
  if (lastVersion && semver.gt(lastVersion, currentVersion)) {
    log.warn(
      MESSAGE_PREFIX,
      colors.yellow(`请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本：
    ${lastVersion}
                  更新命令：npm install -g ${npmName}
    `)
    )
  }
}

function checkEnv() {
  const dotenvPath = path.resolve(userHome, '.env')

  if (pathExistsSync(dotenvPath)) {
    dotenv.config({
      path: dotenvPath
    })
  }
  createDefaultConfig()
}

function createDefaultConfig() {
  const cliConfig: {
    home: string
    cliHome?: string
  } = {
    home: userHome
  }
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME)
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome
}

function checkInputArgs() {
  const args = minimist(process.argv.slice(2))
  checkArgs(args)
}

function checkArgs(args: minimist.ParsedArgs) {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL
}

function checkUserHome() {
  if (!userHome || !pathExistsSync(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'))
  }
}

function checkRoot() {
  rootCheck()
}

function checkNodeVersion() {
  const currentVersion = process.version
  const lowestVersion = LOWEST_NODE_VERSION

  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(colors.red(`需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`))
  }
}

function checkPkgVersion() {
  log.info(MESSAGE_PREFIX, pkg.version)
}

export default core
