FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        python3 \
		git \
		wget

RUN cd /usr/local/src && \
	mkdir live-stream && \
	cd live-stream && \
	git init && \
	git pull https://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@github.com/Juunez/live-stream.git

EXPOSE 8080

CMD ["python3", "-m", "http.server", "--directory", "/usr/local/src/live-stream/site", "8080"]