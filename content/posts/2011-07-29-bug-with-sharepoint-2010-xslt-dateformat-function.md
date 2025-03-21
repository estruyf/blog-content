---
title: Bug With SharePoint 2010 XSLT DateFormat Function
author: Elio Struyf
type: post
date: 2011-07-29T08:54:32+00:00
slug: /bug-with-sharepoint-2010-xslt-dateformat-function/
EUSP:
  - https://www.nothingbutsharepoint.com/sites/eusp/Pages/Bug-With-SharePoint-2010-XSLT-DateFormat-Function.aspx
dsq_thread_id:
  - 3836445137
categories:
  - Development
  - SharePoint
tags:
  - XSLT
comments: true
---

Yesterday I found out that there is a problem/bug using the XSLT **ddwrt:DateFormat** function. The problem/bug occurs when the regional settings is not set to **English (United States)**.

When a day got the value between 1 and 12, the **ddwrt:DateFormat** function will recognize this as the month. The month value will be used as the day.

So if the day value is less than 13, you get the following problem:
<div>
<table style="border-collapse: collapse;" border="0"><colgroup> <col style="width: 234px;" /> <col style="width: 380px;" /></colgroup>
<tbody valign="top">
<tr>
<td style="padding-left: 7px; padding-right: 7px; border: solid 0.5pt;">**US Date Format**</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: solid 0.5pt; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">**ddwrt:DateFormatTime(date, 1043, 'dd-MMMM-yyyy')**</td>
</tr>
<tr>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: solid 0.5pt; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">8/6/2011</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">8-June-2011</td>
</tr>
<tr>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: solid 0.5pt; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">2/3/2011</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">2-March-2011</td>
</tr>
</tbody>
</table>
</div>
When the day value is larger than 13, you get the correct formatting:

So if the day value is less than 13, you get the following problem:
<div>
<table style="border-collapse: collapse;" border="0"><colgroup> <col style="width: 234px;" /> <col style="width: 380px;" /></colgroup>
<tbody valign="top">
<tr>
<td style="padding-left: 7px; padding-right: 7px; border: solid 0.5pt;">**US Date Format**</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: solid 0.5pt; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">**ddwrt:DateFormatTime(date, 1043, 'dd-MMMM-yyyy')**</td>
</tr>
<tr>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: solid 0.5pt; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">8/19/2011</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">19-August-2011</td>
</tr>
<tr>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: solid 0.5pt; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">2/30/2011</td>
<td style="padding-left: 7px; padding-right: 7px; border-top: none; border-left: none; border-bottom: solid 0.5pt; border-right: solid 0.5pt;">30-February-2011</td>
</tr>
</tbody>
</table>
</div>
I did not notice it in the beginning, because my settings are always set to English (United States) on my development server. When I implemented the XSLT stylesheet on a different environment, where the regional settings were set to **Dutch (Belgium)**, some of dates were incorrectly formatted.

## English (United States)

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar1.png" "English (United States) Regional Setting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVR4nGN4/fr1p48g8O3b918/f7148fLFi5dv3777/PnL27fvALQfHBVneVEUAAAAAElFTkSuQmCC" "565" "63" >}}

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar2.png" "English date format converted to Dutch date format"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAY0lEQVR4nF3LUQrDMAwEUd//oqXW2grJSoFaVkMoLdTz+5gyIg7aQ1rMfH/LzCd62/Yy5yTZe//ZJwjMrEQESaD9YWatQvK+T3fVbblV1f0srzFICrBwrXKQN5vZcmcm0Mz9Aok3ruzHXmmcAAAAAElFTkSuQmCC" "397" "242" >}}

## Dutch (Belgium)

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar3.png" "Dutch (Belgium) Regional Setting"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAIAAABol6gpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVR4nGN48eLFhw8f3n94/+3bt9+/fz9//uLli1efweDdu3cAsuUcF0cqPb8AAAAASUVORK5CYII=" "569" "56" >}}

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar4.png" "Conversion problem with the Dutch date format"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiElEQVR4nEXC0QqCMBQA0P3/jwn1EIWI6GxYsOs2nebmiPTe20NWhyNeSEHD/XReNXDXfRIAXHKnWkHMyZi+qnj07P+9rJMxYiOKAEZKjpFD2M+zVSpoEBtiGqfuqihGXpbfvr3FwYsV8elcbywhMtEecXrMyVqxMqeyHLKMm4al/K794bgUxRsmr6gSbR6GMgAAAABJRU5ErkJggg==" "398" "239" >}}

## Solution

