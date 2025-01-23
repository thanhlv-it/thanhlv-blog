import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {fileURLToPath} from 'url'
// app.js
const dataInject = process.argv.slice(2); // Input data from command-line arguments
console.log('Injected Data:', dataInject);
// Do something with the data
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Đường dẫn đến thư mục chứa các trang markdown trong dự án VitePress của bạn
const PAGES_DIR = path.join(__dirname, '../src/blog');

// Hàm này sẽ đọc tất cả các file .md trong thư mục và trả về một mảng chứa title và path
function extractPagesData(dirPath) {
  let pagesData = [];

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    // Kiểm tra nếu là file .md
    if (path.extname(file) === '.md') {
      // Đọc nội dung file
      const fullPath = path.join(dirPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Phân tích cú pháp frontmatter để lấy title
      const {data} = matter(fileContents);
      if (!data.disableGenerateSidebar) {
        if(dataInject.includes("env:live")){
          if (data.draft) {
            return;
          }
        }
        let link = fullPath.replace(PAGES_DIR, '').replace(/\.md$/, '.html');
        link = "/blog" + link.replaceAll("\\", "/");
        link = link.replaceAll("//", "/");
        pagesData.push({
          text: data.title,
          date: data.date,
          link: link
        });
      }
    }
  });
  pagesData.sort((a, b) => new Date(b.date) - new Date(a.date))
  return pagesData;
}

// Hàm này ghi mảng của các object page data vào một file JSON
function exportPagesDataToFile(pagesData, outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(pagesData, null, 2), 'utf8');
}

// Sử dụng hàm
const pagesData = extractPagesData(PAGES_DIR);
const folderPath = path.join(__dirname, "/../.vitepress/cache/sidebar");
const pathExport = path.join(folderPath, 'blogs-sidebar.json');
exportPagesDataToFile(pagesData, pathExport);

console.log(`Exported pages data to ${pathExport}`);
