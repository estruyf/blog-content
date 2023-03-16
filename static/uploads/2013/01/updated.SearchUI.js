// Minimized SearchUI Version

Type.registerNamespace('Srch');Srch.SU=function Srch_SU(){}
Srch.SU.toggleRefCategory=function Srch_SU$toggleRefCategory(rootElmt,propName){try{var $v_0=rootElmt.querySelector('.ms-ref-uparrow, .ms-ref-downarrow');var $v_1=rootElmt.querySelector('.ms-ref-allSec');var $v_2=rootElmt.querySelector('.ms-ref-unselSec');if(!$v_2||$v_2.style.display===''||$v_2.style.display==='block'){$v_0.className='ms-ref-downarrow';if($v_1){$v_1.style.display='none';}
if($v_2){$v_2.style.display='none';}
Srch.Refinement.setExpanded(propName,'false');}
else{$v_0.className='ms-ref-uparrow';if($v_1){$v_1.style.display='';}
$v_2.style.display='';Srch.Refinement.setExpanded(propName,'true');}}
catch($v_3){}}
Srch.SU.toggleRefShortLong=function Srch_SU$toggleRefShortLong(rootElmt,peoplePickerId){try{var $v_0=rootElmt.querySelector('.ms-ref-unsel-toggle > .ms-displayInlineBlock')||rootElmt.querySelector('.ms-ref-unsel-toggle');var $v_1=rootElmt.querySelector('.ms-ref-unsel-shortList');var $v_2=rootElmt.querySelector('.ms-ref-unsel-longList');if($v_1.style.display===''||$v_1.style.display==='block'){$v_1.style.display='none';$v_2.style.display='';$v_0.innerHTML=SP.Utilities.HttpUtility.htmlEncode(Srch.U.loadResource('rf_RefinementLabel_Less'));try{if(!Srch.U.n(peoplePickerId)){Srch.SU.ensurePeoplePickerRefinementInit(peoplePickerId);}}
catch($v_3){Srch.U.trace(null,'Srch.SU.ToggleRefShortLong','Failed to initialize people picker: '+$v_3);}}
else{$v_1.style.display='';$v_2.style.display='none';$v_0.innerHTML=SP.Utilities.HttpUtility.htmlEncode(Srch.U.loadResource('rf_RefinementLabel_More'));}}
catch($v_4){}}
Srch.SU.navItemClicked=function Srch_SU$navItemClicked(queryGroup,url){var $v_0=Srch.ScriptApplicationManager.get_current();var $v_1=$v_0.queryGroups[queryGroup];if(!$v_1){return false;}
var $v_2=$v_1.dataProvider;if(!$v_2){return false;}
var $v_3=Srch.SU.$L($v_1,0);if(Srch.U.e($v_3)){$v_3=$v_2.get_currentQueryState().k;}
var $v_4=$v_2.get_contextualScopeUrl();var $v_5=String.format('{0}?k={1}',url,SP.Utilities.HttpUtility.urlKeyValueEncode($v_3));if(!Srch.U.e($v_4)){$v_5=String.format('{0}&u={1}',$v_5,SP.Utilities.HttpUtility.urlKeyValueEncode($v_4));}
SP.Utilities.HttpUtility.navigateTo($v_5);return false;}
Srch.SU.$L=function Srch_SU$$L($p0,$p1){var $v_0=$p0.searchBoxes;if(!Srch.U.n($v_0)&&$v_0.length>$p1){var $v_1=$v_0[$p1];if(!Srch.U.n($v_1)&&!Srch.U.n($v_1.get_searchBoxInputElement())){var $v_2=$v_1.get_searchBoxInputElement().value;return($v_2===$v_1.get_currentPrompt())?null:$v_2;}}
return null;}
Srch.SU.searchResultAlertMe=function Srch_SU$searchResultAlertMe(queryTerm,serializedQuery){var $v_0='Search: {0}';var $v_1=(new Date()).format('s');var $v_2=new SP.Utilities.UrlBuilder(SP.Utilities.VersionUtility.getLayoutsPageUrl('subnew.aspx'));$v_2.addKeyValueQueryString('ATName','OSS.Search');$v_2.addKeyValueQueryString('Title',String.format($v_0,queryTerm));$v_2.addKeyValueQueryString('Source',ajaxNavigate.get_href());var $v_3=document.createElement('form');$v_3.setAttribute('name','SearchAlertRegistration');$v_3.method='POST';$v_3.action=$v_2.get_url();var $v_4=document.createElement('input');$v_4.setAttribute('name','P_Query');$v_4.setAttribute('id','P_Query');$v_4.setAttribute('type','hidden');$v_4.setAttribute('value',serializedQuery);$v_3.appendChild($v_4);var $v_5=document.createElement('input');$v_5.setAttribute('name','P_LastNotificationTime');$v_5.setAttribute('id','P_LastNotificationTime');$v_5.setAttribute('type','hidden');$v_5.setAttribute('value',$v_1);$v_3.appendChild($v_5);document.body.appendChild($v_3);$v_3.submit();}
Srch.SU.ensurePeoplePickerRefinementInit=function Srch_SU$ensurePeoplePickerRefinementInit(peoplePickerElementId){var $v_0={};$v_0['PrincipalAccountType']='User,DL,SecGroup,SPGroup';$v_0['SearchPrincipalSource']=null;$v_0['ResolvePrincipalSource']=16;$v_0['AllowMultipleValues']=false;$v_0['InitialHelpText']=Srch.U.loadResource('rf_RefinementLabel_EnterName');$v_0['Width']='133px';$v_0['OnUserResolvedClientScript']=Srch.RefinementUtil.authorRefinerResolved;EnsureScriptFunc('clienttemplates.js','SPClientTemplates',function(){EnsureScriptFunc('clientforms.js','SPClientPeoplePicker_InitStandaloneControlWrapper',function(){SPClientForms.ClientFormManager.RegisterClientForm('aspnetForm');SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId,null,$v_0);});});}
Srch.SU.getSectionsForDisplay=function Srch_SU$getSectionsForDisplay(hitHighlightedSectionNames,numberOfSectionsToDisplay,sectionIndexesToDisplay){if(Srch.U.n(sectionIndexesToDisplay)||sectionIndexesToDisplay.length>0){return false;}
var $v_0=false;if(!Srch.U.n(hitHighlightedSectionNames)&&hitHighlightedSectionNames.length>0){var $v_1=0;for(var $v_2=0;($v_1<numberOfSectionsToDisplay)&&($v_2<hitHighlightedSectionNames.length);++$v_2){var $v_3=hitHighlightedSectionNames[$v_2];if(Srch.U.e($v_3)){continue;}
var $v_4=false;if($v_3.indexOf(Srch.U.hitHighlightingOpenTag)>=0){$v_4=true;}
if(sectionIndexesToDisplay.length===numberOfSectionsToDisplay){if(!$v_4){continue;}
for(var $v_5=sectionIndexesToDisplay.length-1;$v_5>=0;$v_5-=1){var $v_6=sectionIndexesToDisplay[$v_5];if(hitHighlightedSectionNames[$v_6].indexOf(Srch.U.hitHighlightingOpenTag)<0){sectionIndexesToDisplay.splice($v_5,1);break;}}}
sectionIndexesToDisplay.push($v_2);if($v_4){++$v_1;}}
$v_0=true;}
if(Srch.U.n(sectionIndexesToDisplay)||sectionIndexesToDisplay.length<1){for(var $v_7=0;$v_7<numberOfSectionsToDisplay;++$v_7){sectionIndexesToDisplay.push($v_7);}
$v_0=false;}
return $v_0;}
Srch.CU=function Srch_CU(){}
Srch.CU.getStringFromValue=function Srch_CU$getStringFromValue(valueInfo){if(Srch.U.n(valueInfo)||Srch.U.n(valueInfo.value)||Srch.U.w(valueInfo.managedPropertyName)){return'';}
var $v_0=valueInfo.value.toString();var $v_1=valueInfo.managedPropertyName;if(Srch.U.w($v_0)){return'';}
var $v_2=$v_1.substring(4,7);if($v_2==='DAT'){var $v_3=new Date(Date.parse($v_0.replace('-','/').replace('T',' ').replace('Z','UTC')));if(!Srch.U.n($v_3)){return $v_3.toString();}}
return(valueInfo.isEntity&&!Srch.U.w(valueInfo.entityLabel))?SP.Utilities.HttpUtility.htmlEncode(valueInfo.entityLabel.toString()):Srch.U.getTrimmedString($v_0,Srch.U.titleTruncationLength);}
Srch.CU.getManagedPropertiesForCatalogItem=function Srch_CU$getManagedPropertiesForCatalogItem(cc){if(Srch.U.n(cc)){return null;}
var $v_0=null;if(Srch.DisplayControl.isInstanceOfType(cc)){var $v_2=cc;$v_0=$v_2.get_dataProvider().get_refinementInfo();}
else if(Srch.DataProvider.isInstanceOfType(cc)){var $v_3=cc;$v_0=$v_3.get_refinementInfo();}
if(Srch.U.n($v_0)){return null;}
var $v_1=$v_0['ManagedProperties'];if(!Srch.U.n($v_1)){var $v_4='People';for(var $$arr_6=$v_1,$$len_7=$$arr_6.length,$$idx_8=0;$$idx_8<$$len_7;++$$idx_8){var $v_5=$$arr_6[$$idx_8];var $v_6=$v_5['RefinementValue'];if(!Srch.U.e($v_6)&&!Srch.U.isInArray(Srch.CU.$E,$v_6)){if($v_4.length>0){$v_4+=',';}
$v_4+=$v_6;}}
return $v_4;}
return null;}
Srch.CU.executeCatalogPickerQuery=function Srch_CU$executeCatalogPickerQuery(itemID,resultSectionid,managedProperties,moreLink){var $v_0=Srch.ScriptApplicationManager.get_clientRuntimeContext();if(!Srch.U.n($v_0)&&!Srch.U.w(managedProperties)){var $v_1=$get(resultSectionid);if(!Srch.U.n(itemID)){moreLink.innerHTML='Loading...';var $v_2=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_0);var $v_3=managedProperties.split(',');var $v_4='path:'+itemID;Srch.CU.$K($v_2,$v_4,$v_3);var $v_5=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_0);var $v_6=$v_5.executeQuery($v_2);$v_0.executeQueryAsync(function($p1_0,$p1_1){Srch.U.trace(null,'Morecatalog','Success');var $v_7=$v_6.get_value();if(!Srch.U.n($v_7)){var $v_8=$v_6.get_value();Srch.CU.processCatalogResult($v_8,$v_1,$v_3,moreLink);}},function($p1_0,$p1_1){Srch.U.trace(null,'MoreCatalog','failure');});}}}
Srch.CU.processCatalogResult=function Srch_CU$processCatalogResult(resultTableCollection,resultSection,mpArray,moreLink){if(Srch.U.n(resultTableCollection)){return;}
var $v_0=resultTableCollection['ResultTables'];if(!Srch.U.n($v_0)&&$v_0.length>0){Srch.U.trace(null,'MoreCatalog','New results came');for(var $v_1=0;$v_1<$v_0.length;$v_1++){var $v_2=$v_0[$v_1];if(!Srch.U.n($v_2)&&Srch.U.isTableTypeof($v_2,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){var $v_3=$v_2['ResultRows'];if($v_3.length<=0){Srch.U.trace(null,'MoreCatalog','No info was returned');break;}
if($v_3.length>1){Srch.U.trace(null,'MoreCatalog','More than 1 result was returned. Only the first one will be used');}
var $v_4='';var $v_5=$v_3[0];for(var $$arr_A=mpArray,$$len_B=$$arr_A.length,$$idx_C=0;$$idx_C<$$len_B;++$$idx_C){var $v_6=$$arr_A[$$idx_C];var $v_7=$v_5[$v_6];if(!Srch.U.n($v_7)){if(!Srch.U.n($v_4)){$v_4+='<br/>';}
var $v_8=new Srch.ValueInfo($v_7,$v_6);$v_8.overrideValueRenderer(Srch.CU.getStringFromValue);$v_4+=$v_6+': <b>'+$v_8.getRenderedValue()+'</b>';}}
resultSection.innerHTML=$v_4;}
else{Srch.U.trace(null,'MoreCatalog','A table was found that was not of type relevantresults');continue;}}}
moreLink.style.display='none';}
Srch.CU.$K=function Srch_CU$$K($p0,$p1,$p2){if(Srch.U.n($p0)){return;}
$p0.set_queryText($p1);$p0.get_sortList().clear();$p0.get_refinementFilters().clear();$p0.set_rowsPerPage(1);$p0.set_rowLimit(1);$p0.set_sourceId(new SP.Guid('8413CD39-2156-4E00-B54D-11EFD9ABDB89'));$p0.set_refiners('');$p0.get_selectProperties().clear();for(var $$arr_3=$p2,$$len_4=$$arr_3.length,$$idx_5=0;$$idx_5<$$len_4;++$$idx_5){var $v_0=$$arr_3[$$idx_5];if(Srch.ValueInfo.isAutoCreatedPropertyName($v_0)){$p0.get_selectProperties().add($v_0);}}}
Srch.PSU=function Srch_PSU(){}
Srch.PSU.documentsByQuery=function Srch_PSU$documentsByQuery(cc,name,rSec,hasInf,isExpQueryRule){var $v_0=Srch.ScriptApplicationManager.get_clientRuntimeContext();if(!Srch.U.n(cc)&&!Srch.U.n($v_0)&&!Srch.U.n(rSec)&&!Srch.U.w(name)){rSec.innerHTML=Srch.PSU.$6;var $v_1=null;if(Srch.DisplayControl.isInstanceOfType(cc)){var $v_B=cc;$v_1=$v_B.get_dataProvider().get_currentQueryState().k;}
else if(Srch.DataProvider.isInstanceOfType(cc)){var $v_C=cc;$v_1=$v_C.get_currentQueryState().k;}
name=name.toLowerCase().trim();var $v_2=' Author:\"'+name+'\"';var $v_3=false;if(!Srch.U.e($v_1)){var $v_D=false;$v_1=$v_1.toLowerCase().trim();var $v_E=$v_1.split(' ');for(var $$arr_D=$v_E,$$len_E=$$arr_D.length,$$idx_F=0;$$idx_F<$$len_E;++$$idx_F){var $v_F=$$arr_D[$$idx_F];if(!Srch.U.e($v_F)&&name.indexOf($v_F)!==-1){$v_D=true;break;}}
if(!$v_D){$v_2=$v_1+$v_2;$v_3=true;}
else{$v_2=name+$v_2+Srch.PSU.$C;}}
var $v_4=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_0);Srch.PSU.$2($v_4,$v_2,Srch.PSU.$1,Srch.PSU.$G,Srch.PSU.$F,isExpQueryRule);var $v_5=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_0);var $v_6=new SP.ExceptionHandlingScope($v_0);var $v_7=null;var $v_8=null;var $v_9=null;var $v_A=null;try{$v_7=$v_6.startScope();try{$v_8=$v_6.startTry();$v_A=$v_5.executeQuery($v_4);}
finally{if(!Srch.U.n($v_8)){$v_8.dispose();}}
try{$v_9=$v_6.startCatch();}
finally{if(!Srch.U.n($v_9)){$v_9.dispose();}}}
finally{if(!Srch.U.n($v_7)){$v_7.dispose();}}
$v_0.executeQueryAsync(function($p1_0,$p1_1){if($v_6.get_hasException()){Srch.U.trace(null,'DocumentsByQuery','failure');Srch.PSU.$9(rSec,hasInf);}
else{if(!Srch.U.n($v_A)){Srch.U.trace(null,'DocumentsByQuery','Success');Srch.PSU.$P($v_A.get_value(),rSec,hasInf,$v_3,name,$v_1);}
else{Srch.U.trace(null,'DocumentsByQuery','No results returned');Srch.PSU.$9(rSec,hasInf);}}},function($p1_0,$p1_1){Srch.U.trace(null,'DocumentsByQuery','failure');Srch.PSU.$9(rSec,hasInf);});}}
Srch.PSU.relatedThroughByQuery=function Srch_PSU$relatedThroughByQuery(cc,userId,queryUserId,rSecId,hasInf){var $v_0=Srch.ScriptApplicationManager.get_clientRuntimeContext();var $v_1=$get(rSecId);if(!Srch.U.n(cc)&&!Srch.U.n($v_0)&&!Srch.U.n(userId)&&!Srch.U.n($v_1)&&!Srch.U.n(queryUserId)){var $v_2='FirstLevelColleagues:'+queryUserId+' AND USERPROFILE_GUID:'+userId;var $v_3=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_0);Srch.PSU.$2($v_3,$v_2,Srch.PSU.$4,Srch.PSU.$7,Srch.PSU.$5,false);var $v_4=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_0);var $v_5=new SP.ExceptionHandlingScope($v_0);var $v_6=null;var $v_7=null;var $v_8=null;var $v_9=null;try{$v_6=$v_5.startScope();try{$v_7=$v_5.startTry();$v_9=$v_4.executeQuery($v_3);}
finally{if(!Srch.U.n($v_7)){$v_7.dispose();}}
try{$v_8=$v_5.startCatch();}
finally{if(!Srch.U.n($v_8)){$v_8.dispose();}}}
finally{if(!Srch.U.n($v_6)){$v_6.dispose();}}
$v_0.executeQueryAsync(function($p1_0,$p1_1){if($v_5.get_hasException()){Srch.U.trace(null,'RelatedThroughByQuery','failure');}
else{if(!Srch.U.n($v_9)){var $v_A=true;var $v_B=$v_9.get_value();if(!Srch.U.n($v_B)){var $v_C=$v_B[Srch.U.PropNames.resultTables];if(!Srch.U.n($v_C)&&$v_C.length>0){for(var $v_D=0;$v_D<$v_C.length;$v_D++){var $v_E=$v_C[$v_D];if(!Srch.U.n($v_E)&&Srch.U.isTableTypeof($v_E,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){var $v_F=$v_E[Srch.U.PropNames.resultRows];if(Srch.U.n($v_F)||$v_F.length<1){Srch.U.trace(null,'FirstLevelColleagues','No results returned');$v_A=false;break;}
break;}}}}
if(!$v_A){Srch.PSU.$V(cc,userId,queryUserId,rSecId,hasInf);}
else{Srch.U.trace(null,'RelatedThroughByQuery','Firstlevel results returned');}}
else{Srch.U.trace(null,'RelatedThroughByQuery','Firstlevel result object null');}}},function($p1_0,$p1_1){Srch.U.trace(null,'RelatedThroughByQuery','failure');});}}
Srch.PSU.$V=function Srch_PSU$$V($p0,$p1,$p2,$p3,$p4){var $v_0=Srch.ScriptApplicationManager.get_clientRuntimeContext();var $v_1=$get($p3);if(!Srch.U.n($p0)&&!Srch.U.n($v_0)&&!Srch.U.n($v_1)&&!Srch.U.n($p1)&&!Srch.U.n($p2)){$v_1.innerHTML=Srch.PSU.$6;var $v_2='FirstLevelColleagues:'+$p2+' AND FirstLevelMutualFollowings:'+$p1;var $v_3=false;var $v_4=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_0);Srch.PSU.$2($v_4,$v_2,Srch.PSU.$4,Srch.PSU.$7,Srch.PSU.$5,false);var $v_5=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_0);var $v_6=new SP.ExceptionHandlingScope($v_0);var $v_7=null;var $v_8=null;var $v_9=null;var $v_A=null;try{$v_7=$v_6.startScope();try{$v_8=$v_6.startTry();$v_A=$v_5.executeQuery($v_4);}
finally{if(!Srch.U.n($v_8)){$v_8.dispose();}}
try{$v_9=$v_6.startCatch();}
finally{if(!Srch.U.n($v_9)){$v_9.dispose();}}}
finally{if(!Srch.U.n($v_7)){$v_7.dispose();}}
$v_0.executeQueryAsync(function($p1_0,$p1_1){if($v_6.get_hasException()){Srch.U.trace(null,'SecondLevelColleagueByQuery','failure');}
else{if(!Srch.U.n($v_A)){Srch.U.trace(null,'SecondLevelColleagueByQuery','Success');Srch.PSU.$N($v_A.get_value(),$v_1,$p4,$v_3,$p1,$p2);}
else{Srch.U.trace(null,'SecondLevelColleagueByQuery','No SecondLevel results returned');}}},function($p1_0,$p1_1){Srch.U.trace(null,'SecondLevelColleagueByQuery','failure');});}}
Srch.PSU.$P=function Srch_PSU$$P($p0,$p1,$p2,$p3,$p4,$p5){if(Srch.U.n($p1)){return;}
var $v_0=null;var $v_1=0;var $v_2=0;if(!Srch.U.n($p0)){var $v_3=$p0[Srch.U.PropNames.resultTables];if(!Srch.U.n($v_3)&&$v_3.length>0){for(var $v_4=0;$v_4<$v_3.length;$v_4++){var $v_5=$v_3[$v_4];if(!Srch.U.n($v_5)&&Srch.U.isTableTypeof($v_5,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){var $v_6=$v_5[Srch.U.PropNames.resultRows];if(Srch.U.n($v_6)||$v_6.length<1){Srch.U.trace(null,'DocumentsByQuery','No results returned');break;}
$v_1=$v_5[Srch.U.PropNames.totalRows];$v_2=$v_5[Srch.U.PropNames.rowCount];for(var $$arr_D=$v_6,$$len_E=$$arr_D.length,$$idx_F=0;$$idx_F<$$len_E;++$$idx_F){var $v_7=$$arr_D[$$idx_F];if(Srch.U.n($v_7)){continue;}
if(Srch.U.n($v_0)){$v_0=[];}
Srch.U.appendArray($v_0,$v_7);}
break;}}}}
$p1.innerHTML='';if(!Srch.U.n($v_0)&&$v_0.length>0){var $v_8='<li id=\"AuthoredDocumentsField\"><div class=\"ms-srch-hover-subTitle\"><h3 class=\"ms-soften\">'+Srch.PSU.$B+'</h3></div>';$v_8+=' <div class=\"ms-srch-people-hover-AuthoredDocuments\">';var $v_9=0;for(var $$arr_J=$v_0,$$len_K=$$arr_J.length,$$idx_L=0;$$idx_L<$$len_K;++$$idx_L){var $v_A=$$arr_J[$$idx_L];if($v_9>2){break;}
var $v_B=SP.Utilities.HttpUtility.htmlEncode($v_A['Title'].toString());var $v_C=null;if(!Srch.U.n($v_A['HitHighlightedProperties'])){var $v_F=Srch.U.createXMLDocument('<root>'+$v_A['HitHighlightedProperties'].toString()+'</root>');$v_C=Srch.U.getSingleHHXMLNodeValue($v_F,'HHTitle');if(Srch.U.e($v_C)){$v_C=$v_B;}}
var $v_D=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol($v_A['Path'].toString()));if(Srch.U.e($v_B)||Srch.U.e($v_D)){continue;}
var $v_E='<div id=\"DocumentCard\" class=\"ms-srch-hover-text ms-srch-people-hover-ellipsis\"><img id=\"Icon\" src=\"'+Srch.U.getIconUrlByFileExtension($v_A,Srch.PSU.$D)+'\" />'+'<a id=\"TitleLink\" href=\"'+$v_D+'\" title=\"'+$v_B+'\">'+$v_C+'</a></div>';$v_8+=$v_E;}
if($v_1>$v_2){var $v_G=(('searchCenterUrl')in Srch.ScriptApplicationManager.get_current().states)?Srch.ScriptApplicationManager.get_current().states['searchCenterUrl']:null;if(!Srch.U.e($v_G)){var $v_H=null;if($p3){$v_H=String.format('{0}?k={1} Author:\"{2}\"',Srch.PSU.$A,SP.Utilities.HttpUtility.urlKeyValueEncode($p5),SP.Utilities.HttpUtility.urlKeyValueEncode($p4));}
else{$v_H=String.format('{0}?k={1} Author:\"{1}\"',Srch.PSU.$A,SP.Utilities.HttpUtility.urlKeyValueEncode($p4));}
var $v_I=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol(Srch.U.concatUrl($v_G,$v_H)));if(!Srch.U.e($v_I)){var $v_J='<div id=\"MoreInfo\" class=\"ms-srch-hover-text ms-secondaryCommandLink\"><a id=\"MoreLink\" href=\"'+$v_I+'\" title=\"'+Srch.PSU.$3+'\">'+Srch.PSU.$3+'</a></div>';$v_8+=$v_J;}}}
$v_8+='</div></li>';$p1.innerHTML=$v_8;$v_9++;}}
Srch.PSU.$N=function Srch_PSU$$N($p0,$p1,$p2,$p3,$p4,$p5){if(Srch.U.n($p1)){return;}
var $v_0=null;var $v_1=0;var $v_2=0;if(!Srch.U.n($p0)){var $v_3=$p0[Srch.U.PropNames.resultTables];if(!Srch.U.n($v_3)&&$v_3.length>0){for(var $v_4=0;$v_4<$v_3.length;$v_4++){var $v_5=$v_3[$v_4];if(!Srch.U.n($v_5)&&Srch.U.isTableTypeof($v_5,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){var $v_6=$v_5[Srch.U.PropNames.resultRows];if(Srch.U.n($v_6)||$v_6.length<1){Srch.U.trace(null,'SecondLevelColleagueByQuery','No results returned');break;}
$v_1=$v_5[Srch.U.PropNames.totalRows];$v_2=$v_5[Srch.U.PropNames.rowCount];for(var $$arr_D=$v_6,$$len_E=$$arr_D.length,$$idx_F=0;$$idx_F<$$len_E;++$$idx_F){var $v_7=$$arr_D[$$idx_F];if(Srch.U.n($v_7)){continue;}
if(Srch.U.n($v_0)){$v_0=[];}
Srch.U.appendArray($v_0,$v_7);}
break;}}}}
$p1.innerHTML='';if(Srch.U.n($v_0)||$v_0.length<1){if(!$p2){$p1.innerHTML=Srch.PSU.$8;}}
else{var $v_8='<li id=\"ColleaguesInfoField\"><div class=\"ms-srch-hover-subTitle\"><h3 class=\"ms-soften\">'+Srch.PSU.$I+'</h3></div>';$v_8+=' <div class=\"ms-srch-people-hover-RelatedThrough\">';var $v_9=0;for(var $$arr_J=$v_0,$$len_K=$$arr_J.length,$$idx_L=0;$$idx_L<$$len_K;++$$idx_L){var $v_A=$$arr_J[$$idx_L];if($v_9>2){break;}
var $v_B=SP.Utilities.HttpUtility.htmlEncode($v_A['PreferredName'].toString());var $v_C=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol($v_A['Path'].toString()));if(Srch.U.e($v_B)||Srch.U.e($v_C)){continue;}
var $v_D='<div id=\"RelatedThroughCard\" class=\"ms-srch-hover-text ms-srch-people-hover-ellipsis\"><a id=\"NameLink\" href=\"'+$v_C+'\" title=\"'+$v_B+'\">'+$v_B+'</a></div>';$v_8+=$v_D;}
if($v_1>$v_2){var $v_E=(('searchCenterUrl')in Srch.ScriptApplicationManager.get_current().states)?Srch.ScriptApplicationManager.get_current().states['searchCenterUrl']:null;if(!Srch.U.e($v_E)){var $v_F=String.format('{0}?k=FirstLevelColleagues:{1} AND FirstLevelMutualFollowings:{2}',Srch.PSU.$H,SP.Utilities.HttpUtility.urlKeyValueEncode($p5),SP.Utilities.HttpUtility.urlKeyValueEncode($p4));var $v_G=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol(Srch.U.concatUrl($v_E,$v_F)));if(!Srch.U.e($v_G)){var $v_H='<div id=\"MoreInfo\" class=\"ms-srch-hover-text ms-secondaryCommandLink\"><a id=\"MoreLink\" href=\"'+$v_G+'\" title=\"'+Srch.PSU.$3+'\">'+Srch.PSU.$3+'</a></div>';$v_8+=$v_H;}}}
$v_8+='</div></li>';$p1.innerHTML=$v_8;$v_9++;}}
Srch.PSU.$9=function Srch_PSU$$9($p0,$p1){if(Srch.U.n($p0)){return;}
$p0.innerHTML='';if(!$p1){$p0.innerHTML=Srch.PSU.$8;}}
Srch.PSU.$2=function Srch_PSU$$2($p0,$p1,$p2,$p3,$p4,$p5){if(Srch.U.n($p0)||Srch.U.n($p1)){return;}
$p0.set_queryText($p1);$p0.get_sortList().clear();$p0.get_refinementFilters().clear();var $v_0=3;var $v_1=false;if(!Srch.U.n($p5)){$v_1=$p5;}
if($v_1){$v_0=5;$p0.get_refinementFilters().add('FileType:or(equals(\"doc\"),equals(\"docx\"),equals(\"docm\"),equals(\"ppt\"),equals(\"pptx\"),equals(\"pptm\"),equals(\"pdf\"))');}
$p0.set_rowsPerPage($v_0);$p0.set_rowLimit($v_0);if(!Srch.U.n($p2)){$p0.set_sourceId(new SP.Guid($p2));}
$p0.set_refiners('');$p0.get_selectProperties().clear();if(!Srch.U.n($p3)){for(var $$arr_8=$p3,$$len_9=$$arr_8.length,$$idx_A=0;$$idx_A<$$len_9;++$$idx_A){var $v_2=$$arr_8[$$idx_A];$p0.get_selectProperties().add($v_2);}}
$p0.get_hitHighlightedProperties().clear();if(!Srch.U.n($p4)){for(var $$arr_C=$p4,$$len_D=$$arr_C.length,$$idx_E=0;$$idx_E<$$len_D;++$$idx_E){var $v_3=$$arr_C[$$idx_E];$p0.get_hitHighlightedProperties().add($v_3);}}
$p0.set_rankingModelId(Srch.PSU.$J);$p0.set_enableStemming(true);$p0.set_enablePhonetic(false);$p0.set_enableNicknames(false);$p0.set_enableInterleaving(false);$p0.set_enableQueryRules(false);$p0.set_processBestBets(false);$p0.set_clientType('CSOM');$p0.set_ignoreSafeQueryPropertiesTemplateUrl(true);}
Srch.SiteSearchUtil=function Srch_SiteSearchUtil(){}
Srch.SiteSearchUtil.populateSiteSearchResults=function Srch_SiteSearchUtil$populateSiteSearchResults(siteName,elementId,currentQuery){if(Srch.U.w(siteName)||Srch.U.w(elementId)){Srch.U.trace(null,'Site search','Argument is null or empty');return;}
if(Srch.U.n(currentQuery)){currentQuery='';}
var $v_0=String.format('path:\"{0}\" AND {1}',siteName,currentQuery);var $v_1=Srch.ScriptApplicationManager.get_clientRuntimeContext();if(Srch.U.n($v_1)){Srch.U.trace(null,'Site search','ScriptApplicationManager.ClientRuntimeContext was null.');return;}
var $v_2=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_1);var $v_3=['Title','FileExtension','Path'];var $v_4=['Title'];Srch.PSU.$2($v_2,$v_0,Srch.SiteSearchUtil.$1,$v_3,$v_4,false);var $v_5=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_1);var $v_6=new SP.ExceptionHandlingScope($v_1);var $v_7=null;var $v_8=null;var $v_9=null;var $v_A=null;try{$v_7=$v_6.startScope();try{$v_8=$v_6.startTry();$v_A=$v_5.executeQuery($v_2);}
finally{if(!Srch.U.n($v_8)){$v_8.dispose();}}
try{$v_9=$v_6.startCatch();}
finally{if(!Srch.U.n($v_9)){$v_9.dispose();}}}
finally{if(!Srch.U.n($v_7)){$v_7.dispose();}}
$v_1.executeQueryAsync(function($p1_0,$p1_1){if($v_6.get_hasException()){Srch.U.trace(null,'Site search','Failure due to exception.');}
else{var $v_B=$v_A.get_value();if(!Srch.U.n($v_B)){var $v_C=$v_A.get_value();Srch.SiteSearchUtil.$Q($v_C,elementId,$v_0);}}},function($p1_0,$p1_1){Srch.U.trace(null,'Site search','Failure in ExecuteQueryAsync.');});}
Srch.SiteSearchUtil.$Q=function Srch_SiteSearchUtil$$Q($p0,$p1,$p2){if(Srch.U.n($p0)){Srch.U.trace(null,'Site search','Result table collection was null.');return;}
var $v_0=$p0['ResultTables'];if(Srch.U.n($v_0)||!$v_0.length){Srch.U.trace(null,'Site search','No results were returned.');return;}
Srch.U.trace(null,'Site search','Received result tables.');var $v_1=$get($p1);var $v_2='';var $v_3=0;var $v_4=3;for(var $v_5=0;$v_5<$v_0.length&&$v_3<=$v_4;$v_5++){var $v_6=$v_0[$v_5];if(Srch.U.n($v_6)){Srch.U.trace(null,'Site search','Result table was null.');continue;}
if(!Srch.U.isTableTypeof($v_6,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){Srch.U.trace(null,'Site search','A table was found that was not of type RelevantResults');continue;}
var $v_7=$v_6['ResultRows'];if(Srch.U.n($v_7)||$v_7.length<=0){Srch.U.trace(null,'Site search','RelevantResults table did not contain any rows.');break;}
for(var $v_8=0;$v_8<$v_7.length&&$v_3<=$v_4;++$v_8){var $v_9=$v_7[$v_8];if(Srch.U.n($v_9)){Srch.U.traceFormatted(null,'Site search','Result row {0} was null.',$v_8);continue;}
var $v_A='';if(!Srch.U.n($v_9['Title'])){$v_A=$v_9['Title'].toString();}
var $v_B='';if(!Srch.U.n($v_9['HitHighlightedProperties'])){$v_B=Srch.U.getHighlightedProperty($p1+$v_8,$v_9,'Title');}
var $v_C='';if(!Srch.U.n($v_9['FileExtension'])){$v_C=$v_9['FileExtension'].toString();}
var $v_D='';if(!Srch.U.n($v_9['Path'])){$v_D=$v_9['Path'].toString();}
if(!$v_3){var $v_I=SP.Utilities.HttpUtility.htmlEncode(Srch.Res.hp_WebPageItem_Results);$v_2+='<div class=\"ms-srch-hover-subTitle\"><h3 class=\"ms-soften\">'+$v_I+'</h3></div>';}
var $v_E=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol(Srch.U.getIconUrlByFileExtension($v_9,null)));var $v_F=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol($v_D));var $v_G=SP.Utilities.HttpUtility.htmlEncode($v_A);if(Srch.U.e($v_B)){$v_B=$v_G;}
var $v_H='<div class=\"ms-srch-hover-text ms-srch-ellipsis ms-srch-hover-site-results\"><img class=\'ms-srch-hover-site-icon-result\' src=\"'+$v_E+'\" />'+'<a href=\"'+$v_F+'\" title=\"'+$v_G+'\">'+$v_B+'</a></div>';$v_2+=$v_H;$v_3++;}}
if(!$v_3){Srch.U.hideElement($v_1);}
else{$v_1.innerHTML+=$v_2;}}
Srch.SSU=function Srch_SSU(){}
Srch.SSU.renderPersona=function Srch_SSU$renderPersona(username,personaElementID){if(Srch.U.w(personaElementID)){Srch.U.trace(null,'RenderPersona','personaElementID was null or empty.');return;}
var $v_0=$get(personaElementID);if(Srch.U.n($v_0)){Srch.U.traceFormatted(null,'RenderPersona','Document.GetElementById returned null for id \'{0}\'.',personaElementID);return;}
Srch.U.ensureCSSClassNameExist($v_0,'ms-srch-display-none');EnsureScriptFunc('SP.UI.MySiteCommon.js','SP.UI.People.MySitePeopleUtilities',function(){EnsureScriptFunc('clienttemplates.js','RenderUserFieldWorker',function(){var $v_1=Srch.ScriptApplicationManager.get_clientRuntimeContext();var $v_2=new SP.UserProfiles.PeopleManager($v_1);var $v_3=$v_2.getPropertiesFor(username);if(Srch.U.n($v_3)){Srch.U.traceFormatted(null,'RenderPersona','PeopleManager returned a null PersonProperties for username \'{0}\'',username);return;}
var $v_4=['DisplayName','AccountName','PictureUrl','Email'];$v_1.load($v_3,$v_4);$v_1.executeQueryAsync(function(){var $v_5='';if($v_3.isPropertyAvailable('DisplayName')){$v_5=$v_3.get_displayName();}
var $v_6='';if($v_3.isPropertyAvailable('Email')){$v_6=$v_3.get_email();}
var $v_7='';if($v_3.isPropertyAvailable('PictureUrl')){$v_7=$v_3.get_pictureUrl();}
var $v_8=new ContextInfo();$v_8.Templates={};$v_8.Templates['Fields']={};var $v_9={};$v_9['PictureOnly']='1';$v_9['PictureSize']='Size_48px';var $v_A={};$v_A['EffectivePresenceEnabled']='1';$v_A['PresenceAlt']='No presence information';var $v_B={};$v_B['title']=SP.Utilities.HttpUtility.ecmaScriptStringLiteralEncode($v_5);$v_B['email']=SP.Utilities.HttpUtility.ecmaScriptStringLiteralEncode($v_6);$v_B['picture']=SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol($v_7));var $v_C=$get(personaElementID+Srch.SSU.microBlogTitleIdSuffix);if(!Srch.U.n($v_C)){$v_C.innerHTML=SP.Utilities.HttpUtility.htmlEncode($v_5);}
$v_0.innerHTML=RenderUserFieldWorker($v_8,$v_9,$v_B,$v_A);Srch.U.ensureCSSClassNameNotExist($v_0,'ms-srch-display-none');if($v_0.offsetWidth<Srch.U.personaControlRenderedThreshold){Srch.U.ensureCSSClassNameExist($v_0,'ms-srch-display-none');}
ProcessImn();},function(){Srch.U.traceFormatted(null,'RenderPersona','RenderPersona','Failed to retrieve information for user \'{0}\'',username);});});});}
Srch.SSU.populatePostsByQuery=function Srch_SSU$populatePostsByQuery(cc,queryText,headerElementID,sorts,personaElementIDs,textContainerIDs,textElementType,maxBodyLengthInChars){if(Srch.U.n(cc)||Srch.U.w(queryText)||Srch.U.n(personaElementIDs)||Srch.U.n(textContainerIDs)||Srch.U.n(textElementType)||Srch.U.n(maxBodyLengthInChars)){Srch.U.trace(null,'PopulatePostsByQuery','Argument null');return;}
if(personaElementIDs.length!==textContainerIDs.length){Srch.U.traceFormatted(null,'PopulatePostsByQuery','Persona element ID array length was {0}, text container ID array length was {1}. They must be equal.',personaElementIDs.length,textContainerIDs.length);return;}
if(maxBodyLengthInChars<0){Srch.U.trace(null,'PopulatePostsByQuery','Supplied max body length was negative. Must be 0 or greater.');return;}
var $v_0=Srch.ScriptApplicationManager.get_clientRuntimeContext();if(Srch.U.n($v_0)){Srch.U.trace(null,'PopulatePostsByQuery','ScriptApplicationManager.ClientRuntimeContext was null.');return;}
var $v_1=Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject($v_0);var $v_2=['Title','Path','AuthorOWSUSER','PostAuthor','DiscussionPost','LastModifiedTime','ReplyCount','LikesCount','Created','FullPostBody'];var $v_3=['Title'];Srch.PSU.$2($v_1,queryText,Srch.SSU.$1,$v_2,$v_3,false);if(!Srch.U.n(sorts)&&sorts.length>0){for(var $v_A=0;$v_A<sorts.length;$v_A++){var $v_B=sorts[$v_A];if(!Srch.U.n($v_B)){$v_1.get_sortList().add($v_B.p,$v_B.d);}}}
var $v_4=Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject($v_0);var $v_5=new SP.ExceptionHandlingScope($v_0);var $v_6=null;var $v_7=null;var $v_8=null;var $v_9=null;try{$v_6=$v_5.startScope();try{$v_7=$v_5.startTry();$v_9=$v_4.executeQuery($v_1);}
finally{if(!Srch.U.n($v_7)){$v_7.dispose();}}
try{$v_8=$v_5.startCatch();}
finally{if(!Srch.U.n($v_8)){$v_8.dispose();}}}
finally{if(!Srch.U.n($v_6)){$v_6.dispose();}}
$v_0.executeQueryAsync(function($p1_0,$p1_1){if($v_5.get_hasException()){Srch.U.trace(null,'PopulatePostsByQuery','Failure due to exception.');}
else{var $v_C=$v_9.get_value();if(!Srch.U.n($v_C)){var $v_D=$v_9.get_value();Srch.SSU.$O($v_D,headerElementID,personaElementIDs,textContainerIDs,textElementType,maxBodyLengthInChars);}}},function($p1_0,$p1_1){Srch.U.trace(null,'PopulatePostsByQuery','Failure in ExecuteQueryAsync.');});}
Srch.SSU.getEncodedSocialMetadataString=function Srch_SSU$getEncodedSocialMetadataString(replyCount,likesCount){if(replyCount<0||likesCount<0){return'';}
var $v_0='<span class=\'ms-srch-metadataText-emphasis\'>'+SP.Utilities.HttpUtility.htmlEncode(replyCount.toString())+'</span>';if(replyCount===1){$v_0=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_Reply),$v_0);}
else if(replyCount>1){$v_0=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_Replies),$v_0);}
else{$v_0=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_NoReplies),$v_0);}
var $v_1='<span class=\'ms-srch-metadataText-emphasis\'>'+SP.Utilities.HttpUtility.htmlEncode(likesCount.toString())+'</span>';if(likesCount===1){$v_1=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_Like),$v_1);}
else if(likesCount>1){$v_1=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_Likes),$v_1);}
else{$v_1=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_NoLikes),$v_1);}
var $v_2=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_RepliesAndLikes),$v_0,$v_1);return $v_2;}
Srch.SSU.$O=function Srch_SSU$$O($p0,$p1,$p2,$p3,$p4,$p5){if(Srch.U.n($p0)){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','Result table collection was null.');return;}
if(Srch.U.n($p2)||Srch.U.n($p3)||($p2.length!==$p3.length)){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','Element ID arrays were invalid.');return;}
var $v_0=$p0['ResultTables'];if(Srch.U.n($v_0)||!$v_0.length){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','No results were returned.');return;}
Srch.U.trace(null,'ProcessDiscussionPostQueryResult','Received result tables.');for(var $v_1=0;$v_1<$v_0.length;$v_1++){var $v_2=$v_0[$v_1];if(Srch.U.n($v_2)){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','Result table was null.');continue;}
if(!Srch.U.isTableTypeof($v_2,Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.relevantResults)){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','A table was found that was not of type RelevantResults');continue;}
var $v_3=$v_2['ResultRows'];if(Srch.U.n($v_3)||$v_3.length<=0){Srch.U.trace(null,'ProcessDiscussionPostQueryResult','RelevantResults table did not contain any rows.');break;}
if($v_3.length>$p3.length){Srch.U.traceFormatted(null,'ProcessDiscussionPostQueryResult','{0} results requested, {1} results received. Only {0} will be used.',$p3.length,$v_3.length);}
var $v_4=$get($p1);if(Srch.U.n($v_4)){Srch.U.trace(null,'ProcessDiscussionPostQueryResult',String.format('Header element with supplied id \'{0}\' was null.',$p1));return;}
for(var $v_5=0;$v_5<$v_3.length&&$v_5<$p3.length;++$v_5){var $v_6=$v_3[$v_5];if(Srch.U.n($v_6)){Srch.U.traceFormatted(null,'ProcessDiscussionPostQueryResult','Result row {0} was null.',$v_5);continue;}
var $v_7=$p2[$v_5];if(Srch.U.w($v_7)){Srch.U.traceFormatted(null,'ProcessDiscussionPostQueryResult','Persona element ID at index {0} was null or empty.',$v_5);continue;}
var $v_8=$p3[$v_5];if(Srch.U.w($v_8)){Srch.U.traceFormatted(null,'ProcessDiscussionPostQueryResult','Text container ID at index {0} was null or empty.',$v_5);continue;}
var $v_9='';if(!Srch.U.n($v_6['AuthorOWSUSER'])){$v_9=$v_6['AuthorOWSUSER'].toString();}
var $v_A=Srch.U.getDisplayNameFromAuthorField($v_9);var $v_B=Srch.U.getUsernameFromAuthorField($v_9);var $v_C='';if(!Srch.U.n($v_6['DiscussionPost'])){$v_C=$v_6['DiscussionPost'].toString();}
var $v_D='';if(!Srch.U.n($v_6['Created'])){$v_D=$v_6['Created'].toString();}
var $v_E=true;switch($p4){case 1:var $v_F='';if(!Srch.U.n($v_6['Title'])){$v_F=$v_6['Title'].toString();}
var $v_G='';if(!Srch.U.n($v_6['Path'])){$v_G=$v_6['Path'].toString();}
Srch.SSU.$S($v_8,$v_F,$v_A,$v_C,$p5,$v_D,$v_G);Srch.SSU.renderPersona($v_B,$v_7);break;case 2:var $v_H=-1;var $v_I=-1;if(!Srch.U.n($v_6['ReplyCount'])){$v_H=parseInt($v_6['ReplyCount'].toString());$v_I=0;}
if(!Srch.U.n($v_6['LikesCount'])){$v_I=parseInt($v_6['LikesCount'].toString());if($v_H<0){$v_H=0;}}
Srch.SSU.$T($v_8,Srch.U.getDisplayNameFromAuthorField($v_9),$v_C,$p5,$v_D,$v_H,$v_I);Srch.SSU.renderPersona($v_B,$v_7);break;case 3:$v_C='';if(!Srch.U.n($v_6['FullPostBody'])){$v_C=$v_6['FullPostBody'].toString();}
$v_B='';if(!Srch.U.n($v_6['PostAuthor'])){$v_B=$v_6['PostAuthor'].toString();}
Srch.SSU.$U($v_8,$v_C,$p5,$v_D);Srch.SSU.renderPersona($v_B,$v_7);break;default:Srch.U.trace(null,'ProcessDiscussionPostQueryResult','Unknown TextElementType.');$v_E=false;break;}
if($v_E){Srch.U.ensureCSSClassNameNotExist($v_4,'ms-srch-display-none');}}}}
Srch.SSU.$T=function Srch_SSU$$T($p0,$p1,$p2,$p3,$p4,$p5,$p6){EnsureScriptFunc('sp.datetimeutil.js','SP.DateTimeUtil.SPRelativeDateTime',function(){var $v_0=$get($p0);if(Srch.U.n($v_0)){Srch.U.traceFormatted(null,'GetDiscussionPostMarkup','Text container with supplied id \'{0}\' was null.',$p0);return;}
var $v_1='';$v_1+='<h3>'+SP.Utilities.HttpUtility.htmlEncode($p1)+'</h3>';$v_1+='<div class=\"ms-srch-hover-text ms-srch-hover-postText\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode(Srch.U.truncateEnd($p2,$p3));$v_1+='</div>';$v_1+='<div class=\"ms-metadata\">';if(!Srch.U.w($p4)){var $v_2=new Date($p4);var $v_3=Srch.U.getFriendlyTimeInterval($v_2,Srch.U.getCalendarType());$v_1+='<span class=\"ms-srch-hover-dateMetadata\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode($v_3);$v_1+='</span>';}
if($p5>=0&&$p6>=0){$v_1+='<span class=\"ms-srch-hover-popularityMetadata\">';$v_1+=Srch.SSU.getEncodedSocialMetadataString($p5,$p6);$v_1+='</span>';}
$v_1+='</div>';$v_0.innerHTML=$v_1;});}
Srch.SSU.$S=function Srch_SSU$$S($p0,$p1,$p2,$p3,$p4,$p5,$p6){EnsureScriptFunc('sp.datetimeutil.js','SP.DateTimeUtil.SPRelativeDateTime',function(){var $v_0=$get($p0);if(Srch.U.n($v_0)){Srch.U.traceFormatted(null,'RenderDiscussionMarkup','Text container with supplied id \'{0}\' was null.',$p0);return;}
var $v_1='';$v_1+='<div class=\"ms-srch-item-title\">';$v_1+='<h4 class=\"ms-srch-ellipsis\">';$v_1+='<a href=\"'+SP.Utilities.HttpUtility.htmlEncode(Srch.U.ensureAllowedProtocol($p6))+'\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode(Srch.U.trimTitle($p1,Srch.U.titleTruncationLength,2));$v_1+='</a>';$v_1+='</h4>';$v_1+='</div>';var $v_2='';if(!Srch.U.w($p5)){var $v_4=new Date($p5);$v_2=Srch.U.getFriendlyTimeInterval($v_4,Srch.U.getCalendarType());}
var $v_3='';if(!Srch.U.w($p2)){var $v_5='<span class=\'ms-srch-metadataText-emphasis\'>'+SP.Utilities.HttpUtility.htmlEncode($p2)+'</span>';if(!Srch.U.w($v_2)){$v_3=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_postAuthorDate),$v_5,SP.Utilities.HttpUtility.htmlEncode($v_2));}
else{$v_3=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_postAuthor),$v_5);}}
else if(!Srch.U.w($v_2)){$v_3=String.format(SP.Utilities.HttpUtility.htmlEncode(Srch.Res.item_postDate),SP.Utilities.HttpUtility.htmlEncode($v_2));}
$v_1+='<div class=\"ms-metadata ms-srch-hover-postAuthorMetadata\">'+$v_3+'</div>';$v_1+='<div class=\"ms-srch-hover-text ms-srch-hover-discussionText\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode(Srch.U.truncateEnd($p3,$p4));$v_1+='</div>';$v_1+='</div>';$v_0.innerHTML=$v_1;});}
Srch.SSU.$U=function Srch_SSU$$U($p0,$p1,$p2,$p3){EnsureScriptFunc('sp.datetimeutil.js','SP.DateTimeUtil.SPRelativeDateTime',function(){var $v_0=$get($p0);if(Srch.U.n($v_0)){Srch.U.traceFormatted(null,'GetDiscussionPostMarkup','Text container with supplied id \'{0}\' was null.',$p0);return;}
var $v_1='';$v_1+='<div class=\"ms-srch-hover-text ms-srch-hover-postText\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode(Srch.U.truncateEnd($p1,$p2));$v_1+='</div>';$v_1+='<div class=\"ms-metadata\">';if(!Srch.U.w($p3)){var $v_2=new Date($p3);var $v_3=Srch.U.getFriendlyTimeInterval($v_2,Srch.U.getCalendarType());$v_1+='<span class=\"ms-srch-hover-dateMetadata\">';$v_1+=SP.Utilities.HttpUtility.htmlEncode($v_3);$v_1+='</span>';}
$v_1+='</div>';$v_0.innerHTML+=$v_1;});}
Srch.SSU.TextElementType=function(){}
Srch.SSU.TextElementType.prototype={discussionElement:1,postElement:2,microblogElement:3}
Srch.SSU.TextElementType.registerEnum('Srch.SSU.TextElementType',false);Srch.SU.registerClass('Srch.SU');Srch.CU.registerClass('Srch.CU');Srch.PSU.registerClass('Srch.PSU');Srch.SiteSearchUtil.registerClass('Srch.SiteSearchUtil');Srch.SSU.registerClass('Srch.SSU');function searchui_scriptSharp_initialize(){Srch.SU.closeImage='closex.png';Srch.SU.followedImage='ratingsnew.png';Srch.SU.notFollowedImage='ratingsempty.png';Srch.SU.maxLinesForMultiValuedProperty=5;Srch.CU.$E=['owsqUSRUserAuthor','owsqUSRUserEditor','owsPeople','owstaxidmetadataalltagsinfo','owstaxIdSPLocationInfo','owstaxIdSPLocationList','owstaxIdSPLocationSite','owsmetadatafacetinfo','owsqBOLBooleanRobotsNoIndex','owsqCHOChoiceSitemapChangeFrequency'];Srch.PSU.$G=['FileExtension','Title','Path','HitHighlightedProperties'];Srch.PSU.$7=['PreferredName','Path'];Srch.PSU.$F=['Title'];Srch.PSU.$5=['PreferredName'];Srch.PSU.$J='8f6fd0bc-06f9-43cf-bbab-08c377e083f4';Srch.PSU.$6='<div class=\"ms-srch-people-hover-progress\"><img src=\"'+SP.Utilities.VersionUtility.getImageUrl('loadingcirclests16.gif')+'\" alt=\"\" title=\"\"/></div>';Srch.PSU.$3=SP.Utilities.HttpUtility.htmlEncode(Srch.Res.hp_PeopleItem_MoreItems);Srch.PSU.$B=SP.Utilities.HttpUtility.htmlEncode(Srch.Res.hp_PeopleItem_Authorship);Srch.PSU.$I=SP.Utilities.HttpUtility.htmlEncode(Srch.Res.hp_PeopleItem_RelatedThrough);Srch.PSU.$A=SP.Utilities.HttpUtility.urlPathEncode('results.aspx');Srch.PSU.$H=SP.Utilities.HttpUtility.urlPathEncode('peopleresults.aspx');Srch.PSU.$8='<li id=\"NoInfoField\"><div class=\"ms-srch-hover-subTitle ms-textSmall\">'+SP.Utilities.HttpUtility.htmlEncode(Srch.Res.hp_PeopleItem_NoInformationAvailable)+'</div></li>';Srch.PSU.$1='8413CD39-2156-4E00-B54D-11EFD9ABDB89';Srch.PSU.$4='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31';Srch.PSU.$D=SP.Utilities.VersionUtility.getImageUrl('generaldocument.png');Srch.PSU.$C=' XRANK(cb=5000.00) IsDocument=1';Srch.SiteSearchUtil.$1='8413CD39-2156-4E00-B54D-11EFD9ABDB89';Srch.SSU.$M='<img src=\"'+SP.Utilities.VersionUtility.getImageUrl('loadingcirclests16.gif')+'\" alt=\"\" title=\"\"/>';Srch.SSU.$1='8413CD39-2156-4E00-B54D-11EFD9ABDB89';Srch.SSU.$4='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31';Srch.SSU.$R='8f6fd0bc-06f9-43cf-bbab-08c377e083f4';Srch.SSU.microBlogTitleIdSuffix='_microBlogTitle';};searchui_scriptSharp_initialize();function HP_initialize(){HP=new function(){var _closeTimer=1000;var _null=null;var _px='px';var _popupClassname="ms-srch-hover-content";var _srchItemSelectedClassName="ms-srch-itemSelected";var _popupIdSuffix="_hoverContent";var _hoverArrowRTLClassname="ms-srch-hover-arrow-rtl";var _hoverArrowBorderRTLClassname="ms-srch-hover-arrowBorder-rtl";var _divIdWithScrollBar="s4-workspace";var _videoVerticalHoverLaunchPointQuerySelector=".ms-srchnav-more-glyph";var _siteViewerRTLClassName="ms-srch-hover-siteViewer-rtl";var _displayTemplateAttributeName="data-displaytemplate";var _displayTemplateName_VideoVertical="ITEM_VIDEOVERTICAL";var _minWidth=240;var _maxWidth=392;var _minWidthWideMode=335;var _maxWidthWideMode=389;var _minGap=10;var _itemOffset=22;var _defaultSpaceY=25;var _aspectRatio=4/3;var _verticalOffset=10;var _defaultPadding=40;var _defaultMargin=22;var _minScreenWidth=1182;var _minScreenHeight=768;var _startWACResize=887;var _minWACViewerWidth=352+_defaultPadding;var _maxWACViewerWidth=536+_defaultPadding;var _minWACViewerHeight=255+_defaultSpaceY;var _maxWACViewerHeight=402+_defaultSpaceY;var _minWACImageWidth=198+_defaultPadding;var _maxWACImageWidth=349+_defaultPadding;var _millisecondsInDay=1000*60*60*24;var _hoverArrowId="_hoverArrow";var _hoverArrowBorderId="_hoverArrowBorder";var _siteFrameWidth=1200;var _siteFrameHeight=900;var _defaultSpaceSiteY=120;var _minSiteViewerWidth=198+_defaultPadding;var _minSiteViewerHeight=148+_defaultSpaceSiteY;var L_time_Today=$resource("hp_NowDateTime_Today");var L_time_Yesterday=$resource("hp_NowDateTime_Yesterday");var L_time_DaysAgo=$resource("hp_NowDateTime_DaysAgo");var L_time_MonthAgo=$resource("hp_NowDateTime_MonthAgo");var L_time_MonthsAgo=$resource("hp_NowDateTime_MonthsAgo");var L_time_YearAgo=$resource("hp_NowDateTime_YearAgo");var L_time_YearsAgo=$resource("hp_NowDateTime_YearsAgo");var $id=_null;var $left=0;var $top=0;var $cTop=0;var $width=0;var $activePopup=_null;var $wideMode=false;var $activeOC=_null;var $activeCaption=_null;var $previewOnHideCallbacks=_null;this.ids={close:"_hoverClose",follow:"_hoverFollow",title:"_hoverTitle",fileType:"_hoverFileType",size:"_hoverSize",header:"_hoverCommonHeader",body:"_hoverCommonBody",actions:"_hoverCommonActions",viewsLifeTime:"_hoverViewsLifeTime",viewsRecent:"_hoverViewsRecent",inner:"_innerHover",content:"_hoverContent",arrowBorder:"_hoverArrowBorder",arrow:"_hoverArrow",modifiedDate:"_hoverLastModified",author:"_author",viewDuplicates:"_hoverViewDuplicates",parentLink:"_hoverParentLink",send:"_hoverSend",openClient:"_hoverOpenClient",open:"_hoverOpen",preview:"_hoverPreview",dimensions:"_hoverPictureDimensions",dateCreated:"_hoverDateCreated",viewer:"_hoverViewer",sectionName:"_hoverSectionName",siteLogo:"_hoverSiteLogo",siteDescription:"_hoverSiteDescription",noData:"_hoverNoData",summary:"_hoverSummary",peopleSkills:"_hoverPeopleSkills",peoplePastProjects:"_hoverPeoplePastProjects",peopleInterests:"_hoverPeopleInterests",peopleSchools:"_hoverPeopleSchools",peopleSummary:"_hoverPeopleSummary",peopleMemberships:"_hoverPeopleMemberships"}
this.CommonHeader="~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_CommonHoverPanel_Header.js";this.CommonBody="~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_CommonHoverPanel_Body.js";this.CommonActions="~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_CommonHoverPanel_Actions.js";this.GetBodySectionHeading=function(id,name){return"<div class='ms-srch-hover-subTitle'><h3>"+$htmlEncode(name)+"</h3></div>";}
this.GetBodySectionContent=function(id,title,content){return"<span class='ms-srch-hover-text ms-srch-ellipsis' id='"+$htmlEncode(id)+"'>"+$htmlEncode(content)+"</span>";}
this.GetEmailLink=function(title,path,clientType,wacPath){var newLine="%0D%0A";if($isNull(title)){title="";}
var body="";if(clientType){body+=$urlKeyValueEncode(String.format(Srch.Res.hp_Send_OpenInClient,clientType))+newLine;}else{body+=$urlKeyValueEncode(Srch.Res.hp_Send_Open)+newLine;}
body+=$urlKeyValueEncode("<"+path+">")+newLine;if(wacPath){body+=$urlKeyValueEncode(Srch.Res.hp_Send_OpenInWeb)+newLine;body+=$urlKeyValueEncode("<"+wacPath+">")+newLine;}
return"mailto:?subject="+$urlKeyValueEncode(title)+"&body="+body;}
function setDisplay(el,display){el.style.display=el.d=display;}
function isBlock(el){return(el&&el.style&&el.style.display&&"block"===el.style.display);}
function getBestWidth(availableSpace){availableSpace=availableSpace-_defaultMargin;var minWidth=$wideMode?_minWidthWideMode:_minWidth;var maxWidth=$wideMode?_maxWidthWideMode:_maxWidth;if(availableSpace){if(availableSpace>maxWidth)return maxWidth;if(availableSpace>minWidth)return availableSpace;}
return minWidth;}
function getWindowWidth(){var wWidth=-1;var contentArea=document.getElementById(_divIdWithScrollBar);if(contentArea&&contentArea.clientWidth){wWidth=contentArea.clientWidth;}
else if(document.documentElement&&document.documentElement.clientWidth){wWidth=document.documentElement.clientWidth;}
return wWidth;}
function getWindowHeight(){var wHeight=-1;var contentArea=document.getElementById(_divIdWithScrollBar);if(contentArea&&contentArea.clientHeight){wHeight=contentArea.clientHeight;}
else if(typeof(window.innerHeight)=='number'){wHeight=window.innerHeight;}
else if(document.documentElement&&document.documentElement.clientHeight){wHeight=document.documentElement.clientHeight;}
return wHeight;}
function getScrollX(){var scrollX=0;var divWithScrollBar=document.getElementById(_divIdWithScrollBar);if(divWithScrollBar){scrollX=divWithScrollBar.scrollLeft;}
return scrollX;}
function getScrollY(){var scrOfY=0;if(typeof(window.pageYOffset)=='number'){scrOfY=window.pageYOffset;}
else if(document.body&&document.body.scrollTop){scrOfY=document.body.scrollTop;}
else if(document.documentElement&&document.documentElement.scrollTop){scrOfY=document.documentElement.scrollTop;}
var divWithScrollBar=document.getElementById(_divIdWithScrollBar);if(divWithScrollBar){scrOfY=divWithScrollBar.scrollTop;}
return scrOfY;}
function getAbsoluteScrollY(element){var scrollY=0;while(element){if(element.scrollTop){scrollY+=element.scrollTop;}
element=element.parentNode;}
return scrollY;}
function getBestTop(preferredTop,itemTop,popupHeight,arrow,arrowPositionOffset){var bestTop={};var windowHeight=getWindowHeight();var scrollY=getAbsoluteScrollY($activeCaption);var absContainer=isInAbsoluteContainer($activeCaption);var contentAreaTop=0;var absoluteTop=preferredTop;if(!absContainer){var contentArea=document.getElementById(_divIdWithScrollBar);if(contentArea){contentAreaTop=getAbsolutePosition(contentArea,"Top");}
absoluteTop=preferredTop-contentAreaTop;}
if(absoluteTop<scrollY+contentAreaTop){bestTop.popup=scrollY+_verticalOffset;}
else{var bottomOverflow=(absoluteTop-scrollY)+popupHeight-windowHeight;if(bottomOverflow>0){bestTop.popup=absoluteTop-bottomOverflow-_verticalOffset;}else{bestTop.popup=absoluteTop;}}
var halfItemHeight=Math.floor($activeCaption.clientHeight/2);if(!$isNull(arrowPositionOffset)&&!isNaN(arrowPositionOffset))
{halfItemHeight=arrowPositionOffset;}
var halfArrowHeight=Math.floor(arrow.offsetHeight/2);bestTop.arrow=(itemTop-bestTop.popup)+(halfItemHeight-halfArrowHeight)-contentAreaTop;if(((bestTop.arrow+arrow.offsetHeight)>popupHeight)||(bestTop.arrow<0)){return null;}
return bestTop;}
function resetState(popup,id,wideMode){$activePopup=popup;$wideMode=wideMode;$activeOC=$activePopup?getPopupOC($activePopup):_null;var c=getCaption(popup,id);if($activeCaption&&$activeCaption!=c){doGleam($activeCaption,false);}
if(c){doGleam(c,true);}}
function clearState(){$activePopup=_null;$wideMode=false;$activeOC=_null;$activeCaption=_null;}
function getPopup(el){var parent=getCaption(el);var popup=_null;if(parent){popup=parent.pop}
return popup;}
function getPopupOC(el){if(el&&el.className!=_popupClassname){el=getPopup(el);}
var popupOC=_null;if(el&&el.parentNode){popupOC=el.parentNode.parentNode;}
return popupOC;}
function getCaption(el,id){var parent=el;while(parent&&parent.parentNode&&parent.parentNode.id!==id){parent=parent.parentNode;}
return parent;}
function setHideTimer(){window.cpHideTimer=setTimeout(function(){if($activePopup){hidePopup();}},_closeTimer);}
this.Hide=function(){if(window&&window.event&&window.event.type=="mouseout"){var target=event.relatedTarget?event.relatedTarget:event.toElement;var activeElement=$activeCaption;if(!target||!activeElement){return;}
if(!Srch.U.isDescendant(target,activeElement)){setHideTimer();}}else{setHideTimer();}}
function cancelHideTimer(){if(window.cpHideTimer){clearTimeout(window.cpHideTimer);}}
function IsNumeric(input){return(!isNaN(parseFloat(input)));}
this.IsNumeric=IsNumeric;this.Show=function(id,outerContainerId,templateName,wideMode)
{HP.Init(null,id,outerContainerId,templateName,wideMode);}
this.Init=function(event,id,idOC,templateName,wideMode){if(id!=$id)
{executePreviewOnHideCallback();}
$id=id;var caption=document.getElementById(id);if(caption){var p=caption.pop;var scripts=new Array();Srch.U.appendScriptsToLoad(scripts,templateName);Srch.U.appendScriptsToLoad(scripts,HP.CommonHeader);Srch.U.appendScriptsToLoad(scripts,HP.CommonBody);Srch.U.appendScriptsToLoad(scripts,HP.CommonActions);Srch.U.trace(_null,"HP.Init","Trying to load hover panel template scripts...");if(!Srch.U.loadScripts(scripts,function(){Srch.U.trace(_null,"HP.Init","All hover panel template scripts loaded");Srch.U.registerLoadedScripts(scripts);HP.InitPostLoad(id,idOC,templateName,wideMode);},function(){Srch.U.trace(_null,"HP.Init","Failed to load hover panel: "+templateName);}))
{Srch.U.trace(_null,"HP.Init","Did not discover new hover panel template script to load.");HP.InitPostLoad(id,idOC,templateName,wideMode);}}}
this.InitPostLoad=function(id,idOC,templateName,wideMode){Srch.U.trace(_null,"HP.InitPostLoad","");try{$id=id;var caption=document.getElementById(id);if(!caption)return;var p=caption.pop;if(p==_null){renderTemplate(id,idOC,templateName);p=caption.pop;if(!p)return;}
cancelHideTimer();if(sb_ie()&&window&&window.event&&window.event.type=='click'&&!isFromVideoVertical()){Srch.U.ensureCSSClassNameExist(caption,_srchItemSelectedClassName);}
if($activePopup&&!$activePopup.sticky||!$activePopup){if($activePopup!=p){loadPreview(p,id,wideMode);}}}catch(e){Srch.U.trace(_null,"HP.InitPostLoad",String.format("An error occurred while rendering {0}: {1}",templateName,e));}}
function hidePopup(){if(isBlock($activeOC)&&!$activePopup.sticky){var el=$activeOC;var activeItem=$activeCaption;el.style.visibility="hidden";el.style.opacity=0;if(sb_ie()){Srch.U.ensureCSSClassNameNotExist(activeItem,_srchItemSelectedClassName);}
$left=0;executePreviewOnHideCallback();clearState();}}
function showPopup(popup,id,wideMode){var oc=getPopupOC(popup);if(oc&&oc.style.visibility!="visible"){var visiblePopup=false;if($activePopup&&$activePopup!=popup){visiblePopup=true;if($activePopup.sticky){closePopup();}
else{hidePopup();}}
resetState(popup,id,wideMode);$activeCaption=document.getElementById(id);var el=$activeOC;if($activeOC)
{$activeOC.style.opacity=0;if(positionPopup(id)){setDisplay($activeOC,"block");$activeOC.style.visibility="visible";if(!visiblePopup)Srch.U.animate(el,0,null);else $activeOC.style.opacity=1;}
else{$activeOC.style.visibility="hidden";}}}}
function positionPopup(id){if(!Srch.U.n($activeCaption)&&!Srch.U.n($activeOC)&&(!Srch.U.n($activePopup)||!$left)){var w=0;if($activeCaption.offsetWidth){w=$activeCaption.offsetWidth-_itemOffset;}
w+=_minGap;setDisplay($activeOC,"block");$activeOC.style.visibility="visible";var scrollX=getScrollX();$left=getAbsolutePosition($activeCaption,"Left")+_minGap;$windowWidth=getWindowWidth();$top=getAbsolutePosition($activeCaption,"Top");var ocStyle=$activeOC.style;var arrow=document.getElementById(id+_hoverArrowId);var arrowBorder=document.getElementById(id+_hoverArrowBorderId);if((document.dir&&document.dir=="rtl")||(document.documentElement&&document.documentElement.dir&&document.documentElement.dir=="rtl"))
{$width=getBestWidth($left);$left=$left-$width-_minGap;if(arrow&&arrowBorder){arrow.className=_hoverArrowRTLClassname;arrowBorder.className=_hoverArrowBorderRTLClassname;}}else{$left=$left+w;$width=getBestWidth($windowWidth-$left);}
var splitHeightDifference=($activeOC.offsetHeight-$activeCaption.offsetHeight)/2;var preferredTop=$top-splitHeightDifference;var arrowPositionOffset=null;if(isFromVideoVertical()){var launchPoint=$activeCaption.querySelector(_videoVerticalHoverLaunchPointQuerySelector);if(!$isNull(launchPoint)){arrowPositionOffset=$activeCaption.clientHeight-launchPoint.clientHeight;arrowPositionOffset-=sb_ff()?0:launchPoint.clientHeight/2;}}
var nTop=getBestTop(preferredTop,$top,$activeOC.offsetHeight,arrow,arrowPositionOffset);if(nTop){$cTop=nTop.popup;ocStyle.top=$cTop+_px;ocStyle.left=$left+_px;ocStyle.width=$width+_px;arrow.style.top=nTop.arrow+_px;arrowBorder.style.top=nTop.arrow+_px;return true;}
return false;}}
function closePopup(){$activePopup.sticky=0;$activeCaption=_null;hidePopup();}
this.Close=function(){if($activePopup)hidePopup();}
function loadPreview(preview,id,wideMode){if(preview){getcontent(preview,id,wideMode);}}
function resize(){if($activePopup&&$activePopup.sticky){positionPopup($activePopup);}}
this.Resize=resize;function doGleam(caption,state){$activeCaption=state?caption:_null;}
function renderTemplate(idHPContainer,idOC,templateName){var item=$getResultItem(idHPContainer);if(!item.id){item.id=idHPContainer;}
try{var scriptManager=Srch.ScriptApplicationManager.get_current();if(item){var ocNode=$get(idOC);var renderCtx=null;var template=Srch.U.getRenderTemplateByName(templateName);if(!Srch.U.n(template)){var subTemplates=new Object();var header=Srch.U.getRenderTemplateByName(HP.CommonHeader);var body=Srch.U.getRenderTemplateByName(HP.CommonBody);var footer=Srch.U.getRenderTemplateByName(HP.CommonActions);function resolve(rCtx,component,level){if(level){if(level=="View"){return template;}else if(level=="Header"){return header;}else if(level=="Body"){return body;}else if(level="Footer"){return footer;}}
return null;}
renderCtx={ResolveTemplate:resolve,CurrentItem:item,ScriptApplicationManager:scriptManager};}
renderCtx.fHidden=true;var caption=document.getElementById(idHPContainer);if(caption){renderCtx.ClientControl=$getClientControl(caption);SPClientRenderer.Render(ocNode,renderCtx);var popId=item.id+_popupIdSuffix;caption.pop=document.getElementById(popId);if(caption.pop){caption.pop.sticky=0;}else
{Srch.U.trace(null,"HP.renderTemplate","Failed to render hover panel template: "+templateName);if(!$isEmptyArray(renderCtx.Errors))
{handleError(idOC,idHPContainer,renderCtx.Errors);}}}
sj_be(window,"resize",resize);}}catch(e){Srch.U.trace(null,"HP.renderTemplate","Failed to render hover panel template: "+templateName);if(item.id){handleError(idOC,idHPContainer,e);}}}
function handleError(containerId,itemId,errors){if(containerId&&errors)
{var container=$get(containerId);var content="<div class='ms-srch-hover-innerContainer' id='"+$htmlEncode(itemId+"_innerHover")+"'>"
+"<div class='ms-srch-hover-arrowBorder' id='"+$htmlEncode(itemId+"_hoverArrowBorder")+"'></div>"
+"<div class='ms-srch-hover-arrow' id='"+$htmlEncode(itemId+"_hoverArrow")+"'></div>"
+"<div class='ms-srch-hover-content' id='"+$htmlEncode(itemId+"_hoverContent")+"'>"
+"<div class='ms-srch-hover-body'>"
+"<div class='ms-srch-hover-text'>"+$htmlEncode(Srch.Res.hp_NoData)+"</div>"
+"<div class='ms-trcnoti-base ms-srch-msg'>"
+"<div class='ms-srch-msg-section'>"
+errors
+"</div>"
+"</div>"
+"</div>"
+"</div>"
+"</div>";if(container){container.innerHTML=content;var item=$get(itemId);if(item)
{var popId=item.id+_popupIdSuffix;item.pop=document.getElementById(popId);}
container.style.display="none";}}}
this.GetNowDateTimeDifference=function(startDateStr)
{var dateStr=startDateStr;try
{var myDate=new Date(startDateStr);var currDate=new Date();var millisecondsDifference=currDate.getTime()-myDate.getTime();var dayDifference=Math.floor(millisecondsDifference/_millisecondsInDay);if(dayDifference<2){dateStr=currDate.getDate()==myDate.getDate()?L_time_Today:L_time_Yesterday;}
else if(dayDifference<30){dateStr=String.format(L_time_DaysAgo,dayDifference);}
else if(dayDifference<365){var monthsAgo=Math.floor(dayDifference/30);dateStr=monthsAgo==1?L_time_MonthAgo:String.format(L_time_MonthsAgo,monthsAgo);}
else{var yearsAgo=Math.floor(dayDifference/365);dateStr=yearsAgo==1?L_time_YearAgo:String.format(L_time_YearsAgo,yearsAgo);}}
catch(e){}
return dateStr;}
this.ViewDuplicates=function(containerId,docId)
{if(containerId){var el=document.getElementById(containerId);var control=$getClientControl(el);if(control&&control.viewDuplicates)
{control.viewDuplicates(docId);}}}
this.GetFriendlyNameForFileType=function(item){var fileType="";if(item){if(!Srch.U.e(item.FileExtension)){if(item.FileExtension=="aspx"&&item.SecondaryFileExtension){fileType=Srch.Res[Srch.U.getFriendlyNameForFileExtension(item.SecondaryFileExtension)];}else{fileType=Srch.Res[Srch.U.getFriendlyNameForFileExtension(item.FileExtension)];}
if(Srch.U.e(fileType)&&Srch.U.getFriendlyNameForFileExtension(item.FileExtension)=="file_PDF"){fileType=Srch.Res.rf_ResultTypeRefinerValue_AdobePDF;}}else if(!Srch.U.e(item.contentclass)){fileType=Srch.Res["cc_"+item.contentclass.toLowerCase()];}else if(!Srch.U.e(item.ContentType)){fileType=Srch.Res["ct_"+item.ContentType.toLowerCase()];}}
return fileType;}
this.GetAuthorsHtml=function(id,authors){var authorString="";if(authors){var authorsToShow=authors.length;var authorsHtml=new Array(authors.length);if(authors.length>Srch.SU.maxLinesForMultiValuedProperty)
{authorsToShow=Srch.SU.maxLinesForMultiValuedProperty-1;}
for(var i=0;i<authors.length;i++){authorsHtml[i]="<span id='"+$htmlEncode(id+HP.ids.author+i)+"' title='"+$htmlEncode(authors[i])+"'>"+$htmlEncode(authors[i])+"</span>";}
if(authorsToShow==1)
{authorString=authorsHtml[0];}else if(authorsToShow==2){authorString=String.format($htmlEncode(Srch.Res.hp_Authors2),authorsHtml[0],authorsHtml[1]);}else if(authorsToShow==3){authorString=String.format($htmlEncode(Srch.Res.hp_Authors3),authorsHtml[0],authorsHtml[1],authorsHtml[2]);}else if(authorsToShow==4){authorString=String.format($htmlEncode(Srch.Res.hp_Authors4),authorsHtml[0],authorsHtml[1],authorsHtml[2],authorsHtml[3]);}else if(authorsToShow==5){authorString=String.format($htmlEncode(Srch.Res.hp_Authors5Singular),authorsHtml[0],authorsHtml[1],authorsHtml[2],authorsHtml[3]);}else{var moreAuthors=authors.length-authorsToShow;authorString=String.format($htmlEncode(Srch.Res.hp_Authors5Plural),authorsHtml[0],authorsHtml[1],authorsHtml[2],authorsHtml[3],moreAuthors);}}
return authorString;}
this.Follow=function(url,isFollow,isDoc)
{RegisterSod('hpfollowing','followingcommon.js');EnsureScriptFunc('followingcommon.js','SetFollowStatus',function()
{SetFollowStatus(url,isFollow,isDoc);});}
this.GetPeopleFollowingControl=function(accountName,preferredName,followDivId,followLinkDivId)
{var ctxCurrent=Srch.ScriptApplicationManager.get_clientRuntimeContext();EnsureScriptFunc("SP.UI.MySiteCommon.js","SP.UI.People.MySitePeopleUtilities",function(){var peopleManager=SP.UserProfiles.PeopleManager.newObject(ctxCurrent);var person=peopleManager.getPropertiesFor(accountName);ctxCurrent.load(person,SP.UI.People.MySitePeopleUtilities.getPersonPropertiesToInclude());if(ctxCurrent.get_hasPendingRequest()){ctxCurrent.executeQueryAsync(function()
{if(!person.get_serverObjectIsNull()){SP.UI.People.PersonManager.addPerson(person);var followLink=SP.UI.People.FollowLinkManager.getLink(accountName).htmlForLink(SP.UI.People.FollowLink.searchIdPrefixAndSource,false,true);followDiv=document.getElementById(followDivId);if(!$isNull(followDiv))
{followDiv.innerHTML="";if(!$isNull(followLink))
{followLink.className="ms-calloutLink";followDiv.appendChild(followLink);}}}},function(sender,failureArgs){});}});}
this.getStringFromDate=function(date){var DayOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var display="";if(date)
{var timeStr=date.toLocaleTimeString();var dateStr=getDoubleDigit(date.getMonth()+1).toString()+"/"+date.getDate()+"/"+date.getFullYear();var dateObj=new Date(dateStr);var currDate=new Date();if(currDate.getFullYear()===dateObj.getFullYear()&&currDate.getMonth()===dateObj.getMonth()&&currDate.getDate()===dateObj.getDate()){display=timeStr+" Today";}
else if(currDate.getFullYear()===dateObj.getFullYear()&&currDate.getMonth()===dateObj.getMonth()&&currDate.getDate()===dateObj.getDate()+1){display=timeStr+" Yesterday";}
else if(currDate.getFullYear()===dateObj.getFullYear()&&currDate.getMonth()===dateObj.getMonth()&&currDate.getDate()<=dateObj.getDate()+6){display=timeStr+" "+DayOfWeek[dateObj.getDay()];}
else{display=timeStr+" "+dateStr;}}
return display;}
this.getDateString=function(timeStr,rawYear,rawMonth,rawDate,dayOfWeek){var DayOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var dateStr="";var myDateStr=getDoubleDigit((parseInt(rawMonth)+1).toString())+"/"+rawDate+"/"+rawYear;var myDate=new Date(myDateStr);var currDate=new Date();if(currDate.getFullYear()===myDate.getFullYear()&&currDate.getMonth()===myDate.getMonth()&&currDate.getDate()===myDate.getDate()){dateStr=timeStr+" today";}
else if(currDate.getFullYear().toString()===rawYear&&currDate.getMonth()===parseInt(rawMonth)&&currDate.getDate()===rawDate-0+1){dateStr=timeStr+" yesterday";}
else if(currDate.getFullYear().toString()===rawYear&&currDate.getMonth()===parseInt(rawMonth)&&currDate.getDate()<=rawDate-0+6){dateStr=timeStr+" "+((dayOfWeek!==""&&dayOfWeek!==undefined&&dayOfWeek!==null)?dayOfWeek:DayOfWeek[myDate.getDay()]);}
else{dateStr=timeStr+" "+myDateStr;}
return dateStr;}
function getDateStr(timeStr,rawYear,rawMonth,rawDate,dayOfWeek){var DayOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var dateStr="";var myDateStr=getDoubleDigit((parseInt(rawMonth)+1).toString())+"/"+rawDate+"/"+rawYear;var myDate=new Date(myDateStr);var currDate=new Date();if(currDate.getFullYear()===myDate.getFullYear()&&currDate.getMonth()===myDate.getMonth()&&currDate.getDate()===myDate.getDate()){dateStr=timeStr+" today";}
else if(currDate.getFullYear().toString()===rawYear&&currDate.getMonth()===parseInt(rawMonth)&&currDate.getDate()===rawDate-0+1){dateStr=timeStr+" yesterday";}
else if(currDate.getFullYear().toString()===rawYear&&currDate.getMonth()===parseInt(rawMonth)&&currDate.getDate()<=rawDate-0+6){dateStr=timeStr+" "+((dayOfWeek!==""&&dayOfWeek!==undefined&&dayOfWeek!==null)?dayOfWeek:DayOfWeek[myDate.getDay()]);}
else{dateStr=timeStr+" "+myDateStr;}
return dateStr;}
function getDoubleDigit(singleDigit){var doubleDigit=singleDigit;if(singleDigit.length===1){doubleDigit="0"+singleDigit;}
else{hour=doubleDigit;}
return doubleDigit;}
function getcontent(destination,id,wideMode){if(!destination.cpLoad){if(id===$id){showPopup(destination,id,wideMode);destination.firstLoad=false;}}}
function createElement(tagNameCreated,tagId,styleClassName){var tagCreated=document.createElement(tagNameCreated);if(styleClassName){tagCreated.setAttribute("id",tagId);tagCreated.className=styleClassName;}
return tagCreated;}
function sb_ie(){var browserName=navigator.appName;if(browserName=="Microsoft Internet Explorer")
return true;else
return false;}
function sb_ff(){var browserName=navigator.userAgent.toLowerCase();if(browserName.indexOf("firefox")!=-1)
return true;else
return false;}
function isIE10(){if(!Srch.U.n(browseris)&&browseris.ie){return browseris.iever==10;}
return false;}
function isInAbsoluteContainer(targetElement){while(targetElement!=null){if(window.getComputedStyle){if(window.getComputedStyle(targetElement,"")["position"].toLowerCase()==="absolute"){return true;}}
else if(targetElement.currentStyle&&targetElement.currentStyle.position&&targetElement.currentStyle.position.toLowerCase()=="absolute"){return true;}
targetElement=targetElement.offsetParent;}
return false;}
function getAbsolutePosition(targetElement,position){var tempY=0,tempX=0;while(targetElement!=null){if(window.getComputedStyle){if(window.getComputedStyle(targetElement,"")["position"].toLowerCase()==="absolute"){break;}}
else if(targetElement.currentStyle&&targetElement.currentStyle.position&&targetElement.currentStyle.position.toLowerCase()=="absolute"){break;}
tempY+=targetElement.offsetTop;tempX+=targetElement.offsetLeft;targetElement=targetElement.offsetParent;}
return(position==="Left")?tempX:tempY;}
function sj_be(myElement,myeventName,myeventHander){if(myElement.addEventListener){myElement.addEventListener(myeventName,myeventHander,false);myElement.addEventListener(myeventName,myeventHander,false);}else if(myElement.attachEvent){myElement.attachEvent(myeventName,myeventHander);myElement.attachEvent(myeventName,myeventHander);}}
function getScreenWidth(){if(window&&window.screen&&window.screen.width)
{return window.screen.width;}}
function getScreenHeight(){if(window&&window.screen&&window.screen.height)
{return window.screen.height;}}
function getAvailableSpace(resultElement){var availableSpace=0;if(resultElement){var resultWidth=0;if(resultElement.offsetWidth){resultWidth=resultElement.offsetWidth-_itemOffset;}
var scrollX=getScrollX();resultWidth+=_minGap;var left=(getAbsolutePosition(resultElement,"Left")-scrollX)+_minGap;var screenWidth=getScreenWidth();if((document.dir&&document.dir=="rtl")||(document.documentElement&&document.documentElement.dir&&document.documentElement.dir=="rtl"))
{availableSpace=left;}else{left=left+resultWidth;availableSpace=screenWidth-left;}}
return availableSpace-_defaultMargin;}
function getAvailableHeightSpace(oc){var availableHeightSpace=getWindowHeight();var ocHeight=oc.clientHeight;if(ocHeight==0){var preVisibility=oc.style.visibility;var preDisplay=oc.style.display;oc.style.visibility="hidden";oc.style.display="block";ocHeight=oc.clientHeight;oc.style.visibility=preVisibility;oc.style.display=preDisplay;}
return availableHeightSpace-ocHeight;}
this.loadViewer=function(resultId,hpId,iframeId,imageId,viewerUrl,imageUrl){var result=$get(resultId);var iframe=$get(iframeId);var image=$get(imageId);var hp=$get(hpId);if(result&&iframe&&image&&hp){iframe.style.display="none";iframe.parentNode.style.display="none";var screenWidth=getScreenWidth();var screenHeight=getScreenHeight();var availableSpace=getAvailableSpace(result);var availableHeightSpace=getAvailableHeightSpace(hp.parentNode);if(screenWidth>=_minScreenWidth&&screenHeight>=_minScreenHeight&&availableHeightSpace>=_minWACViewerHeight)
{if(screenHeight<_startWACResize){availableHeightSpace=_minWACViewerHeight;}
iframe.style.display="block";iframe.parentNode.style.display="block";iframe.src=viewerUrl;var dimension=getBestDimensions(availableSpace,availableHeightSpace);iframe.parentNode.style.height=dimension.height+_px;hp.style.width=dimension.width+_px;}else{image.src=imageUrl;var width=_minWACImageWidth;if(availableSpace>_minWACImageWidth)
{if(availableSpace>_maxWACImageWidth)
{width=_maxWACImageWidth;}else
{width=availableSpace;}}
hp.style.width=width+_px;}}}
this.loadSiteViewer=function(resultId,hpId,iframeId,viewerUrl,glassViewerId){var result=$get(resultId);var iframe=$get(iframeId);var glassViewer=$get(glassViewerId);var hp=$get(hpId);if(result&&iframe&&hp&&glassViewer){iframe.style.display="none";iframe.parentNode.style.display="none";var availableSpace=getAvailableSpace(result);var availableHeightSpace=getAvailableHeightSpace(hp.parentNode);var width=_minSiteViewerWidth;var height=_minSiteViewerHeight;if(availableSpace>=_minSiteViewerWidth&&availableHeightSpace>=_minSiteViewerHeight)
{var dimension=getBestDimensions(availableSpace,availableHeightSpace-_defaultSpaceSiteY);width=dimension.width;height=dimension.height;}
hp.style.width=width+_px;width-=_defaultPadding;iframe.parentNode.style.height=height+_px;iframe.parentNode.style.width=width+_px;iframe.style.display="block";iframe.parentNode.style.display="block";iframe.src=$urlHtmlEncode(viewerUrl);glassViewer.style.height=height+_px;glassViewer.style.width=width+_px;iframe.style.width=_siteFrameWidth+_px;iframe.style.height=_siteFrameHeight+_px;if(Srch.U.isRTL()){Srch.U.ensureCSSClassNameExist(iframe,_siteViewerRTLClassName);}
var scaleX=width/_siteFrameWidth;var scaleY=height/_siteFrameHeight;var scaled=scaleElement(iframe,scaleX,scaleY);if(!scaled&&sb_ie()){iframe.style.zoom=''+scaleX+'';var newWidth=_siteFrameWidth/scaleX;var newHeight=_siteFrameHeight/scaleY;iframe.style.width=newWidth+_px;iframe.style.height=newHeight+_px;}}}
function getBestDimensions(availableSpace,availableHeightSpace){var dimension={};dimension.width=0;dimension.height=0;var width=_minWACViewerWidth;var height=_minWACViewerHeight;if(availableSpace>_maxWACViewerWidth)
{width=_maxWACViewerWidth;if(availableHeightSpace>_maxWACViewerHeight)
{height=_maxWACViewerHeight-_defaultSpaceY;}
else
{height=availableHeightSpace-_defaultSpaceY;width=_aspectRatio*height;}}else
{width=availableSpace;if(availableHeightSpace>_maxWACViewerHeight)
{height=(width-_defaultPadding)/_aspectRatio;}
else
{height=availableHeightSpace-_defaultSpaceY;var newWidth=_aspectRatio*height;if(newWidth>width)
{height=(width-_defaultPadding)/_aspectRatio;}
else{width=newWidth;}}}
dimension.width=Math.floor(width);dimension.height=Math.floor(height);return dimension;}
this.SetWidth=function(resultId,hpId,width){if(!$isNull(resultId)&&!$isNull(hpId)&&!$isNull(width)&&!isNaN(width)&&width>=_minWidth){var result=$get(resultId);var hp=$get(hpId);if($isNull(result)||$isNull(hp))return;var availableSpace=getAvailableSpace(result);if(width>availableSpace)
{width=availableSpace;}
if(width>=_maxWACViewerWidth)
{width=_maxWACViewerWidth;}
hp.style.width=width+_px;}}
this.SetPreviewOnHideCallback=function(callback){if($isNull($previewOnHideCallbacks)){$previewOnHideCallbacks={};}
if(!$isNull($id)){$previewOnHideCallbacks[$id]=callback;}}
function executePreviewOnHideCallback(){if(!$isNull($id)&&!$isNull($previewOnHideCallbacks)&&!$isNull($previewOnHideCallbacks[$id])){$previewOnHideCallbacks[$id]();}}
function isFromVideoVertical(){var sourceDisplayTemplateElement=$activeCaption;var tryGetElementFromEvent=$isNull(sourceDisplayTemplateElement)&&window&&window.event&&!$isNull(window.event.srcElement);var foundElement=!tryGetElementFromEvent;if(tryGetElementFromEvent){sourceDisplayTemplateElement=window.event.srcElement;do{sourceDisplayTemplateElement=sourceDisplayTemplateElement.parentNode;foundElement=sourceDisplayTemplateElement.hasAttribute(_displayTemplateAttributeName);}
while(!$isNull(sourceDisplayTemplateElement)&&!foundElement);}
if(foundElement&&!$isNull(sourceDisplayTemplateElement)){var displayTemplateName=sourceDisplayTemplateElement.getAttribute(_displayTemplateAttributeName);return!$isEmptyString(displayTemplateName)&&displayTemplateName.toUpperCase()==_displayTemplateName_VideoVertical;}
return false;}
function scaleElement(element,scaleX,scaleY){var properties=['transform','WebkitTransform','msTransform','MozTransform','OTransform'];var p;var scaled=false;while((p=properties.shift())&&!scaled){if(typeof element.style[p]!='undefined'){scaled=true;element.style[p]='scale('+scaleX+','+scaleY+')';}}
return scaled;}}}
HP_initialize();function searchui_initialize(){HP_initialize();searchui_scriptSharp_initialize();}
RegisterModuleInit("searchui.js",searchui_initialize);if(typeof(Sys)!="undefined"&&Sys&&Sys.Application){Sys.Application.notifyScriptLoaded();}
NotifyScriptLoadedAndExecuteWaitingJobs("SearchUI.js");