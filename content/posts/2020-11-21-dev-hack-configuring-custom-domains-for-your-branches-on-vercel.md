---
title: '#DevHack: Configuring domains for your branches on Vercel'
slug: /devhack-configuring-domains-branches-vercel/
author: Elio Struyf
type: post
date: 2020-11-21T22:07:21.895Z
draft: false
tags:
  - Vercel
  - DevHack
categories: []
comments: true
---

To prepare my new online store's release for selling personalizable bike stickers called: [Pimp Your Own Bike](https://pimpyourownbike.com). I wanted to make sure that I could test out my website before merging it to the `main` branch. Using a predefined custom domain would be the easiest way.

{{< caption-new "/uploads/2020/11/vercel1.png" "Highlighting my environments"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAACMSURBVBXBOwrCUBBA0Tufp01Qm+zEDVi4KfdpZSWCNqYRBPOZGck5cjkfS0WJKqZIqoqViGACRFCi+O1zQkTIDOZ5oQhWmeBtA1WIJD6HodaYponfuFAIFFCCpUIlKorfxyuZRWuN8OCw35GAm/N4PjFTzBSP7YdhGOi6Dnfny4++73m9HnzrjaZCwh/fSEU0LRA/eAAAAABJRU5ErkJggg==" "1346" >}}

On Azure, I would typically use slots on the web app. Each slot defines the environment you are targeting, for instance, development. For PYOB I wanted to use Vercel. I love the simplicity of their service and UI. All of it works so nicely, and it comes with all of the functionalities I need.

## Environments and their variables

Vercel comes with three types of environments:

- Production: This refers to the branch you use for your production environment. For instance, `main`.
- Preview: This is your staging environment and refers to any other branch than the `main` branch.
- Development: This is intended for local development and allows each team member to easily copy the development variables to their machine.

In my scenario, that means that my `main` branch links to `production`. My `dev` and `staging` environments relate to the `preview` environment and their environment variables.

{{< caption-new "/uploads/2020/11/vercel4.jpg" "My domains and their branches"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAUACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7qvDEIa7uZjNc71hMioGt4oGWR7iPbPFa2tsbplLlw9w8gyEOzcpdvRxC9lRmuTDvnrOHMqCjOPKoS9ybnLlT2aSva/vWbRw0bTqxfNWXJSjJRdVuEubmXvRUY8zW927aLRWR22W9V/wC+B/jXnHcf/9k=" "1540" >}}

On Azure, it would mean that for each branch, I configure my environment variables separately. The documentation points out that you best prefix the variables when you want to use multiple staging environments.

{{< blockquote type="info" text="[Staging environment variables](https://vercel.com/knowledge/set-up-a-staging-environment-on-vercel#staging-environment-variables)" >}}

To be honest, this is not optimal when you have to maintain various branches. For most sites, this will be more than sufficient.

### System environment variables

Within the recently released UI improvements, the system environment variables are more comfortable to configure. Before, you had to configure each of the variables you wanted to use manually. Now you can automatically expose them all, but not only that, but you can also choose them from the dropdown list. That way, you do not have to go to the documentation.

{{< blockquote type="info" text="[System environment variables](https://vercel.com/docs/platform/environment-variables#system-environment-variables)" >}}

{{< caption-new "/uploads/2020/11/vercel5.jpg" "Adding environment variables"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAgACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7ptE0y3012jsItMRXlzOIdHvcSuFZUlkaW8e3jk2x7S/lEcBV2DaoprqlJRbfLfXRPbmtFSa2bSWvRbCT6NpySXNbTX0u2k+ibfqzsg8Q48u1GOMeTBxjt9ztUjP8A/9k=" "1525" >}}

## Configuring the custom URLs for each branch

When it comes to creating a unique URL for each branch, this is super simple in the Vercel UI. All you have to do is go to your project settings, and under domains, you can add a new domain. The domain can also be a subdomain like `dev.pimpyourownbike.com` (when your domain is already configured).

{{< caption-new "/uploads/2020/11/vercel2.jpg" "Adding dev sub-domain"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7x9GtbWC1ZYbaCFVnlCrFDHGqgHgAIoAAycAep9aAPwm8UfGD4tW/ibxFBB8UfiLBBBrurwwww+NvEscUMUeoXCRxRRpqapHHGihERAFRQFUAACgD/AP/Z" "1552" >}}

Once the domain is available, you can modify it to specify the Git branch. 

{{< caption-new "/uploads/2020/11/vercel3.jpg" "Specify the git branch for the domain"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAUACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7q/A3iseJfDmm+JDpyWZ1OCYm2+0m5lhW1uprREN2YIRIpFvvwLaIAvjB25OGFxEcVhqVdU5U3U5nyuoqiXLOUN1The/LfbTbXc9jP8olkWc43KniY4tYSVKPt1QeHdR1aFKvf2ft6/Io+15Lc8r8vNdX5V1H9sg8/Zjzz/rz/APGhW545/9k=" "1531" >}}

{{< blockquote type="info" text="Once you do a new push to your branch, it will automatically start the CI/CD for that branch." >}}

## How I used the environment variables

To easily spot which environment I am working/testing, I used the `VERCEL_GIT_COMMIT_REF`. This variable corresponds to the branch name and is used to show a different banner on each environment.

{{< caption-new "/uploads/2020/11/vercel6.jpg" "System Environment Variable"  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEACgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7stC/5Cer/APX1J/6NuKAN6gD/AP/Z" "1524" >}}

In code, it looks as follows:

```typescript
{
  (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF !== "main") && (
    <Alert key="dev-alert" bgClass="bg-purple-700" txtClass="text-white">
      <b className="capitalize">{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}!</b>
    </Alert>
  )
}
```

*Have fun configuring your environments*