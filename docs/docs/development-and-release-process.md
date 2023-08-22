# Development and Release Process

AWS Amplify provides a Git-based workflow for hosting serverless web apps with continous deployment. Amplify supports a [multi-environment feature](https://docs.amplify.aws/cli/teams/overview/) which leverages distinct Git branches for prod and dev. We maintain distinct dev and prod feature branches to use this feature. The release process is as follows:

1. `latest` contains the latest prod version. This will be renamed to a version number when the new prod version is released.
1. `main` is the core dev branch. Feature branches should be named descriptively. These will get merged into `main` before being cut into the prod release.
1. When a new prod version is cut, `latest` will be copied to a new branch `v{version_number}`. `main` will then be merged into `latest`.

## How to do a Prod Cut Step-by-Step

1. Switch to the `latest` branch. Do a `git pull` to ensure all your local changes are synced with remote.
1. From `latest`, switch to a new branch `v{version_number}`, where `{version_number}` is the version of the *previous* release. This essentially archives `latest` before we do this prod cut.
1. In GitHub, lock the `v{version_number}` branch to ensure it is never overwritten.
1. Run `git pull main` to ensure your local `main` branch is in sync with remote.
1. Again make sure you are on the `latest` branch. Run `git merge main` to merge `main` into `latest`. This is the prod cut.
1. Tag the merge in GitHub with `v{new_version_number}`, where `{new_version_number}` is the version of the *current* release.