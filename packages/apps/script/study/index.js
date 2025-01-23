import {execSync} from 'child_process';
const dataInject = process.argv.slice(2); // Input data from command-line arguments

execSync(`node script/study/thanhlv-study-2024/index.js ${dataInject}`,{stdio: 'inherit'});
execSync(`node script/study/tieng-anh/index.js ${dataInject}`,{stdio: 'inherit'});
