---
title: Visualise SP2010 Rest Data With Google Visualization API
author: Elio Struyf
type: post
date: 2011-01-21T18:45:10+00:00
slug: /visualise-sp2010-rest-data-with-google-visualization-api/
dsq_thread_id:
  - 3836444985
categories:
  - ECMAscript
  - REST
tags:
  - Chart
  - Google
  - Pie
  - REST
  - Visualisation
comments: true
---

Some time ago I was testing out the Google Visualization API with SharePoint 2010 Rest functionality. The Google Visualization API is very handy if you want to visualize your data.

My intention was to create a pie chart to visualise the task statuses. The data was consumed from the SharePoint 2010 REST service with the help of [jQuery](http://jquery.com/).

With jQuery it is very simple to retrieve the results from the REST service. All you need to do is to create a call to the URL of the REST service with the getJSON method.

```javascript
$.getJSON(url, function(data))
```

The URL to the REST service is the following: `http://YOUR SITE/_vti_bin/ListData.svc`. In my case the full url to the task list is: `http://your site/_vti_bin/ListData.svc/Tasks?$orderby=Status asc`. As you can see it will retrieve all my tasks and order them by the status value. This result can than be used to create a pie chart.

On the [Google Visualization site](http://code.google.com/intl/us-en/apis/charttools/index.html) I did a quick search for a [pie chart](http://code.google.com/intl/us-en/apis/visualization/documentation/gallery/piechart.html). Google shows you an example of the pie chart and the corresponding code.

Here is my code, feel free to make some code optimisation.

```html
<script src="jquery.min.js" type="text/javascript"></script>

<script type="text/javascript" src="jsapi"></script>

<script language="javascript" type="text/javascript">
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);
  
  function drawChart() {
    //Get the Rest url
    var url = "http://YOUR SITE/_vti_bin/ListData.svc/Tasks?$orderby=Status asc";
    
    //Request json data
    $.getJSON(url, function(data){
      //Prepare Google data
      var googleData = new google.visualization.DataTable();
      googleData.addColumn('string', 'Task Status');
      googleData.addColumn('number', 'Total');
      
      var check = 0;
      var checkStatus = "";
      //Store the statuses and total values
      var clientData = [];
      var total;
      var checkTotal = 0;
      
      //Get the number of results
      checkTotal = data.d.results.length;
      $.each(data.d.results, function (i, result) {
        total = i;
        //Check if first item
        if(i === 0) {
          checkStatus = result.StatusValue;
          check = 1;
        }
        else {
          if(checkStatus != result.StatusValue) {
            clientData.push( { Status: checkStatus, Total: check } );
            
            checkStatus = result.StatusValue;
            check = 1;
          }
          else {
            check++;
          }
          //Check if it is the last item
          if(total === (checkTotal - 1)) {
            clientData.push( { Status: checkStatus, Total: check } );
          }
        }
      });
      googleData.addRows(checkTotal);
      var i = 0;
      for (x in clientData)
      {
        //Add value to Status
        googleData.setValue(i, 0, clientData[x].Status);
        //Add value to Status total
        googleData.setValue(i, 1, clientData[x].Total);
        i++;
      }
      
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(googleData, {width: 450, height: 300, title: 'Task Status Overview - Total: ' + checkTotal, is3D: true});
    });
  }
</script>	

<div id="chart_div"></div>
```

You can place this code in a HTML Form Web Part. The end result will be the following.

{{< caption-new "/uploads/2011/01/task4.png" "Task list with four tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAIAAADuA9qHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAO0lEQVR4nE3CMQ7AIAgFUO9/RUdNMB0IVGq+italQ19eUOOLszaaq353xZCUIguFp3VWMdzvj08vVAAc6g45akTsZZAAAAAASUVORK5CYII=" "455" "99" >}}

{{< caption-new "/uploads/2011/01/pie4.png" "Pie chart with four tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nAHZACb/APP08+Xl5fLt8/Pw7/T07+vr6/r7/fn7/vv6+v39/QD////5+/jK57qzzcrU2/n+///38/jf2ODm5ub5+fkA8Pjva7haH5oAH3R1N2Plhaft9vHl4NG10NLW8fHwAKzTky6PAEKeAEJ5aUxfyDxXusHM4fD45+7s7/f49wDtxXztlQDxpgvbZAbPQxzOOQTjsKD////+/Pz///8A8du66Y0H/6EG6l8A1TUFyEEO8dzT/////fz8/v7+AP///+bOptqeMspmGsFdPOTHuv////7+/f///////w2inyG9tQZ0AAAAAElFTkSuQmCC" "294" "218" >}}

{{< caption-new "/uploads/2011/01/task10.png" "Task list with 10 tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR4nE3LywqAIBAFUP//KwuSJAux8TUz6o020fpwTC7tiqcOBjDnBKAizjnVDsBQqj4c0tvHzGw3m3MWEVMqBwp9yH/7wxOllynV/dxZy2+3dVljvJnlASUgc+oiqxJjAAAAAElFTkSuQmCC" "538" "242" >}}

{{< caption-new "/uploads/2011/01/pie10.png" "Pie chart from 10 tasks"  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nAHZACb/APDv8Ojr5/D28PT17/b08e3t7fX4+/f6/Pj39v39/gD////57/rfruC8tufZ4/b////w6O7e19vl5+b8/PwA7tnvpzWvlACZSETHMnTkkrP6/fLW49vH3d7k+Pj3AMBfyZoAp5UHnmpMqHBWhZ1OXd7CvszN0dLS0vLy8gCTaI9RTjw3fSJkjQL5hgvzaAP00cb2+v/s6+r08/QAm8iMCY8AMaERFpgDapUA454m+PTt//////7+////AP38/Zu+j0uVMTmPHmaiTerjz/////39/f7+/v7+/m9SmweKsRHNAAAAAElFTkSuQmCC" "292" "215" >}}