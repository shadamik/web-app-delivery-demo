#!/usr/bin/env bash
set -euo pipefail
# Only the deployment job runs this script, checked out from main.
if [[ "$DEPLOY_ENV" == "Preview" ]]; then
  [[ "$PR_NUMBER" =~ ^[0-9]+$ ]] || exit 1
  destination=".site-state/preview/pr-$PR_NUMBER"
else
  destination='.site-state'
fi
mkdir -p "$destination"
cp -a build-output/. "$destination/"
mkdir -p _site
rsync -a --exclude='.git' .site-state/ _site/
