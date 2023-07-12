# Adding a New AWS IAM User

We manage our AWS infrastructure in Terraform. Creating a new user with console access in Terraform requires a signing key to encrypt the password that will be generated for the user. A signing key is stored in `infra/public.pgp`.

Although you should not need to generate a new key, in case you do (e.g., if the original key becomes compromised), follow these steps:

1. Start a shell in the `infra` docker container, binding the directory to `/infra`: `docker run -it -v $(pwd):/infra infra /bin/sh`
1. In the container's shell, generate a new key: `gpg --batch --passphrase '' --quick-gen-key spelmanaws@spelman.edu default default`
1. Export the public key to a file which Terraform will use: `gpg --export --armor | head -n -2 | tail +3 > public.pgp`. The `head` and `tail` commands remove the header, checksum, and footer since Terraform does not expect these as part of the file.
1. Record the private key and store it in escrow. You can output the private key (with the necessary header, CRC checksum, and footer) by running `gpg --export-secret-key --armor`
    
    !!! warning

        It is not recommended to export the private key to a file. Treat this like a password.

After merging the PR adding the new user to `main`, check the list of [GitHub Actions](https://github.com/Spelman-College/spelman-dashboard/actions/) for a run of Terraform Apply. You will see a line like

```
{"@level":"info","@message":"Outputs: 1","@module":"terraform.ui","@timestamp":"2023-07-12T00:30:14.148988Z","outputs":{"newuser_password":{"sensitive":false,"type":"string","value":"ALongBase64EncodedString"}},"type":"outputs"}
```

The string in `value` (here, "ALongBase64EncodedString") is the encrypted password. We will now decrypt it to get the new user's generated password. To decrypt, follow these steps:

1. Start a shell in the `infra` docker container, binding the directory to `/infra`: `docker run -it -v $(pwd):/infra infra /bin/sh`
1. In the container's shell, import the secret key we stored in escrow earlier. Run `gpg --import`. This will now wait for input on stdin. Copy/paste the secret key (with headers and footers) into the terminal, press Enter, then press ++ctrl+d++. You should see a message saying one secret key was imported.
1. To decrypt the string, run `base64 -d | gpg --decrypt; echo`. This will again wait for input on stdin. Copy/paste the encrypted password from the Terraform output, press Enter, then press ++ctrl+d++. You will see output like the following:

    ```
    gpg: encrypted with cv25519 key, ID 6071A4529026850F, created 2023-07-12
          "spelmanaws@spelman.edu"
    thepasswordishere
    ```

    Store your new password securely and you're all set!