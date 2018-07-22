#!/usr/bin/env bash

if [ -d "node_modules" ] || [ -d "dist" ]; then
  echo "Removing existing files..."
  rm -rv node_modules dist --force
fi

echo "Creating file directories..." && \
mkdir dist && \

printf "\nInstalling packages...\n" && \
yarn install && \

printf "All done...\n"
