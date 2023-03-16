(function(){
  if (typeof(_spBodyOnLoadFunctions) === 'undefined' || _spBodyOnLoadFunctions === null) {
    return;
  }
  _spBodyOnLoadFunctions.push(function() {

    if (typeof(SPClientTemplates) === 'undefined' || SPClientTemplates === null || (typeof(APD_InAssetPicker) === 'function' && APD_InAssetPicker())) {
      return;
    }

    var renderFollowFooter = function(renderCtx,  calloutActionMenu)
    {
      if (renderCtx.ListTemplateType == 700) 
        myDocsActionsMenuPopulator(renderCtx, calloutActionMenu);
      else
        CalloutOnPostRenderTemplate(renderCtx, calloutActionMenu);

      var listItem = renderCtx.CurrentItem;
      if (typeof(listItem) === 'undefined' || listItem === null) {
        return;
      }
      if (listItem.FSObjType == 0) {
        calloutActionMenu.addAction(new CalloutAction({
          text: Strings.STS.L_CalloutFollowAction,
          tooltip: Strings.STS.L_CalloutFollowAction_Tooltip,
          onClickCallback: function (calloutActionClickEvent, calloutAction) {
            var callout = GetCalloutFromRenderCtx(renderCtx);
            if (!(typeof(callout) === 'undefined' || callout === null))
              callout.close();
            SP.SOD.executeFunc('followingcommon.js', 'FollowSelectedDocument', function() { FollowSelectedDocument(renderCtx); });
          }
        }));
      }
    };

    var registerOverride = function(id) {
      var followingOverridePostRenderCtx = {};
      followingOverridePostRenderCtx.BaseViewID = 'Callout';
      followingOverridePostRenderCtx.ListTemplateType = id;
      followingOverridePostRenderCtx.Templates = {};
      followingOverridePostRenderCtx.Templates.Footer = function(renderCtx) {
        var  renderECB;
        if (typeof(isSharedWithMeView) === 'undefined' || isSharedWithMeView === null) {
          renderECB = true;
        } else {
          var viewCtx = getViewCtxFromCalloutCtx(renderCtx);
          renderECB = !isSharedWithMeView(viewCtx);
        }
        return CalloutRenderFooterTemplate(renderCtx, renderFollowFooter, renderECB);
      };
      SPClientTemplates.TemplateManager.RegisterTemplateOverrides(followingOverridePostRenderCtx);
    }
    registerOverride(851);
  });
})();