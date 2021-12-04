# live-stream
httpserver Dockerfiles require token to my private github repo

to launch, type docker compose up --build in /docker.
streamer page is available at localhost:8080/streamer.html
viewer page is available at localhost:8080/viewer.html
HLS stream is available at http://localhost:8070/index.m3u8 .This can be viewed e.g. with VLC player or any HLS player

if you stop publishing at streamer page, the hls stream stops working (ffmpeg gets stuck). To fix that, you must restart the hls server. This does not affect the viewer page.

Streamer and viewer pages work independently of the hls server and don't need it.
You might have to change hostIP in streamer.js to the ip that the host system is from the perspective of the docker container, if it seems that hls stream does not work (hls server ports 5006 and 5008 don't receive any data when stream is on).

Also HLS stream breaks if multiple streamers attempt to stream at the same time. RTP stream works with multiple streamers(and viewers)