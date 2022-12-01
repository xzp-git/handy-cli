import log from "@handy-cli/utils/log"
import {LOWEST_NODE_VERSION, MESSAGE_PREFIX} from "./const"
import semver from "semver"
import colors from "colors"
import pkg  from "../package.json"


function core(_argv: string[]) {
  try {
    checkPkgVersion()
    checkNodeVersion()
  } catch (e) {
    log.error(MESSAGE_PREFIX, e.message)
  }
}





function checkNodeVersion() {
  const currentVersion = process.version
  const lowestVersion = LOWEST_NODE_VERSION

  if(!semver.gte(currentVersion, lowestVersion)){
    throw new Error(colors.red(`需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`))
  }

}



function checkPkgVersion() {
  log.info(MESSAGE_PREFIX, pkg.version)
}

export default core 
