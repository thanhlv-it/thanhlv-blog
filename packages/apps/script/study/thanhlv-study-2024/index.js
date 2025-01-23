import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
// app.js
const dataInject = process.argv.slice(2) // Input data from command-line arguments
console.log('Injected Data:', dataInject)
// Do something with the data
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Đường dẫn đến thư mục chứa các trang markdown trong dự án VitePress của bạn
const PAGES_DIR = path.join(__dirname, '../../../src/study/thanhlv-study-2024')

// Hàm này sẽ đọc tất cả các file .md trong thư mục và trả về một mảng chứa title và path
function extractPagesData(dirPath) {
  let pagesData = []

  const files = fs.readdirSync(dirPath)

  files.forEach(file => {
    // Kiểm tra nếu là file .md
    if (path.extname(file) === '.md') {
      // Đọc nội dung file
      const fullPath = path.join(dirPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Phân tích cú pháp frontmatter để lấy title
      const { data } = matter(fileContents)
      if (!data.title) {
        return
      }
      if (dataInject.includes('env:live')) {
        if (data.draft) {
          return
        }
      }
      let link = fullPath.replace(PAGES_DIR, '').replace(/\.md$/, '.html')
      link = '/study/thanhlv-study-2024' + link.replaceAll('\\', '/')
      link = link.replaceAll('//', '/')

      if (data.group) {
        addPagesByGroup(pagesData, {
          text: data.title,
          date: data.date,
          link: link,
          group: data.group
        })
      }

    }
  })
  pagesData.sort((a, b) => new Date(a.date) - new Date(b.date))
  return pagesData
}

function addPagesByGroup(pagesData, obj) {
  const group = pagesData.find((data) => data.group === obj.group)
  if (!group) {
    pagesData.push(
      {
        text: obj.group,
        group: obj.group,
        date: obj.date,
        items: []
      }
    )
    return addPagesByGroup(pagesData, obj)
  }
  group.items.push(obj)
  group.items.sort((a, b) => new Date(a.date) - new Date(b.date))
  return pagesData
}

// Hàm này ghi mảng của các object page data vào một file JSON
function exportPagesDataToFile(pagesData, outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(pagesData, null, 2), 'utf8')
}

// Sử dụng hàm
const pagesData = extractPagesData(PAGES_DIR)
// tạo folder nếu chưa tồn tại
const folderPath = path.join(__dirname, '/../../../.vitepress/cache/sidebar/study')
if (!fs.existsSync(folderPath)) {
  // Tạo thư mục
  fs.mkdirSync(folderPath, { recursive: true }) // Option `recursive: true` đảm bảo rằng tất cả các thư mục cha sẽ được tạo nếu chúng chưa tồn tại
  console.log(`Folder "${folderPath}" has been created.`)
}
// End tạo folder nếu chưa tồn tại
const pathExport = path.join(folderPath, 'thanhlv-study-2024-sidebar.json')
exportPagesDataToFile(pagesData, pathExport)

console.log(`Exported pages data to ${pathExport}`)
