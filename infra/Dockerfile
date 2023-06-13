# Adapted from https://docs.aws.amazon.com/cli/latest/userguide/getting-started-source-install.html#source-getting-started-install-workflows-alpine.

FROM python:alpine AS builder

ENV AWSCLI_VERSION=2.10.1

RUN apk add --no-cache \
    curl \
    make \
    cmake \
    gcc \
    g++ \
    libc-dev \
    libffi-dev \
    openssl-dev \
    && curl https://awscli.amazonaws.com/awscli-$AWSCLI_VERSION.tar.gz | tar -xz \
    && cd awscli-$AWSCLI_VERSION \
    && ./configure --prefix=/opt/aws-cli/ --with-download-deps \
    && make \
    && make install

FROM alpine:latest

RUN apk --no-cache add terraform=~1.4
# Download binary and checksum.
RUN wget https://github.com/snyk/driftctl/releases/latest/download/driftctl_linux_amd64 -O driftctl_linux_amd64 \
    # The checksum file contains multiple checksums, so extract the one for the file we downloaded.
    && wget https://github.com/snyk/driftctl/releases/latest/download/driftctl_SHA256SUMS -O - | grep driftctl_linux_amd64 > driftctl_SHA256SUM_linux_amd64 \
    # Verify checksum
    && sha256sum -c driftctl_SHA256SUM_linux_amd64 \
    && chmod +x driftctl_linux_amd64 \
    && mv driftctl_linux_amd64 /usr/local/bin/driftctl


WORKDIR /infra

COPY driftctl_profile.txt /root/.aws/config

COPY --from=builder /opt/aws-cli/ /opt/aws-cli/