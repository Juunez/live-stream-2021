FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        apt-transport-https \
        ca-certificates \
        libmicrohttpd-dev \
        libjansson-dev \
	    libssl-dev \
        libsofia-sip-ua-dev \
        libglib2.0-dev \
	    libopus-dev \
        libogg-dev \
        libcurl4-openssl-dev \
        liblua5.3-dev \
	    libconfig-dev \
        pkg-config \
        gengetopt \
        libtool \
        automake \
		build-essential \
		wget \
		git \
        libwebsockets-dev \ 
		libnanomsg-dev \
		librabbitmq-dev \
        libavutil-dev \
		libavformat-dev \
		libavcodec-dev \
		libusrsctp-dev \
        gtk-doc-tools \
		libwebsockets-dev \ 
		libnanomsg-dev \
		librabbitmq-dev && \
    apt-get clean && \
	rm -rf /var/lib/apt/lists/*

RUN update-ca-certificates

RUN cd /tmp && \
	wget https://github.com/cisco/libsrtp/archive/v2.4.2.tar.gz && \
	tar xfv v2.4.2.tar.gz && \
	cd libsrtp-2.4.2 && \
	./configure --prefix=/usr --enable-openssl && \
	make shared_library && \
	make install

RUN cd /tmp && \
	git clone https://gitlab.freedesktop.org/libnice/libnice && \
	cd libnice && \
	git checkout 0.1.17 && \
	./autogen.sh && \
	./configure --prefix=/usr && \
	make && \
	make install

RUN cd /usr/local/src && \
    git clone https://github.com/meetecho/janus-gateway.git && \
    cd janus-gateway && \
	./autogen.sh && \
	./configure --enable-post-processing --prefix=/usr/local && \
	make && \
	make install && \
	make configs

RUN apt-get install -y python3

#increase CACHEBUST by 1 if live-stream repo changes are needed here
ARG CACHEBUST=6
RUN echo "$CACHEBUST"

RUN cd /usr/local/src && \
	mkdir live-stream && \
	cd live-stream && \
	git init && \
	git pull https://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@github.com/Juunez/live-stream.git

ENV HOSTIP = ${DOCKER_GATEWAY_HOST:-host.docker.internal}

EXPOSE 8080
EXPOSE 8088

#run janus and http server at startup, requires docker run -it
RUN echo ${HOSTIP} >> /usr/local/src/live-stream/site/hostIp.txt && \
	/bin/echo -e \
	"#!/bin/bash\n\
/usr/local/bin/janus --log-file=/usr/local/bin/logs &\n\
python3 -m http.server --directory /usr/local/src/live-stream/site 8080 &\n\
/bin/bash"\
	 > /usr/local/bin/onstartup.sh && \
	chmod 777 /usr/local/bin/onstartup.sh
CMD /usr/local/bin/onstartup.sh