#ARG GO_VERSION=1.15
#ARG NODE_VERSION=14.15.2

# Build Next
#FROM node:${NODE_VERSION}-alpine AS node-builder
FROM node:12-buster-slim as nodebuilder
WORKDIR /app
COPY web/package.json web/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY web/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn run export

# Build Go
FROM golang:1.15-buster as go-builder

WORKDIR /app
COPY go.* ./
RUN go mod download

COPY main.go main.go
COPY cmd ./cmd
COPY pkg ./pkg
COPY --from=nodebuilder /app/dist ./web/dist
RUN go generate
RUN go build -mod=readonly -v -o server

FROM debian:buster-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy the binary to the production image from the builder stage.
COPY --from=go-builder /app/server /app/server

# Run the web service on container startup.
CMD ["/app/server"]

# もしくはマルチステージは
#FROM gcr.io/distroless/base
 #COPY --from=gobuilder /go/bin/app /
 #CMD ["/app"]

#
#ARG GO_VERSION=1.15
#ARG CGO_ENABLED=1
#
#FROM golang:${GO_VERSION}-alpine AS go-builder
#WORKDIR /app
#RUN apk add --no-cache build-base
#COPY go.mod go.sum ./
#RUN go mod download
#COPY cmd ./cmd
#COPY pkg ./pkg
#RUN rm -f cmd/hetty/rice-box.go
#RUN go build ./cmd/hetty
#
#FROM node:${NODE_VERSION}-alpine AS node-builder
#WORKDIR /app
#COPY admin/package.json admin/yarn.lock ./
#RUN yarn install --frozen-lockfile
#COPY admin/ .
#ENV NEXT_TELEMETRY_DISABLED=1
#RUN yarn run export
#
#FROM alpine:3.12
#WORKDIR /app
#COPY --from=go-builder /app/hetty .
#COPY --from=node-builder /app/dist admin
#
#ENTRYPOINT ["./hetty", "-adminPath=./admin"]
#
#EXPOSE 8080
