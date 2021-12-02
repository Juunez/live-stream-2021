const http = require('http');
var static = require('node-static');
var url = require('url');
var fs = require('fs');

var file = new(static.Server)(__dirname);
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var cmd = 'ffmpeg';
var args = [
    "-analyzeduration", "300M",
    "-probesize", "300M",
    "-protocol_whitelist", "file,udp,rtp",
    "-i", "../sdp/test.sdp",
    "-profile:v", "baseline",
    "-level", "3.0",
    "-s", "640x360",
    "-start_number", "0",
    "-hls_time", "2",
    "-hls_list_size", "10",
    "-hls_delete_threshold", "10",
    "-hls_flags", "delete_segments",
    "-f", "hls", "hls/index.m3u8"
]

const hostname = '127.0.0.1';
const port = 8070;

//remove old streams, todo: remove old stream files after the stream has ended
{
    var proc = spawn("rm", ["-r", "/usr/local/src/live-stream/hls"]);
    proc.stdout.on('data', function(data) {
        console.log(data);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });
    proc.on('close', function() {
        {
            var proc = spawn("mkdir", ["/usr/local/src/live-stream/hls"]);
            proc.stdout.on('data', function(data) {
                console.log(data);
            });
            proc.stderr.setEncoding("utf8")
            proc.stderr.on('data', function(data) {
                console.log(data);
            });
            proc.on('close', function() {
                console.log('finished emptying hls');
            });
        }
    });
}


function runFfmpeg() {
    var proc = spawn(cmd, args);
    proc.stdout.on('data', function(data) {
        console.log(data);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });
    proc.on('close', function() {
        console.log('finished');
    });
  }

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var path = q.pathname
    if (path.startsWith("/hls")) {
        file.serve(req, res);
    } else if (path == "/ffmpeg") {
        runFfmpeg();
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("nothing here");
    }
}).listen(port);