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

{{< highlight javascript "linenos=table,noclasses=false" >}}
{
    "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/{ID}`
}
{{< / highlight >}}


> **Add member documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members)

When you manually invite a guest to an Office 365 Group, it will also create an Azure AD user object. The **user type** property for the user is set to **guest**. Most importantly, the **mail** property gets set to the email address of the user.

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest1.png" "Guest user information" >}}

The first thing that popped into my mind was to create the user via the users' endpoint. Whatever I tried with the users' endpoint, this property always kept blank.

I also checked out to the graph.windows.net API. This API gave me a bit more information about the user. For instance, when I retrieved a guest user, I saw an interesting property: **creationType**. For my members, this was **null**. Guest users had another value: **Invitation**.

Here an example for a member:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest2.png" "Creation type of a member" >}}

Here an example for a guest:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest3.png" "Creation type of a guest" >}}

I also tried to use this property in my creation process with the value set to **Invitation**, but this returned an error that told me I had insufficient privileges to perform the operation. As I was about to conclude that this functionality is not yet supported I found the **invitation manager** API endpoint in the Microsoft Graph documentation.

> **Invitation manager documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/invitation](https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/invitation)

The invitation manager endpoint allows you to create an invite to add external users to your organisation. At this moment, the endpoint is still in beta.


The endpoint itself is very useful for creating guest / external users. It contains a couple of useful properties like an invitation message, redirect URL, and more. This allows you to add link to a documentation page where the guest can read more about the sign-in process.


{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest4.png" "Invitation mail" >}}

Here you can see the code I used to create the guest user on my environment:


{{< highlight javascript "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}


> **Info**: The code above will send out the email. If this is not a requirement, you can also turn it off by setting the **sendInvitationMessage** property to false.

When you check the user object which gets created after calling the API endpoint, you can see that it will correctly fill in the mail property.

> **Info**: When the user already exists in Azure AD (could be that he or she got already added to another group), you do not have to create this invitation again. You can just skip it and directly add the user to the group.


## Adding the guest to the Office 365 Group

Once the guest user is created / exists in your environment. You can add the user object as a member to the group. You can do this via the add member to group API endpoint.

> **Add member documentation**: [https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members](https://graph.microsoft.io/en-us/docs/api-reference/v1.0/api/group_post_members)

The only thing you need of the guest user is its ID. This user ID gets returned when the user has been created: **invitedUser.id**.

Here is some sample code of how to add the guest user to the specified group:

{{< highlight javascript "linenos=table,noclasses=false" >}}
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
{{< / highlight >}}

After you executed the call to add the guest. It can take up to 10 minutes (that what I noticed on my environment) before you see the guest user pop-up as a member of the group. Like you see here:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest5.png" "Members of my Office 365 Group" >}}

When you check the members with the group members' API endpoint. You get the up to date members list:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest6.png" "Members via the Microsoft Graph API" >}}

After 10 minutes (based on my tests), the user appears in the member list:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest7.png" "Members after 10 minutes" >}}

The user will then receive the email that he joined the group:

{{< caption-legacy "uploads/2017/01/012017_0840_Addingguest8.png" "Group invitation mail" >}}

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