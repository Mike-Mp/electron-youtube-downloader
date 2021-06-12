# electron-youtube-downloader

A desktop (Electron + React) youtube downloader that uses [node-ytdl-core](https://github.com/fent/node-ytdl-core) to download data and [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static#readme) to combine audio and video streams and write the data to disk.

Started this project using [this boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate 'electron-react-boilerplate').

Run with `yarn start`

To package with developer tools run `yarn run debugprod`.

Change `--linux` part of "package" script in the root package.json to `--win` to package for windows. The reason the src node modules folder gets deleted on packaging is so the correct ffmpeg binaries for the specified OS are downloaded.

The console will inform you whether node-ytdl-core needs updating.

This project is not yet completed.
