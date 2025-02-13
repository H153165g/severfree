#!/bin/bash

main() {
    exec nginx -g 'daemon off;'
}

main
