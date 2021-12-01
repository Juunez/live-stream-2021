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
		librabbitmq-dev \
        autoconf \
		cmake \
		nano \
		git-core \
		libass-dev \
		libfreetype6-dev \
		libgnutls28-dev \
		libmp3lame-dev \
		libsdl2-dev \
		libva-dev \
		libvdpau-dev \
		libvorbis-dev \
		libxcb1-dev \
		libxcb-shm0-dev \
		libxcb-xfixes0-dev \
		meson \
		ninja-build \
		texinfo \
		yasm \
		zlib1g-dev \
        nasm \
		libunistring-dev && \
    apt-get clean && \
	rm -rf /var/lib/apt/lists/*

RUN update-ca-certificates

#janus

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

COPY . /usr/local/src

RUN cd /usr/local/src && \
    git clone https://github.com/meetecho/janus-gateway.git && \
    cd janus-gateway && \
	./autogen.sh && \
	./configure --enable-post-processing --prefix=/usr/local && \
	make && \
	make install && \
	make configs

#ffmpeg

RUN mkdir -p ~/ffmpeg_sources ~/bin

RUN cd ~/ffmpeg_sources && \
	git -C x264 pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/x264.git && \
	cd x264 && \
	PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static --enable-pic && \
	PATH="$HOME/bin:$PATH" make && \
	make install

RUN apt-get install -y libnuma-dev && \
	cd ~/ffmpeg_sources && \
	wget -O x265.tar.bz2 https://bitbucket.org/multicoreware/x265_git/get/master.tar.bz2 && \
	tar xjvf x265.tar.bz2 && \
	cd multicoreware*/build/linux && \
	PATH="$HOME/bin:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$HOME/ffmpeg_build" -DENABLE_SHARED=off ../../source && \
	PATH="$HOME/bin:$PATH" make && \
	make install

RUN cd ~/ffmpeg_sources && \
	git -C libvpx pull 2> /dev/null || git clone --depth 1 https://chromium.googlesource.com/webm/libvpx.git && \
	cd libvpx && \
	PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --disable-examples --disable-unit-tests --enable-vp9-highbitdepth --as=yasm && \
	PATH="$HOME/bin:$PATH" make && \
	make install

RUN cd ~/ffmpeg_sources && \
	git -C fdk-aac pull 2> /dev/null || git clone --depth 1 https://github.com/mstorsjo/fdk-aac && \
	cd fdk-aac && \
	autoreconf -fiv && \
	./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
	make && \
	make install

RUN cd ~/ffmpeg_sources && \
	git -C opus pull 2> /dev/null || git clone --depth 1 https://github.com/xiph/opus.git && \
	cd opus && \
	./autogen.sh && \
	./configure --prefix="$HOME/ffmpeg_build" --disable-shared && \
	make && \
	make install

RUN cd ~/ffmpeg_sources && \
	git -C SVT-AV1 pull 2> /dev/null || git clone https://gitlab.com/AOMediaCodec/SVT-AV1.git && \
	mkdir -p SVT-AV1/build && \
	cd SVT-AV1/build && \
	PATH="$HOME/bin:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$HOME/ffmpeg_build" -DCMAKE_BUILD_TYPE=Release -DBUILD_DEC=OFF -DBUILD_SHARED_LIBS=OFF .. && \
	PATH="$HOME/bin:$PATH" make && \
	make install

RUN cd ~/ffmpeg_sources && \
	git -C dav1d pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/dav1d.git && \
	mkdir -p dav1d/build && \
	cd dav1d/build && \
	meson setup -Denable_tools=false -Denable_tests=false --default-library=static .. --prefix "$HOME/ffmpeg_build" --libdir="$HOME/ffmpeg_build/lib" && \
	ninja && \
	ninja install

RUN cd ~/ffmpeg_sources && \
	wget https://github.com/Netflix/vmaf/archive/v2.1.1.tar.gz && \
	tar xvf v2.1.1.tar.gz && \
	mkdir -p vmaf-2.1.1/libvmaf/build &&\
	cd vmaf-2.1.1/libvmaf/build && \
	meson setup -Denable_tests=false -Denable_docs=false --buildtype=release --default-library=static .. --prefix "$HOME/ffmpeg_build" --bindir="$HOME/ffmpeg_build/bin" --libdir="$HOME/ffmpeg_build/lib" && \
	ninja && \
	ninja install

RUN cd ~/ffmpeg_sources && \
	wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
	tar xjvf ffmpeg-snapshot.tar.bz2 && \
	cd ffmpeg && \
	PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
	--prefix="$HOME/ffmpeg_build" \
	--pkg-config-flags="--static" \
	--extra-cflags="-I$HOME/ffmpeg_build/include" \
	--extra-ldflags="-L$HOME/ffmpeg_build/lib" \
	--extra-libs="-lpthread -lm" \
	--ld="g++" \
	--bindir="$HOME/bin" \
	--enable-gpl \
	--enable-gnutls \
	#--enable-libaom \
	--enable-libass \
	--enable-libfdk-aac \
	--enable-libfreetype \
	--enable-libmp3lame \
	--enable-libopus \
	--enable-libsvtav1 \
	--enable-libdav1d \
	--enable-libvorbis \
	--enable-libvpx \
	--enable-libx264 \
	--enable-libx265 \
	--enable-nonfree && \
	PATH="$HOME/bin:$PATH" make && \
	make install && \
	hash -r

EXPOSE 8088

CMD ["/usr/local/bin/janus", "--log-file=/usr/local/bin/logs"]