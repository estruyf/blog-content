---
title: Using the new multilingual APIs in Modern SharePoint
slug: /multilingual-apis-modern-sharepoint/
author: Elio Struyf
type: post
date: 2020-03-18T13:48:54.273Z
draft: false
tags:
  - Development
  - Language
  - Modern Sites
  - SharePoint Online
  - Multilingual
categories: []
comments: true
---

Currently, the **Multilingual page publishing for Modern SharePoint** feature is rolling out to first-release tenants. This feature allows you to create pages on communications sites in different languages. These pages get linked to each other, and with a language switcher, you can navigate from language variant to variant.

> **Info**: Microsoft 365 Roadmap status on Multilingual page publishing for Modern SharePoint: [https://www.microsoft.com/en-us/microsoft-365/RoadmapFeatureRSS/50217](https://www.microsoft.com/en-us/microsoft-365/RoadmapFeatureRSS/50217).

Multilingual support on Modern SharePoint is a long-awaited feature for many companies, but can you bind your solutions into it? That is exactly what I want to find out once this feature became testable on my tenant.

## Configuration

Documentation for this feature is already available on the following page: [create multilingual communication sites, pages, and news](https://support.office.com/en-us/article/create-multilingual-communication-sites-pages-and-news-2bb7d610-5453-41c6-a0e8-6f40b3ed750c).

{{< caption-new "/uploads/2020/03/multilingual1.png" "Language switcher"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAAklEQVR4AewaftIAAAEfSURBVHXBwYriQBCA4d+yY6KbYBYUTx58/6cSPIlGZ1bthKquHvswsAy73zeLMebFYoGI8DEmgszIGcwzyTO/V4FC7vc7Zoa7o5b4iEpUY9JE1IRaInsibDYbYoycz2dijCyXS6I7qkpxG3+x3W4JvHVdR9d1/E9KiWBmxBi53W7Udc1ut+OnP1NChmGgaRr2+z193/Mvn6Mj6/UaVeV4PHK5XFBVflrMIcQYeb1epJRQVU6nE6pKVVW0bUshORNEhNVqxTRNuDuz2YwQAlVVEUKgcHdCXdfknBnHkUJEMDOapqHvewozI/DWti1t21K4OyKCu/O3wNvj8eB6vSIi1HXN8/mkOBwOfAtmRtH3PTlniqqqyDkzDAPz+RwR4QtwNqKMM1DW+gAAAABJRU5ErkJggg==" "174" >}}

Once you activated your languages, you can start testing out the feature by creating pages.

{{< caption-new "/uploads/2020/03/multilingual2.png" "Lanuage translation options"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAAAklEQVR4AewaftIAAADjSURBVH3B0W7qMBBF0X2ciR0cRB8u//+FvEQgKxiYqVIpEretupZut1v03okITqcTZsZ3z+cTk4SZIYneO601NuNUebhIEsdiWCkFd2cjiZwzX5TIJnZ2uVy43+8oV/59zNTDgd/Y+XzG3dk9Hg/ejePIxtyd1hqS2EQEG3enlMI4jmxsXVdKKUzTxF8spcS6rvTekQRKpHxgzol35u6YGfM8I4lN8JNJIiK4Xq8Mw4C7QzJyKRRL7FJrjWVZiAjeBf+zWivH45FaK7uIQBLvTBKv14tlWTAz3J1IA7lMTJbYfQK6T13rQYawVwAAAABJRU5ErkJggg==" "313" >}}

## But how does it all work?

Internally it is a straightforward system. Each site will contain a default language, and this is the language you specified while creating the site collection. In my example, this is English.

As there is one primary language, SharePoint initiates all translations from that one. It is somewhat similar to variations in the past, but it is working a lot better today.

Why is that primary language important? 

Each page on a new multilingual enabled site will have the following internal fields related to translations:

- **_SPIsTranslation**: Specifies if the current page is a translated page
- **_SPTranslatedLanguages**: Specifies which languages are available for the page
- **_SPTranslationLanguage**: The page language
- **_SPTranslationSourceItemId**: The Unique ID of the source page

These fields are essential to know which languages are available, and also to fetch the other links, but depending if you are on a source page (the primary language) and the page translations.

### Source page metadata

The source page metadata looks as follows:

```json
{
  "_SPIsTranslation": "No",
  "_SPIsTranslation.value": "0",
  "_SPTranslatedLanguages": ["nl-nl", "fi-fi", "de-de", "fr-fr"],
  "_SPTranslationLanguage": "",
  "_SPTranslationSourceItemId": ""
}
```

Relevant here is that the current page is not a translated page, and has the following languages available: NL, FI, DE, and FR. For this page, the `_SPIsTranslation` and `_SPTranslatedLanguages` are the two critical fields.

### Page translation metadata

The metadata of a page translation looks as follows:

```json
{
  "_SPIsTranslation": "Yes",
  "_SPIsTranslation.value": "1",
  "_SPTranslatedLanguages": "",
  "_SPTranslationLanguage": "fi-fi",
  "_SPTranslationSourceItemId": "{07EF5378-90FF-4560-AF28-E0A759DDBAF4}"
}
```

In this metadata, you see a couple of differences. First, the `_SPIsTranslation` field specifies that the page is a translation instead of a source page, and the link to the source page can be retrieved via the unique ID: `_SPTranslationSourceItemId`.

### So what is the process here

As you can see, everything starts from the source page. If you want to know if the page has linked translations, you can check this in the `_SPTranslatedLanguages`. When the value is empty, there are no translations for the current page.

On a translated page, you need to check the translations via the `_SPTranslationSourceItemId` property.

If you want to build a custom solution on top of this, you will first have to do a check to see if it is a source page or translated page. On translated pages, you will have to do an extra call to retrieve all the linked pages.

## The APIs

As explained above, you will need to do a couple of calls to know if your control is loaded on the source page or translated page.

### Retrieving the translation metadata

You can retrieve the translation metadata by calling the `RenderListDataAsStream` endpoint for the SitePages library: `https://tenant.sharepoint.com/sites/sitename/_api/web/GetList(@listUrl)/RenderListDataAsStream?@listUrl='/sites/sitename/SitePages`. This API needs to be called via a POST request with the following body:

```json
{
  "parameters": {
    "ViewXml": "<View Scope=\"RecursiveAll\"><ViewFields><FieldRef Name=\"_SPIsTranslation\" /><FieldRef Name=\"_SPTranslatedLanguages\" /><FieldRef Name=\"_SPTranslationLanguage\" /><FieldRef Name=\"_SPTranslationSourceItemId\" /></ViewFields><Query><Where><Eq><FieldRef Name=\"ID\" /><Value Type=\"Number\">19</Value></Eq></Where></Query><RowLimit /></View>"
  }
}
```

> **Info**: more information to use the RenderListDataAsStream API can be found here: [Using the SharePoint RenderListDataAsStream API to fetch lookup and single managed metadata field values](https://www.eliostruyf.com/using-sharepoint-renderlistdataasstream-api-fetch-lookup-single-managed-metadata-field-values/).

Data you get back looks as follows:

{{< caption-new "/uploads/2020/03/multilingual3.png" "RenderListDataAsStream response"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACSSURBVH3BQaoCMRBF0VtJtYqC4MAV6P535kRUOumqPHv4weafY7f7XbVWlt75j2cEp8uVw/xiZNBbQxItkr+clSSGFea5sUSwxVllBK7BYarsvWAYPRNJmBmScDPjjFCpzBF8lqTxy1nFSJ4RjOJMljTxo7DSSCSBFYxtRRI+7bnsdhyj08QmNzMenzcGxBDJti+1uVQGmRiH4QAAAABJRU5ErkJggg==" "776" >}}

### Retrieving the available language variants

Once you know if the current page is the source or translation, the next call will be a bit different.

If the current page is the source, you can use the **ID** of the page to retrieve the metadata, but the best is to use the **UniqueId** of the page. That way, the experience will be similar to the source and translations.

The call you need to perform to know all translations is: `https://tenant.sharepoint.com/sites/sitename/_api/sitepages/pages/getByUniqueId('<UniqueId>')?$select=Path,Version,Translations&$expand=Translations`.

{{< caption-new "/uploads/2020/03/multilingual4.png" "Translations response"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAACeSURBVHXBQU4DQQxFwWe3h4lAOQlw/1NFYoEUZtr2B8SCBU2VvT6/aHcjejJbHAIzkCC7qWq+xZbJvj/Q1UQW71VMfklQ3cTZzV2GSrTExR3xQ0B1E8OJnCfj6UoBAo5MPsQfbmbUeZBdZBUSSw7C3NmGc9k2zFgKvpg72SKzCLHkYMzjjiTGcMxYchD745UxBsb/YmDU2w1HmKDF0iesr1s7/HJWvQAAAABJRU5ErkJggg==" "1052" >}}

Highlighted in the above screenshot is the metadata you need to know which languages are available and their page URL.

> **Info**: If you want, you can also call `https://tenant.sharepoint.com/sites/sitename/_api/sitepages/pages/getByUniqueId('<UniqueId>')/Translations`, but this will only give you the available translations and not the source page.

### Creating page translations

The creation process is also something you can do from your components. You can use the following API endpoint for this: `https://tenant.sharepoint.com/sites/sitename/_api/sitepages/pages(<Source page ID>)/translations/create`.

<blockquote class="important">
<p><strong>Important</strong>: You need to call the API from the source page ID.</p>
</blockquote>

The request body looks as follows:

```json
{
  "request": {
    "__metadata": {
      "type": "SP.TranslationStatusCreationRequest"
    },
    "LanguageCodes": {
      "results": ["nl-nl"]
    }
  }
}
```

> **Info**: the `LanguageCodes` results is an array of the languages for which you want to create translations. If you specify an **empty array** `[]`, it creates all language pages at once. In my example, it would be NL, DE, FI, and FR. If you want to create an individual or a couple of pages, you can pass in the language code like: `["nl-nl"]` or `["nl-nl", "fi-fi"]`.

{{< caption-new "/uploads/2020/03/multilingual5.png" "Translation creation API sample"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAADESURBVHXBTUoDURCF0a/qvTYtgTaJS8gWBDEgbsVJnLkFtyi4g4wcSmNQsF/V9QcyUXOOPe5etF4WSikcmBl933Mgifpwf8s4jhgCiR/uSKAMvi0WC+rddsvT8xvr8xnzE+c/XddRNzcXXBtfhJlh7pgZ1QsHEYFdXm30ut9jH+9kishEgCQihblzNgzUjEZE0qbG1II/MolMHAnFhAG1OMe4gDo7pasFwzimGpARTC1oERxTl6sV7iM270mJFslvwzDwCdQUV0mrlFUPAAAAAElFTkSuQmCC" "1223" >}}

### How to know which translations are possible?

You can only translate pages to the selected languages for the site. Otherwise, the create API will error out.

To know the untranslated languages, you can use the same API as you used for retrieving the page variants: `https://tenant.sharepoint.com/sites/sitename/_api/sitepages/pages/getByUniqueId('<UniqueId>')?$select=Path,Version,Translations&$expand=Translations`.

{{< caption-new "/uploads/2020/03/multilingual6.png" "Untranslated languages"  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAAklEQVR4AewaftIAAABoSURBVG3BQQoCMRAAwZ5kD4uCv5D9/9MUBLPJTHsVsSrux+F+vdHPFz2CMRcqBATBqkJlW3NCayyDVFCyEoVSsgqF7aLsmcxM2hw8SlKpkm9bRjBeT+Z4ozD5bzsjyNap3kFoVZTy6wPurkrtT/V/wAAAAABJRU5ErkJggg==" "827" >}}

You can retrieve languages that are available for translation from the `UntranslatedLanguages` property.

*Veel plezier met vertalen (or `have a lot of fun with translating`)*
