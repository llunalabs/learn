import fn from 'funclib'
import parser from 'dir-parser'

/**
 * Generate metadata based on a given path
 *
 * @params path - A given path
 */
export const directoryToMetadata = async (path: string) => {
  const directoryParser = await parser(path, {
    excludes: ['.git', 'node_modules', 'public', 'app'],
    getFiles: true,
    getChildren: true,
    dirTree: false,
    ignores: [],
    includes: [],
  })

  console.log(fn.pretty(directoryParser.children))
}

directoryToMetadata('projects')
