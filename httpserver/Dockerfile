FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        python3 \
		wget \
		git && \
    apt-get clean && \

RUN git clone https://github.com/meetecho/janus-gateway.git &&\
    cd janus-gateway/html

CMD["python3", "-m", "http.server", "8080"]