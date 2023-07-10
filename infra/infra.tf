terraform {
  cloud {
    organization = "spelmanaws"

    workspaces {
      name = "spelman-dashboard"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  assume_role {
    role_arn = "arn:aws:iam::410061848734:role/TerraformFullAccess"
  }
}

resource "aws_amplify_app" "spelman_dashboard_frontend" {
  name       = "spelman-dashboard-frontend"
  repository = "https://github.com/Spelman-College/spelman-dashboard"

  build_spec = <<-EOT
    version: 1
    applications:
      - frontend:
          phases:
            preBuild:
              commands:
                - npm ci
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: dist
            files:
              - '**/*'
          cache:
            paths:
              - node_modules/**/*
        appRoot: frontend
  EOT

  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  environment_variables = {
    AMPLIFY_DIFF_DEPLOY       = "false"
    AMPLIFY_MONOREPO_APP_ROOT = "frontend"
  }
}

resource "aws_amplify_branch" "latest" {
  app_id              = aws_amplify_app.spelman_dashboard_frontend.id
  branch_name         = "latest"
  display_name        = "latest"
  enable_auto_build   = "true"
  enable_basic_auth   = "false"
  enable_notification = "false"
  framework           = "Vue"
  stage               = "PRODUCTION"
}

resource "aws_amplify_branch" "main" {
  app_id              = aws_amplify_app.spelman_dashboard_frontend.id
  branch_name         = "main"
  display_name        = "main"
  enable_auto_build   = "true"
  enable_basic_auth   = "false"
  enable_notification = "false"
  framework           = "Vue"
  stage               = "DEVELOPMENT"
}

resource "aws_iam_access_key" "mattcs_cli" {
  user = "mattcs-cli"
}

resource "aws_iam_access_key" "terraform" {
  user = "terraform"
}

resource "aws_iam_group" "admins" {
  name = "Admins"
}

resource "aws_iam_group_membership" "admins" {
  name = "Admins"
  users = [
    aws_iam_user.amiers.name,
    aws_iam_user.cernst.name,
    aws_iam_user.kirkmcallister.name,
    aws_iam_user.chasecummings.name,
    aws_iam_user.mattcs.name,
    aws_iam_user.drumsound.name,
  ]
}

resource "aws_iam_group_policy_attachment" "admins_force_mfa" {
  group      = aws_iam_group.admins.name
  policy_arn = aws_iam_policy.force_mfa.arn
}

resource "aws_iam_group_policy_attachment" "admins_aws_account_management_full_access" {
  group      = aws_iam_group.admins.name
  policy_arn = "arn:aws:iam::aws:policy/AWSAccountManagementFullAccess"
}

resource "aws_iam_group_policy_attachment" "admins_administrator_access" {
  group      = aws_iam_group.admins.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_group_policy_attachment" "admins_billing" {
  group      = aws_iam_group.admins.name
  policy_arn = "arn:aws:iam::aws:policy/job-function/Billing"
}

resource "aws_iam_group" "terraform_full_permissions" {
  name = "TerraformFullPermissions"
}

resource "aws_iam_group_membership" "terraform_full_permissions" {
  name = "TerraformFullPermissions"
  users = [
    aws_iam_user.terraform.name
  ]
}

resource "aws_iam_policy" "force_mfa" {
  name        = "ForceMFA"
  description = "Blocks access to everything except account configuration when not signed in with MFA."
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "AllowViewAccountInfo",
        "Effect" : "Allow",
        "Action" : [
          "iam:GetAccountPasswordPolicy",
          "iam:ListVirtualMFADevices"
        ],
        "Resource" : "*"
      },
      {
        "Sid" : "AllowManageOwnPasswords",
        "Effect" : "Allow",
        "Action" : [
          "iam:ChangePassword",
          "iam:GetUser"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "AllowManageOwnAccessKeys",
        "Effect" : "Allow",
        "Action" : [
          "iam:CreateAccessKey",
          "iam:DeleteAccessKey",
          "iam:ListAccessKeys",
          "iam:UpdateAccessKey"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "AllowManageOwnSigningCertificates",
        "Effect" : "Allow",
        "Action" : [
          "iam:DeleteSigningCertificate",
          "iam:ListSigningCertificates",
          "iam:UpdateSigningCertificate",
          "iam:UploadSigningCertificate"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "AllowManageOwnSSHPublicKeys",
        "Effect" : "Allow",
        "Action" : [
          "iam:DeleteSSHPublicKey",
          "iam:GetSSHPublicKey",
          "iam:ListSSHPublicKeys",
          "iam:UpdateSSHPublicKey",
          "iam:UploadSSHPublicKey"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "AllowManageOwnGitCredentials",
        "Effect" : "Allow",
        "Action" : [
          "iam:CreateServiceSpecificCredential",
          "iam:DeleteServiceSpecificCredential",
          "iam:ListServiceSpecificCredentials",
          "iam:ResetServiceSpecificCredential",
          "iam:UpdateServiceSpecificCredential"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "AllowManageOwnVirtualMFADevice",
        "Effect" : "Allow",
        "Action" : [
          "iam:CreateVirtualMFADevice"
        ],
        "Resource" : "arn:aws:iam::*:mfa/*"
      },
      {
        "Sid" : "AllowManageOwnUserMFA",
        "Effect" : "Allow",
        "Action" : [
          "iam:DeactivateMFADevice",
          "iam:EnableMFADevice",
          "iam:ListMFADevices",
          "iam:ResyncMFADevice"
        ],
        "Resource" : "arn:aws:iam::*:user/$${aws:username}"
      },
      {
        "Sid" : "DenyAllExceptListedIfNoMFA",
        "Effect" : "Deny",
        "NotAction" : [
          "iam:CreateVirtualMFADevice",
          "iam:EnableMFADevice",
          "iam:GetUser",
          "iam:ListMFADevices",
          "iam:ListVirtualMFADevices",
          "iam:ResyncMFADevice",
          "sts:GetSessionToken"
        ],
        "Resource" : "*",
        "Condition" : {
          "BoolIfExists" : {
            "aws:MultiFactorAuthPresent" : "false"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "terraform_full_access" {
  name        = "TerraformFullAccess"
  description = "Full access required for terraform to create,destroy, and plan resources."
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "VisualEditor0",
        "Effect" : "Allow",
        "Action" : [
          "iam:*",
          "amplify:*"
        ],
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_iam_user" "spelmanaws" {
  name = "SpelmanAWS"
}

resource "aws_iam_user_policy_attachment" "spelmanaws_change_password" {
  user       = aws_iam_user.spelmanaws.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "amiers" {
  name = "amiers"
}

resource "aws_iam_user_policy_attachment" "amiers_change_password" {
  user       = aws_iam_user.amiers.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "cernst" {
  name = "cernst"
}

resource "aws_iam_user_policy_attachment" "cernst_change_password" {
  user       = aws_iam_user.cernst.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "chasecummings" {
  name = "chasecummings"
}

resource "aws_iam_user_policy_attachment" "chasecummings_change_password" {
  user       = aws_iam_user.chasecummings.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "kirkmcallister" {
  name = "kirkmcallister"
}

resource "aws_iam_user_policy_attachment" "kirkmcallister_change_password" {
  user       = aws_iam_user.kirkmcallister.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "mattcs" {
  name = "mattcs"
}

resource "aws_iam_user_policy_attachment" "mattcs_change_password" {
  user       = aws_iam_user.mattcs.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "mattcs_cli" {
  name = "mattcs-cli"

  tags = {
    AKIAV66MXICPDHM5UHCK = "Keys to assume roles for mattcs-cli"
  }
}

resource "aws_iam_user" "drumsound" {
  name = "drumsound"
}

resource "aws_iam_user_login_profile" "drumsound" {
  user = aws_iam_user.drumsound.name
  pgp_key = file("public.pgp")
}

output "drumsound_password" {
  value = aws_iam_user_login_profile.drumsound.encrypted_password
}

resource "aws_iam_user_policy_attachment" "drumsound_change_password" {
  user       = aws_iam_user.drumsound.name
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
}

resource "aws_iam_user" "terraform" {
  name = "terraform"

  tags = {
    AKIAV66MXICPLDOMYTAE = "Terraform CLI access"
  }
}

data "aws_iam_policy_document" "cli_assume_role" {
  statement {
    sid    = "Statement1"
    effect = "Allow"
    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::410061848734:user/terraform",
        "arn:aws:iam::410061848734:user/mattcs-cli"
      ]
    }
    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "budget_service_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["budgets.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "budget_service_role" {
  name               = "BudgetServiceRole"
  description        = "Allows Budgets to create and manage AWS resources on your behalf"
  assume_role_policy = data.aws_iam_policy_document.budget_service_role.json
}

resource "aws_iam_role" "read_only_access" {
  name               = "ReadOnlyAccess"
  description        = "ReadOnlyAccess used for driftctl command to determine drift between current infrastructure and Terraform state."
  assume_role_policy = data.aws_iam_policy_document.cli_assume_role.json
}

resource "aws_iam_role" "terraform_full_access" {
  name               = "TerraformFullAccess"
  description        = "Full access for Terraform to create, destroy, and plan resources."
  assume_role_policy = data.aws_iam_policy_document.cli_assume_role.json
}
