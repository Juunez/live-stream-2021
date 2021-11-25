FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        yasm \
		git \
		wget \
        make

RUN cd /usr/local/src && \
	git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg && \
	cd ffmpeg && \
	./configure && \
	make && \
    make install

EXPOSE 8070