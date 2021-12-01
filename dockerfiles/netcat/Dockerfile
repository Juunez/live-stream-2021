FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
	apt-get install -y \
        net-tools \
		netcat \
        tcpdump
ARG CACHEBUST=1
RUN echo "$CACHEBUST"

EXPOSE 5004/udp

CMD ["tcpdump", "-i", "lo", "udp", "port", "5004"]