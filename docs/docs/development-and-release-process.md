# Development and Release Process

AWS Amplify provides a Git-based workflow for hosting serverless web apps with continous deployment. Amplify supports a [multi-environment feature](https://docs.amplify.aws/cli/teams/overview/) which leverages distinct Git branches for prod and dev. We maintain distinct dev and prod feature branches to use this feature. The release process is as follows:

1. `latest` contains the latest prod version. This will be renamed to a version number when the new prod version is released.
1. `main` is the core dev branch. Feature branches should be named descriptively. These will get merged into `main` before being cut into the prod release.
1. When a new prod version is cut, `latest` will be copied to a new branch `v{version_number}`. `main` will then be merged into `latest`.

## How to do a Prod Cut Step-by-Step

1. In GitHub, create a pull request for merging `main` into `latest`.
1. After it is approved, merge the change.
1. On the right-hand side, click on "Releases".
1. Click "Draft a new release" at the top.
1. Under "Choose a tag", type in `v{version_number}` where `{version_number}` is the version number for this new release.
1. Click the "Generate release notes" button to auto-generate release notes.
1. Click "Publish release". All done!
