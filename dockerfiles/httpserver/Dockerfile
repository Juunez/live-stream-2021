FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        python3 \
		git \
		wget

RUN cd /usr/local/src
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1UHfAbKu4WU9VKIcnbyDTfEPA4Rf4NDel' -O favicon.ico
RUN git clone https://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@github.com/Juunez/live-stream && \
	cd live-stream/site

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080"]