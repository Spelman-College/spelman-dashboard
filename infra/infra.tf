terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

assume_role {
  role_arn = "arn:aws:iam::410061848734:role/TerraformFullAccess"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.spelman-dashboard.frontend

  index_document {
    suffix = "index.html"
  }
}
