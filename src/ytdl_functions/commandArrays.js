export const audioAndVideoCommands = [
  // Remove ffmpeg's console spamming
  '-threads',
  '2',
  '-loglevel',
  '8',
  '-hide_banner',
  // Redirect/Enable progress messages
  '-progress',
  'pipe:3',
  // Set inputs
  // Map audio & video from streams
  '-i',
  'pipe:4',
  '-i',
  'pipe:5',
  '-map',
  '0:a',
  '-map',
  '1:v',
  // Keep encoding
  '-c:v',
  'copy',
  // Define output file
  '-y',
];

export const audioCommands = [
  // Remove ffmpeg's console spamming
  '-threads',
  '2',
  '-loglevel',
  '8',
  '-hide_banner',
  // Redirect/Enable progress messages
  '-progress',
  'pipe:3',
  // Set inputs
  // Map audio & video from streams
  '-i',
  'pipe:4',
  // '-map',
  // '0:a',
  // Keep encoding
  // '-c:a',
  // 'copy',
  // Define output file
  '-y',
];

export const videoCommands = [
  // Remove ffmpeg's console spamming
  '-threads',
  '2',
  '-loglevel',
  '8',
  '-hide_banner',
  // Redirect/Enable progress messages
  '-progress',
  'pipe:3',
  // Set inputs
  // Map audio & video from streams
  '-i',
  'pipe:4',
  '-map',
  '0:v',
  // Keep encoding
  '-c:v',
  'copy',
  // Define output file
  '-y',
];
