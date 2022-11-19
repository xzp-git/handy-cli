#!/usr/bin/env node

const importLocal = require("import-local")

if (importLocal(__filename)) {
  require("npmlog").info("cli", "正在使用本地版本的 handy-cli")
} else {
  require("../lib/core")(process.argv.slice(2))
}