After some research and testing without result, I did some googling and found a post from someone who had the same problem. The blog post can be found [here](http://sharepointroot.com/2011/06/08/xsltlistviewwebpart-date-format-using-ddwrt/). In this blog post he included a custom XSL template to format the date.

I have created my own version of his XSL template to format the date in Dutch date format.

### XSL Template


```xml
<xsl:template name="FormatDutchDate">
	<!-- Template Parameters -->
	<xsl:param name="dateValue" />
	<xsl:param name="monthFormat" /> 

	<!-- Split Date -->
	<xsl:variable name="day" select="substring-before($dateValue, '/')" />
	<xsl:variable name="month" select="substring(substring-after($dateValue, '/'), 1, 2)" />
	<xsl:variable name="year" select="substring(substring-after(substring-after($dateValue, '/'), '/'), 1, 4)" />

	<!-- Create US Date Format -->
	<xsl:variable name="USDate">
		<xsl:value-of select="$month" />/<xsl:value-of select="$day" />/<xsl:value-of select="$year" />
	</xsl:variable>

	<!-- Month Notation -->
	<xsl:variable name="monthString">                                                
		<xsl:choose>
			<xsl:when test="$monthFormat='MM'">
				<xsl:value-of select="$month" />
			</xsl:when>
			<xsl:when test="$monthFormat='MMM'">
				<xsl:value-of select="ddwrt:FormatDateTime($USDate, 1043, 'MMM')" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="ddwrt:FormatDateTime($USDate, 1043, 'MMMM')" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<!-- Create Date -->
	<xsl:choose>
	<xsl:when test="string-length($day) = 1">0</xsl:when>
	</xsl:choose>
	<xsl:value-of select="$day" />-<xsl:value-of select="$monthString" />-<xsl:value-of select="$year" />
</xsl:template>
```


### Call the XSL template


```xml
<xsl:call-template name="FormatDutchDate">
  <xsl:with-param name="dateValue" select="@Expires" />
  <xsl:with-param name="monthFormat">MMM</xsl:with-param>
</xsl:call-template>
```


## Result

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar5.png" "XSL Template Result"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAVElEQVR4nE3LQQ6AIAxEUe5/VVsqEhgrpGNQF/7tz0sANs0RQVJtbx0kxxiiGe4JgIjwKZvhPL8tGhHJ3c1sWfKo1f0iOecspazdehfNr7afVl36BhnGdCrrA0P8AAAAAElFTkSuQmCC" "552" "242" >}}

## XSLT Month Options


```xml
<xsl:with-param name="monthFormat">MM</xsl:with-param>
```

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar6.png" "MM - Number notation"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiElEQVR4nGWMyw7CIBAA+f8f8+RB20OtGEujwC4Pu0CxJm0x6kXjXCczrJdQcVHz/tBdai52bVcdxbY5bfbtWSJLeaKUPcUwZh8ipZzydAvRURzvD2YMKqm0UgiIaOZ5Ll8wCoTGeO+tddb5j15flLUUFogAcBjIurdelp/aWSuvCgC0BvibPwFeiKkJuuGXVAAAAABJRU5ErkJggg==" "118" "73" >}}


```xml
<xsl:with-param name="monthFormat">MMM</xsl:with-param>
```

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar7.png" "MMM - Short Name Format"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkElEQVR4nDWLyw6CMBBF+/8fZtwRYVMfSKAyfYDGaZpOC5UaBG/u7pzDaiHLc1PeRHXtCn4veFPV3bG6HE6ct5JRiD5ERzHEyXnyFKc5OU/OU4gzUxK01gBgjOl7QMSc87Is+TeG+DbDqI0BkNbaOaUNbwKzFqVS4/M1mAER02fv9lopBVICrH8I4Sms9R9/AUurqKxA3brQAAAAAElFTkSuQmCC" "116" "71" >}}


```xml
<xsl:with-param name="monthFormat">MMMM</xsl:with-param>
```

{{< caption-new "/uploads/2011/07/072911_0854_BugWithShar8.png" "MMMM - Full Name Format"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAmElEQVR4nE2M3Q6CIBhAef8Xa1210oum1kKFj0AZZAKf8dO8aOvcnp1Duh6q9lHfWdXS0/V2bmjV0WPdHi4NFTNxPqwuLC74gMvqXcCAaN/utbqwfYgAkFIC58Mwcg7yKWk/GGNKKTlnYo2RSnEA8ZTTNCNiTCnGmHPJpRBrLQBIpbTWs9YppfIHEUJw2FvGOBtHj9u+/ekvAlqn5LSa0n0AAAAASUVORK5CYII=" "118" "71" >}}