---
title: Adding guests to an Office 365 Group via the Microsoft Graph API
author: Elio Struyf
type: post
date: 2017-01-20T08:57:35+00:00
slug: /adding-guests-to-an-office-365-group-via-the-microsoft-graph-api/
dsq_thread_id:
  - 5478186622
categories:
  - Microsoft Graph
  - Office 365
tags:
  - Guest users
  - Office 365 Groups
comments: true
---

In one of my previous posts I explained how you can retrieve external / guest users via the Microsoft Graph API. Last week someone asked me if I knew how you can add guest users to an Office 365 Group via the Microsoft Graph API. As this was also a requirement for one of my projects, I did some digging to find a way to make this possible. It was not as straightforward as I thought, but the good news is that it is possible. This article describes in detail how you can achieve it.

> **Related article**: [Retrieving external / guest users via the Microsoft Graph API](https://www.eliostruyf.com/retrieving-external-guest-users-via-the-microsoft-graph-api/)


## Azure AD user creation

Before you can add a guest user to an Office 365 Group. The user itself must be known in your Azure AD. You might ask yourself, why? The answer is rather simple. The add member to group API endpoint requires that you specify a directoryObject, user or group object. That is why you first should create the user in Azure AD. Once that is done, you can add it to the group.

The add member to group API requires the following request body:

```javascript
{
    "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/{ID}`
}
```


> **Add member documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members)

When you manually invite a guest to an Office 365 Group, it will also create an Azure AD user object. The **user type** property for the user is set to **guest**. Most importantly, the **mail** property gets set to the email address of the user.

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest1.png" "Guest user information"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAAA9klEQVR4nFWQS2vEMAyE/Zv7Nwu9FbqUwpLHdhPn4TiOLcmSVezSQz900GWGmTGHOwBRVUWEiMp/DCHmnFWViCZrz/M8Gs45ADApRkRqai4IhJAaMcacs2HOIlLVUl43XIG1CEulmRNlZlVdUF7ew5urf/k7U7WlqCqLfG3ehQsAMqIN6XO7THw+87rqeZK137ePx+PR98MwjsM4PmdryB/lCgoA+3a/3fphmOd537d1WVpyxIS13BlCPwx9113X9TtDjXbFmACY5beAqDJzbjCzSd5TCIooKYH36D2malcD5mxomnCa1Lls7X6/h647l8W37QDgB8PQWOydUsOnAAAAAElFTkSuQmCC" "375" "436" >}}

The first thing that popped into my mind was to create the user via the users' endpoint. Whatever I tried with the users' endpoint, this property always kept blank.

I also checked out to the graph.windows.net API. This API gave me a bit more information about the user. For instance, when I retrieved a guest user, I saw an interesting property: **creationType**. For my members, this was **null**. Guest users had another value: **Invitation**.

Here an example for a member:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest2.png" "Creation type of a member"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAqklEQVR4nCXJW66DIBAAUJbSWhUEecjAMLysmHb/W7ppbnL+DksJRmujt9H7feWW4T5pdPyMevXEpFwqYMGIdADoH787J73fteZsUzPFkDEk8v0keyi1r8ZKrbl1knExBW875YtqSQQpQjCYjhCtNuLX4MyJucUEzlAOpcTaEmXwoNnCH97qN5WMwTop1cLFJLYXF9MmZ7aIR6jq/tD1xfy1e5jX9cnF9O8PIuEpFTuGqUwAAAAASUVORK5CYII=" "336" "238" >}}

Here an example for a guest:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest3.png" "Creation type of a guest"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAkklEQVR4nC3MWQ6DIBQAQG5itZV9x7I8MAKJ979Sk8bvSQYpSVvKvdYBDVJyKVonnJfacGM5EhJnH1qIxYdgdEz+ukAo8tkXTF5ICDxiu89eY7RWHl+rNMNkJXQjdEOUvXuGXmqDdETN+IbpQvn7YebWMnXpFqbzdYfB2i1UXjH5M+f7hHOWdqY8znoEbTzH9Ml/kK4iDUx46MwAAAAASUVORK5CYII=" "285" "185" >}}

I also tried to use this property in my creation process with the value set to **Invitation**, but this returned an error that told me I had insufficient privileges to perform the operation. As I was about to conclude that this functionality is not yet supported I found the **invitation manager** API endpoint in the Microsoft Graph documentation.

> **Invitation manager documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/invitation](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/invitation)

The invitation manager endpoint allows you to create an invite to add external users to your organisation. At this moment, the endpoint is still in beta.


The endpoint itself is very useful for creating guest / external users. It contains a couple of useful properties like an invitation message, redirect URL, and more. This allows you to add link to a documentation page where the guest can read more about the sign-in process.


{{< caption-new "/uploads/2017/01/012017_0840_Addingguest4.png" "Invitation mail"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAs0lEQVR4nCXBTQuCMBgA4P3/e4duHcVYFkZgpq2wTtHHISorI5VMhOZ8N2sTJaLnQf3lqrPYTF1nTsiMEOK69tiybduyLM/zUJQ8g8fzHoZbP9iczuujvzvfwiiOoyhJEiQ4LznnoqTwFmXzkU1VN3VdA4AQAuU5o5QWDHKW7ePW4dFmRVYwoJQyxpD6k1UBr0uqX1MM8FKqklIqpZBpmsZPD2M86I1xd6Rpmq7rw6HhOJMv6weZPUbgWnUAAAAASUVORK5CYII=" "624" "376" >}}

Here you can see the code I used to create the guest user on my environment:


```javascript
/* INVITE A USER TO YOUR TENANT */
var options = {
    method: 'POST',
    url: 'https://graph.microsoft.com/beta/invitations',
    headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
    },
    body: JSON.stringify({
    	"invitedUserDisplayName": "Elio Struyf"
        "invitedUserEmailAddress": "mail@address.be",
        "inviteRedirectUrl": "https://tenant.sharepoint.com/",
        "sendInvitationMessage": true,
        "invitedUserMessageInfo": {
            "customizedMessageBody": "Hi Elio, you can find more information here: https://www.eliostruyf.com"
        }
    })
};

