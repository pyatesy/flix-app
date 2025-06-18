#!/bin/bash

# Create necessary directories
mkdir -p public/assets/{img,css,js}

# Copy CSS files
cp -r "../Main files/assets/css/"* "public/assets/css/"

# Copy JS files
cp -r "../Main files/assets/js/"* "public/assets/js/"

# Copy image files
cp -r "../Main files/assets/img/"* "public/assets/img/"

echo "Assets copied successfully!" 