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
