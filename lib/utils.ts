import fs from 'fs'
import parser from 'dir-parser'

export interface RootProjectMetadata {}

/**
 * Generate metadata based on a given path
 *
 * @params path - A given path
 */
export const directoryParser = async (path: string) => {
  const directoryParser = await parser(path, {
    excludes: ['.git', 'node_modules', 'public', 'app'],
    getFiles: true,
    getChildren: true,
    dirTree: false,
    dirInfo: false,
    ignores: [],
    includes: [],
  })

  return directoryParser.children
}

/**
 * Write data to a JSON file
 * @param fileName - The name you want your file to be in.
 * @param filePath - The path you want to save your file in
 * @param data - The data you want to write into the file
 */
export const writeJson = (fileName: string, filePath: string, data: RootProjectMetadata) => {
  fs.writeFile(`${filePath}/${fileName}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

/**
 * Generate a metadata file to the projects directory
 */
export const createMetaDataFile = async () => {
  const PROJECTS_DIRECTORY_PATH = './projects'
  const data = await directoryParser(PROJECTS_DIRECTORY_PATH)
  writeJson('metadata', PROJECTS_DIRECTORY_PATH, data)
}

createMetaDataFile()
