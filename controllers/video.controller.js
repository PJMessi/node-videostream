const fs = require('fs');
const path = require('path');

module.exports.streamVideo = (request, response) => {
  const filepath = path.join(__dirname, '../public/speeddate.mp4');
  const fileSize = fs.statSync(filepath).size;

  // default chunk size if ranges is not provided in headers.
  const CHUNK_SIZE = 10 ** 6; // 1 MB.

  const { range } = request.headers; // bytes=4262148- OR bytes=4262148-5262148
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-'); // [] OR [4262148] OR [4262148, 5262148]

    const startByte = (parts[0] && parseInt(parts[0], 10)) || 0;
    const endByte = (parts[1] && parseInt(parts[1], 10))
        || Math.min(startByte + CHUNK_SIZE, fileSize - 1);

    const chunksize = endByte - startByte + 1;
    const readStream = fs.createReadStream(filepath, { start: startByte, end: endByte });
    const headers = {
      'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(206, headers);
    readStream.pipe(response);
  } else {
    // if range not given, sendByteing entire video at once.
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(200, headers);
    fs.createReadStream(filepath).pipe(response);
  }
};
