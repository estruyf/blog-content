---
title: Customizing Sites and Pages in SharePoint 2013 (SharePoint Conference – SPC12)
author: Elio Struyf
type: post
date: 2012-11-15T00:26:41+00:00
slug: /customizing-sites-and-pages-in-sharepoint-2013-sharepoint-conference-spc12/
dsq_thread_id:
  - 3836445603
categories:
  - Branding
  - Development
  - SharePoint 2013
  - SPC12
comments: true
---

This session will cover an overview of how to customize SharePoint 2013 sites and pages – similar to the activities you would have used SharePoint Designer for with the 2010 platform. These non-workflow or branding activities include conditional formatting, customizing views, etc… If you are a SharePoint 2010 power-user that utilized SharePoint designer for page customization, this session will show you what options are available with 2013. If you are a developer or designer, this session will show you what out of box and client-side customizations are available with 2013.

Wes Preston gave session.

## Summary

Code samples will be available on Wes’ his blog: <http://www.idubbs.com/blog>

### Ground rules and changing times

Microsoft recommends leading with out-of-the-box solutions whenever possible.

  * Get to know SharePoint’s feature and capabilities _before_ ****adding customizations

### What is “Customization” in SharePoint

The answer depends on the audience:

**Users**

Using out-of-the-box capabilities

**Power users – information workers**

“Advanced” out-of-the-box SharePoint Designer (in 2010)

**Developers**

Code

### SharePoint General – User ‘customization’

Lists, Libraries, and Views

  * App templates
  * Culumns, metadata, fields

Options available via the browser

  * Page layouts
  * Web parts
  * Formatting text and graphics
  * Site pages and wiki pages

### Power Users

Skillset 1

  * Connected web parts
  * SharePoint Store Apps
  * HTML in calculated fields
  * SPD workflows

Skillset 2

  * Copy/paste development
  * Simple client-side rendering

### “Pro” Developers

Full range of customization options and opportunities: some of the same some new. There are lots of new options.

### SharePoint 2013 New Features

Adding “Tiles” to the page – the Promoted Links App

Timeline Views,, Project Summary, etc…

Themes, Branding and Style options

### SharePoint Designer 2013

Expanded workflow management capabilities

No more design view

Simple client side rendering: JavaScript editing

Design / CSS creation moves to other tools

### Branding

#### Branding, styles and theming

Looks

  * Choose from pre-created looks
  * Tweak look details and preview before applying
  * Add or Edit color palettes (at site-collection level)

Design Manager

#### _Change the look_

Galleries

  * Add new font schemes (XML)
  * Add new color palettes (XML)
  * Add Master pages (must be “15” to show in the dropdown)

Composed looks

#### Design manager

Upload HTML file to the master page gallery and set properties to auto-create a master page

  * Content type: HTML master page
  * Compatible UI version: 15
  * Associated file: Checked

### Client Side Rendering

**SharePoint 2010**

Data + XSL = HTML > Server-Side Processing

**SharePoint 2013**

Data + JS = HTML > Client-Side Processing

_What is client-side rendering?_

  * JavaScript
  * Html
  * CSS

>>> Display Templates

_How can you implement Client-Side Rendering?_

  * Deploy as an App
  * Deploy as a solution
  * Deploy manually and configure JS Link

>>> Choose the implementation approach that best fits what you are trying to do.

JS Link enables you to use an external JavaScript file for rendering the Data View. You can for example manipulate the HTML for each item > creating a progress bar instead of the percentage for a task.

_Side note:_ You can now create new columns in Data Sheet view. The internal name != the filled in name.

_With JS Link you can do:_

  * Field overrides
  * Item overrides
  * PreRender and PostRender overrides

### Using SharePoint Designer 2013

Can open and tweak in SharePoint Designer

  * You can also use Visual Studio > Power Users will mostly use SPD.

Doesn’t display in the main ‘Master Pages’ site objects

### Forms Override Notes

SharePoint Designer Forms

  * Default forms – use the ListFormWebPart and isn’t easily configurable, but you have JSLink and CSR Render Mode.
  * Custom-created forms – Use the DataFormWebPart and can still be edited in SPD code view or the XSL on the web part properties. **NO JSLink**

Display Templates

  * Dispform.aspx
  * Editfrom.aspx
  * Newform.aspx