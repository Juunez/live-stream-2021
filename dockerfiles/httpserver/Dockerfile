FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        python3 \
		git \
		wget

RUN cd /usr/local/src
RUN wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1UHfAbKu4WU9VKIcnbyDTfEPA4Rf4NDel' -O favicon.ico
RUN mkdir live-stream && \
	cd live-stream && \
	git init && \
	git pull https://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@github.com/Juunez/live-stream.git && \
	cd site

EXPOSE 8080

CMD ["python3", "-m", "http.server", "--directory", "live-stream/site", "8080"]