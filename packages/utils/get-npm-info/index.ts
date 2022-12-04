import axios, { AxiosResponse, AxiosError } from 'axios'
import urlJoin from 'url-join'
import semver from 'semver'

function getNpmInfo(npmName: string, registry?: string) {
  if (!npmName) {
    return null
  }

  const registryUrl = registry || getDefaultRegistry()

  const npmInfoUrl = urlJoin(registryUrl, npmName)

  return axios
    .get(npmInfoUrl)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data
      }
      return null
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err)
    })
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npmmirror.com/'
}

async function getNpmVersions(npmName: string, registry?: string) {
  const data = await getNpmInfo(npmName, registry)
  if (data) {
    return Object.keys(data.versions)
  } else {
    return []
  }
}

function getSemverVersions(baseVersion: string, versions: string[]) {
  // satisfies 判断 每一项的版本号 是否大于 `^${baseVersion}`  ^代表 大于
  versions = versions
    .filter((version) => semver.satisfies(version, `^${baseVersion}`))
    .sort((a: string, b: string) => Number(semver.gt(b, a)))
  return versions
}

async function getNpmSemverVersion(npmName: string, baseVersion: string, registry?: string) {
  const versions = await getNpmVersions(npmName, registry)
  const newVersions = getSemverVersions(baseVersion, versions)
  if (newVersions && newVersions.length > 0) {
    return newVersions[0]
  }
  return undefined
}

export { getNpmSemverVersion }
