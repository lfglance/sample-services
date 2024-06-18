FROM ubuntu:22.04 as builder

RUN apt update
RUN apt install build-essential git cmake make libcurl4-openssl-dev libcurlpp-dev -y
WORKDIR /srv
COPY main.cpp .
RUN g++ -std=c++11 -o fetcher main.cpp -lcurlpp -lcurl


FROM ubuntu:22.04

RUN apt update
RUN apt install libcurl4-openssl-dev libcurlpp-dev -y
RUN rm -rf /var/lib/apt/lists/*
COPY --from=builder /srv/fetcher /bin/fetcher
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "bash", "/entrypoint.sh" ]