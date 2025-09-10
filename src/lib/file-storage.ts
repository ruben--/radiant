import { promises as fs } from 'fs'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), '.storage')
const CONTENT_FILE = path.join(STORAGE_DIR, 'content.json')

interface ContentData {
  [key: string]: {
    value: string
    updatedAt: string
  }
}

async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

async function readContent(): Promise<ContentData> {
  try {
    await ensureStorageDir()
    const data = await fs.readFile(CONTENT_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

async function writeContent(data: ContentData): Promise<void> {
  await ensureStorageDir()
  await fs.writeFile(CONTENT_FILE, JSON.stringify(data, null, 2))
}

export async function getFileContent(key: string, defaultValue: string = ''): Promise<string> {
  const data = await readContent()
  return data[key]?.value || defaultValue
}

export async function setFileContent(key: string, value: string): Promise<void> {
  const data = await readContent()
  data[key] = {
    value,
    updatedAt: new Date().toISOString()
  }
  await writeContent(data)
}