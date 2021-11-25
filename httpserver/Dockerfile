FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        python3 \
		git wget

RUN cd /usr/local/src
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1UHfAbKu4WU9VKIcnbyDTfEPA4Rf4NDel' -O favicon.ico
RUN git clone https://github.com/meetecho/janus-gateway.git
RUN cd janus-gateway/html

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080"]