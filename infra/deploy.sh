#!/usr/bin/env bash
# Build the static Next.js site and deploy it to S3 + CloudFront.
#
# Usage:  infra/deploy.sh
# Env:    STACK_NAME (default about-me), AWS_REGION (default us-east-1),
#         AWS_PROFILE (optional, picked up by the AWS CLI)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STACK_NAME="${STACK_NAME:-about-me}"
export AWS_REGION="${AWS_REGION:-us-east-1}"

echo "==> Deploying stack ${STACK_NAME} in ${AWS_REGION}"
aws cloudformation deploy \
  --template-file "$ROOT/infra/template.yaml" \
  --stack-name "$STACK_NAME" \
  --no-fail-on-empty-changeset

output() {
  aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}
SITE_BUCKET="$(output SiteBucketName)"
DISTRIBUTION_ID="$(output DistributionId)"
SITE_URL="$(output SiteUrl)"

echo "==> Building static export"
npm --prefix "$ROOT/frontend" ci
rm -rf "$ROOT/frontend/out"
npm --prefix "$ROOT/frontend" run build

# Hashed assets never change, so cache them for a year; everything else is revalidated.
echo "==> Uploading to s3://${SITE_BUCKET}"
aws s3 sync "$ROOT/frontend/out/_next/static" "s3://${SITE_BUCKET}/_next/static" \
  --cache-control "public,max-age=31536000,immutable"
aws s3 sync "$ROOT/frontend/out" "s3://${SITE_BUCKET}" \
  --exclude "_next/static/*" \
  --cache-control "public,max-age=0,must-revalidate" \
  --delete

echo "==> Invalidating CloudFront ${DISTRIBUTION_ID}"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query "Invalidation.Id" --output text

echo "==> Done: ${SITE_URL}"
