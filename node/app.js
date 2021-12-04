const http = require('http');
var static = require('node-static');
var url = require('url');
var fs = require('fs');

var file = new(static.Server)("/usr/local/src/hls");
var spawn1 = require('child_process').spawn;
var spawn2 = require('child_process').spawn;
var cmd = '/root/bin/ffmpeg';
var args = [
    "-analyzeduration", "300M",
    "-probesize", "300M",
    "-protocol_whitelist", "file,udp,rtp",
    "-listen_timeout", "-1",
    "-i", "/usr/local/src/live-stream/sdp/test.sdp",
    "-profile:v", "baseline",
    "-level", "3.0",
    "-s", "640x480",
    "-start_number", "0",
    "-hls_time", "2",
    "-hls_list_size", "10",
    "-hls_delete_threshold", "10",
    "-hls_flags", "delete_segments",
    "-f", "hls", "/usr/local/src/hls/index.m3u8"
]


//const hostname = '127.0.0.1';
const port = 8070;

//remove old streams, todo: remove old stream files after the stream has ended
{
    var proc = spawn1("rm", ["-r", "/usr/local/src/hls"]);
    proc.stdout.on('data', function(data) {
        console.log(data);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });
    proc.on('close', function() {
        {
            var proc2 = spawn1("mkdir", ["/usr/local/src/hls"]);
            proc2.stdout.on('data', function(data) {
                console.log(data);
            });
            proc2.stderr.setEncoding("utf8")
            proc2.stderr.on('data', function(data) {
                console.log(data);
            });
            proc2.on('close', function() {
                console.log('finished emptying hls');
            });
        }
    });
}

function runFfmpeg() {
    var proc = spawn2(cmd, args);
    proc.stdout.on('data', function(data) {
        console.log(data);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });
    proc.on('close', function() {
        console.log('finished');
        runFfmpeg(); //restart ffmpeg, keep ffmpeg looking for stream forever
    });
}
//always run ffmpeg when server starts
runFfmpeg();

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var path = q.pathname
    if (path.startsWith("/index")) {
        file.serve(req, res);
    } else if(path.startsWith("/restartffmpeg")){
        runFfmpeg();
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("nothing here");
    }
}).listen(port);