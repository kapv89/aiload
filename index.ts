import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import * as mm from 'micromatch'; // for exclusion logic

async function main() {
  // Input Arguments
  const patternsFile = process.argv[2];
  console.log(`reading patternsFile: ${patternsFile}`);
  const outputFile = 'output.txt';
  const repositoryRoot = process.cwd();

  // Load Patterns
  const allPatterns = fs
    .readFileSync(patternsFile, 'utf-8')
    .split('\n')
    .filter(line => line.trim() !== '');

  const includePatterns = allPatterns.filter(pattern => !pattern.startsWith('!'));
  const excludePatterns = allPatterns.filter(pattern => pattern.startsWith('!')).map(pattern => pattern.slice(1)); // Remove the '!'

  // Find Files (Modified)
  let allFiles: string[] = [];
  for (const pattern of includePatterns) {
    const files = await glob(pattern);
    allFiles.push(...files);
  }

  // Filter Out Excluded Files
  allFiles = allFiles.filter(file => !excludePatterns.some(pattern => mm.isMatch(file, pattern)));

  // Sort Files
  allFiles.sort();

  // Generate Output (Unchanged)
  const outputStream = fs.createWriteStream(outputFile);
  for (const filePath of allFiles) {
    const fullPath = path.join(repositoryRoot, filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    outputStream.write(`-------------------------------${filePath}\n`);
    outputStream.write(content);
    outputStream.write(`\n-------------------------------EOF\n`);
  }
  outputStream.end();
  console.log(`Output written to ${outputFile}`);
}

main().catch(err => console.error(err));
