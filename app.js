// Import ffmpeg.js
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });
let inputVideoFile;

// Helper: Simulate YouTube download (for demo, use sample video)
async function fetchSampleVideo() {
  const url = 'https://file-examples.com/storage/fe8b8ac17e3b8c3dbb2c6b7/2017/04/file_example_MP4_480_1_5MG.mp4';
  const res = await fetch(url);
  return new Uint8Array(await res.arrayBuffer());
}

document.getElementById('load-btn').addEventListener('click', async () => {
  const url = document.getElementById('video-url').value.trim();
  const inputVideo = document.getElementById('input-video');
  if (!url) {
    alert('Please paste a YouTube or video direct URL.');
    return;
  }
  // For demo: If it's YouTube, load sample video, else try direct link
  let videoBlob;
  try {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      videoBlob = new Blob([await fetchSampleVideo()], { type: 'video/mp4' });
      inputVideo.src = URL.createObjectURL(videoBlob);
      inputVideoFile = new Uint8Array(await videoBlob.arrayBuffer());
    } else {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Video not found or CORS issue.');
      videoBlob = await res.blob();
      inputVideo.src = URL.createObjectURL(videoBlob);
      inputVideoFile = new Uint8Array(await videoBlob.arrayBuffer());
    }
    document.getElementById('apply-btn').disabled = false;
  } catch (e) {
    alert('Failed to load video. Try a direct MP4 link or check CORS.');
    inputVideo.src = '';
    inputVideoFile = null;
    document.getElementById('apply-btn').disabled = true;
  }
});

// Poopism effect to FFmpeg filter mapping
function getFFmpegFilter(effects) {
  let filter = [];
  if (effects.includes('reverse')) filter.push('reverse');
  if (effects.includes('fast')) filter.push('setpts=PTS/1.5');
  if (effects.includes('slow')) filter.push('setpts=PTS/0.7');
  if (effects.includes('mirror')) filter.push('hflip');
  // Stutter: select short segment and loop
  // For demo, use select=between(t,0,1),loop
  return filter.join(',');
}
function getAudioFilter(effects) {
  let af = [];
  if (effects.includes('pitchup')) af.push('asetrate=44100*1.2,atempo=0.83');
  if (effects.includes('pitchdown')) af.push('asetrate=44100*0.8,atempo=1.25');
  if (effects.includes('fast')) af.push('atempo=1.5');
  if (effects.includes('slow')) af.push('atempo=0.7');
  // Stutter: a simple repeat for 1s
  return af.join(',');
}

document.getElementById('apply-btn').addEventListener('click', async () => {
  if (!inputVideoFile) {
    alert('No video loaded.');
    return;
  }
  const effects = Array.from(document.querySelectorAll('input[name=poopism]:checked')).map(e => e.value);

  document.getElementById('processing').style.display = 'block';
  const outputVideo = document.getElementById('output-video');
  const downloadLink = document.getElementById('download-link');
  outputVideo.src = '';
  downloadLink.style.display = 'none';

  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  ffmpeg.FS('writeFile', 'input.mp4', inputVideoFile);
  // Compose FFmpeg cmd
  let filter = getFFmpegFilter(effects);
  let afilter = getAudioFilter(effects);
  let ffmpegArgs = ['-i', 'input.mp4'];

  if (filter) {
    ffmpegArgs.push('-vf', filter);
  }
  if (afilter) {
    ffmpegArgs.push('-af', afilter);
  }
  // Stutter effect: trim and loop first second
  if (effects.includes('stutter')) {
    ffmpegArgs = [
      '-i', 'input.mp4',
      '-vf', 'trim=start=0:end=1,setpts=PTS-STARTPTS,loop=5:1:0',
      '-af', 'atrim=start=0:end=1,asetpts=PTS-STARTPTS,aloop=5:1:0'
    ];
  }
  ffmpegArgs.push('-preset', 'veryfast', '-movflags', 'faststart', '-y', 'output.mp4');

  try {
    await ffmpeg.run(...ffmpegArgs);
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
    outputVideo.src = URL.createObjectURL(videoBlob);
    downloadLink.href = outputVideo.src;
    downloadLink.style.display = 'inline-block';
    document.getElementById('processing').style.display = 'none';
  } catch (e) {
    alert('Processing failed: ' + e.message);
    document.getElementById('processing').style.display = 'none';
  }
});