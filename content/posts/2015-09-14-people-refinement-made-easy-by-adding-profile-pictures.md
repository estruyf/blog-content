---
title: People refinement made easy by adding profile pictures
author: Elio Struyf
type: post
date: 2015-09-14T14:30:14+00:00
slug: /people-refinement-made-easy-by-adding-profile-pictures/
dsq_thread_id:
  - 4131091343
categories:
  - Display Templates
  - Office 365
  - Search
  - SharePoint 2013
tags:
  - Display Templates
  - People Results
  - Refiners
  - Search
comments: true
---

In various SharePoint environments I see that clients mostly use the predefined refiners that you get from an out of the box search center. These refiners could of course help your users to find the right results, but they can always be made better.

The author refiner for example can simply be more useful by adding the user his or her profile picture next to their name. This could help you if you are working in a large organization where you may not know everyone by name. By adding the profile picture to the refiner it can help you narrow your search by using the name or picture of the user.

To include the user profile picture next to the refiner name, you have to add or create a new refiner display template. Here is an example output of the templates I have created:

{{< caption-new "/uploads/2015/09/091415_1430_Peoplerefin1.png" "User refiner"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAIAAADw0OikAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABuUlEQVR4nG2RPW/UQBCG/bOgBokCQUFBaPgBVKFCUEARivANBVGkSEghXJSAiCAEkChO4rO6IoeIuQgHgULsvV17z+v17qz3wza6OwtIuCmmmGf1jHZeL2MMIdRHEc9FXddVVVVNr+q69hRAH2NKE6WK+r/ygiDw/a+b3W4URSxNaZIklKZpOqAUALzP3e7O951Op4MQMsYIKSSAEAKUstZ6hJCyLPmoxrvrf+XOaBr+dFbpojDGaGO01s65BpO94OX8zJuNlSj8FScJHVBMSMbzBn/8tD514vid2avOmdGk2ifv+f7a46dv222lYAJ+/u71gxerUCjGM4z7SUwQQlqPTbW31F4/c+r0k4ct6YzMhZSS57l1tsG3F1uXzi3curK0i9GEj2UcBilnHEAV1lpjrdbaWjt+50WZWZy7/+XbbiYUIcPj74Uhxtjaod9LaPT+0eHgw7QbWQ/KLZA8bLEfy5Ubn2I/Xnv26ubM3dlr873tIM85pZQx5lzZ4Os37h09dGzq7MUtv1c6N8wK5J8N3vLqxpGTF85fXonppMQKrTOegwSllCuboP5iIUQSx4wxjDGAOoB/A96fPUIKqxybAAAAAElFTkSuQmCC" "166" "349" >}}

## Two types of user values, which one to use?

When you create your own user or people refinement templates, you have to know that there are two types of user values that can be retrieved:

1.  **User full name**: Elio Struyf
2.  **User full detail value**: elst@something.onmicrosoft.com ' Elio Struyf ' 693A30232E667C6D656D626572736869707C6A756C69616E69406573747275796664372E6F6E6D6963726F736F66742E636F6D i:0#.f'membership'elst@something.onmicrosoft.com

If you use the default author refiner (DisplayAuthor), the values that you retrieve are only the full names of each user. To add the profile picture next to their name, you have to do an extra call to the search REST API to retrieve the email address and picture URL by using the user its full name.

> **Important**: if you have users with the same name in your company. These users "share" the refinement value that is being displayed. This is also important when you are retrieving more information of the user via the search REST API.

The second data value is retrieved when you make use the Modified By (ModifiedById or EditorOWSUSER) managed property or if you map the **ows_q_USER_Editor** crawled property to one of the RefinableString managed properties.

From this value you can extract the user its email address, full name, accountname. These full detail values are unique, so the problem with people that have the same name in your company does not occur with this refiner

## Showing the profile picture

The profile picture is show by making use of the **AccountName** of each user. Once you have the user its account name, you have to create an image element with the src attribute set to:

```javascript
String.format("/_layouts/15/userphoto.aspx?size=S&accountname={0}", username);
```


## Download the templates

I have created two templates. One to show how it can be achieved by using the DisplayAuthor refiner and one for the Modified By refiner. These refiner templates can be downloaded from the SPCSR GitHub repository: [User Refiners](https://github.com/SPCSR/DisplayTemplates/tree/master/Search%20Display%20Templates/Refiners/User%20Refiner).