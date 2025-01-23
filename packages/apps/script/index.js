import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {fileURLToPath} from 'url'


const dataInject = process.argv.slice(2); // Input data from command-line arguments
console.log('Injected Data:', dataInject);

// tạo folder nếu chưa tồn tại
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folderPath = path.join(__dirname, "/../.vitepress/cache/sidebar");
if (!fs.existsSync(folderPath)) {
  // Tạo thư mục
  fs.mkdirSync(folderPath, { recursive: true }); // Option `recursive: true` đảm bảo rằng tất cả các thư mục cha sẽ được tạo nếu chúng chưa tồn tại
  console.log(`Folder "${folderPath}" has been created.`);
}
// End tạo folder nếu chưa tồn tại


execSync(`node script/blogs.js ${dataInject}`,{stdio: 'inherit'});
execSync(`node script/short-blog.js ${dataInject}`,{stdio: 'inherit'});
execSync(`node script/study/index.js ${dataInject}`,{stdio: 'inherit'});