request(options, (error, response, body) => {
    console.log(body);
    if (!error && response.statusCode == 201) {
        var result = JSON.parse(body);
        for (var key in result) {
            console.log(`${key}: ${JSON.stringify(result[key])}`);
        }
    }
});
```


> **Info**: The code above will send out the email. If this is not a requirement, you can also turn it off by setting the **sendInvitationMessage** property to false.

When you check the user object which gets created after calling the API endpoint, you can see that it will correctly fill in the mail property.

> **Info**: When the user already exists in Azure AD (could be that he or she got already added to another group), you do not have to create this invitation again. You can just skip it and directly add the user to the group.


## Adding the guest to the Office 365 Group

Once the guest user is created / exists in your environment. You can add the user object as a member to the group. You can do this via the add member to group API endpoint.

> **Add member documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members)

The only thing you need of the guest user is its ID. This user ID gets returned when the user has been created: **invitedUser.id**.

Here is some sample code of how to add the guest user to the specified group:

```javascript
/* ADD USER TO A GROUP */
var options = {
    method: 'POST',
    url: 'https://graph.microsoft.com/v1.0/groups/{GROUP-ID}/members/$ref',
    headers: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${result.invitedUser.id}`
    })
};

request(options, (error, response, body) => {
    console.log(body);
    if (!error && response.statusCode == 204) {
        console.log('OK');
    } else {
        console.log('NOK');
    }
});
```

After you executed the call to add the guest. It can take up to 10 minutes (that what I noticed on my environment) before you see the guest user pop-up as a member of the group. Like you see here:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest5.png" "Members of my Office 365 Group"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaElEQVR4nAFdAKL/AIpjmX5hnnpdnXdYmnlam3dZm3RVl3NUl3RVmHRUmADY2Nru7+7////4+fjT1tj8/vz////m8vzS5vf///oAweTB6/Tq/////fX18cDC+vn6//7++vz/9vn+///+FxtGrzeOrScAAAAASUVORK5CYII=" "624" "212" >}}

When you check the members with the group members' API endpoint. You get the up to date members list:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest6.png" "Members via the Microsoft Graph API"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAABnWAAAZ1gEY0crtAAAAdklEQVR4nD3JQQ7CIBBAUe5/PTVFSykCwzADJGyaqAVibFJf/u6L17btn3fvvbfefrX90FobYwhn7aJWaz0EIKZIlFIupeSca60CEKVS9+WhjTZPY6zxJyISzGnS+qpuDlzEiIjhAADMLBhxlnKeLt6s4Xz//QX+1ohzUDIWMwAAAABJRU5ErkJggg==" "624" "340" >}}

After 10 minutes (based on my tests), the user appears in the member list:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest7.png" "Members after 10 minutes"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAADCAIAAAAlXwkiAAAACXBIWXMAABnWAAAZ1gEY0crtAAAAaElEQVR4nAFdAKL/AIxmmn9innpdnHdZmnlamnham3RWmHNVmHRWmHVWmADX2Nju7+3////z8/TW19n///////3V5/no8Pf///sAxubG7fXu////8/f72OTy/vz6////9dHU9uXn/f//HLdGh4yxfP0AAAAASUVORK5CYII=" "624" "210" >}}

The user will then receive the email that he joined the group:

{{< caption-new "/uploads/2017/01/012017_0840_Addingguest8.png" "Group invitation mail"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAIAAADUCbv3AAAACXBIWXMAABnWAAAZ1gEY0crtAAAA3ElEQVR4nG1Qy0rEQBDM/189+h8eRBQ8iyt62Psi65JMMpPMJNPTTxmziQj2oammqCqqGyKSbZhZeL+EiBoRMTPhuu9v7p5uH8xMRc2Mma/0er89vn48v/9DI2KMcc5zynNKMxJdaVUV1WFwvneuc85VELxXNZFNPWXqYrHqq+cJl8J/zE8ejpe0ph4+l8uEv+YFyfVD23VQcIbs+iGMcS3YMFEKAQCYq6EtVABKqUFVnZbycjxP45gBVK09nIIPsNOF5GtiLHVUNbQBEdW23kQojPtTa88fwMyI+A2yzFtdasxSIwAAAABJRU5ErkJggg==" "453" "539" >}}

## Azure AD application permissions

To successfully execute these calls, you need to include the following permissions for the Microsoft Graph API in your Azure AD application:

Application permissions (if you want to run it from a background task):

*   Read and write all groups
*   Read and write directory data

Delegated permissions

*   Read and write all groups
*   Read and write directory data

## Download

In the following GitHub repository, you can find the code sample from this article: [AddGuestUsersWithMicrosftGraph](https://github.com/estruyf/AddGuestUsersWithMicrosftGraph).