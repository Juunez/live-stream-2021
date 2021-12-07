This project was done as a course-assignment in Aalto University.

This is a two server structure for streaming your webcam live-feed to a WebRTC server(using Janus) which can then be viewed by multiply users live. The stream is also forwarded to a HLS server by Janus, where the RTP-stream is converted to HLS live stream. This HLS stream can be the viewed by viewes. The WebRTC server also contains the official Janus demo for video room.

To launch, type docker compose up --build in /docker.
streamer page is available at localhost:8080/streamer.html
viewer page is available at localhost:8080/viewer.html
To view a stream, the streamer must provide the unique 16-length number to any viewers. It will be unique each session.
HLS stream is available at http://localhost:8070/index.m3u8 .This can be viewed e.g. with VLC player or any HLS player

Problems:

If you stop publishing at streamer page, the hls stream stops working (ffmpeg gets stuck). To fix that, you must load localhost:8070/restartffmpeg once. This usually lowers HLS-stream fps until the HLS-stream is restarted completely. This does not affect the viewer page.

Streamer and viewer pages work independently of the hls server and don't need it.
You might have to change hostIP in streamer.js to the ip that the host system is from the perspective of the docker container, if it seems that hls stream does not work (hls server ports 5006 and 5008 don't receive any data when stream is on).

Also HLS stream breaks if multiple streamers attempt to stream at the same time. RTP stream works with multiple streamers(and viewers)
