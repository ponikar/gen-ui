#!/bin/bash

# Usage: ./db-seed.sh <folder-name>
# Example: ./db-seed.sh area

if [ -z "$1" ]; then
  echo "Error: Please provide a folder name"
  echo "Usage: ./db-seed.sh <folder-name>"
  echo "Example: ./db-seed.sh area"
  exit 1
fi

FOLDER_NAME=$1
FACTORY_PATH="src/server/db/factory/$FOLDER_NAME"

# Check if the folder exists
if [ ! -d "$FACTORY_PATH" ]; then
  echo "Error: Folder '$FACTORY_PATH' does not exist"
  exit 1
fi

# Check for index.ts first, then fall back to seed_*.ts
if [ -f "$FACTORY_PATH/index.ts" ]; then
  SCRIPT_PATH="$FACTORY_PATH/index.ts"
elif [ -f "$FACTORY_PATH/seed_$FOLDER_NAME.ts" ]; then
  SCRIPT_PATH="$FACTORY_PATH/seed_$FOLDER_NAME.ts"
else
  echo "Error: No index.ts or seed_$FOLDER_NAME.ts found in '$FACTORY_PATH'"
  exit 1
fi

echo "Running seed script: $SCRIPT_PATH"
bun run --env-file=.env "$SCRIPT_PATH"
