const fs = require('fs');
const transcriptPath = 'c:/Users/russe/.gemini/antigravity-ide/brain/70058e52-4e66-405a-9ff8-897b8df6ce87/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('TargetFile') && lines[i].includes('services.html')) {
    console.log('Found match at index:', i);
    try {
      const parsed = JSON.parse(lines[i]);
      console.log('Tool calls:', JSON.stringify(parsed.tool_calls, null, 2));
    } catch (e) {
      console.log('Snippet:', lines[i].slice(0, 1000));
    }
  }
}
