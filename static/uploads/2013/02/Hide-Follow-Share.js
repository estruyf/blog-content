(function(){
	if (typeof(_spBodyOnLoadFunctions) === 'undefined' || _spBodyOnLoadFunctions === null) {
		return;
	}
	_spBodyOnLoadFunctions.push(function() {

		if (typeof(SPClientTemplates) === 'undefined' || SPClientTemplates === null || (typeof(APD_InAssetPicker) === 'function' && APD_InAssetPicker())) {
			return;
		}
					
		var registerOverrideToHideSocialActions = function(id) {
			var socialactionsOverridePostRenderCtx = {};
			socialactionsOverridePostRenderCtx.BaseViewID = 'Callout';
			socialactionsOverridePostRenderCtx.ListTemplateType = id;
			socialactionsOverridePostRenderCtx.Templates = {};
			socialactionsOverridePostRenderCtx.Templates.Footer = function(renderCtx) {
				var  renderECB;
				if (typeof(isSharedWithMeView) === 'undefined' || isSharedWithMeView === null) {
					renderECB = true;
				} else {
					var viewCtx = getViewCtxFromCalloutCtx(renderCtx);
					renderECB = !isSharedWithMeView(viewCtx);
				}
				// By setting a null value as 2nd parameter, we do not specify additional callout actions.
				return CalloutRenderCustomFooterTemplate(renderCtx, null, renderECB);
			};
			SPClientTemplates.TemplateManager.RegisterTemplateOverrides(socialactionsOverridePostRenderCtx);
		}
		// Hide actions for default Document Libraries
		registerOverrideToHideSocialActions (101);
		// Hide actions for the document library on your My Site
		registerOverrideToHideSocialActions (700);
		
		function CalloutRenderCustomFooterTemplate(renderCtx, calloutActionMenuPopulator, renderECB) {
			if (typeof calloutActionMenuPopulator === 'undefined' || calloutActionMenuPopulator === null) {
				calloutActionMenuPopulator = CalloutOnPostRenderCustomTemplate;
			}
			if (typeof renderECB === 'undefined' || renderECB === null) {
				renderECB = true;
			}
			var calloutID = GetCalloutElementIDFromRenderCtx(renderCtx);
		
			AddPostRenderCallback(renderCtx, function() {
				var calloutActionMenu = new CalloutActionMenu(calloutID + '-actions');
		
				calloutActionMenuPopulator(renderCtx, calloutActionMenu);
				calloutActionMenu.render();
			});
			var ecbMarkup = [];
		
			if (renderECB) {
				ecbMarkup.push('<span id=' + StAttrQuote(calloutID + '-ecbMenu') + ' class="js-callout-actions js-callout-ecbActionDownArrow">');
				ecbMarkup.push(RenderECBinline(renderCtx, renderCtx.CurrentItem, renderCtx.CurrentFieldSchema));
				ecbMarkup.push('</span>');
			}
			return Callout.GenerateDefaultFooter(calloutID, ecbMarkup.join(''));
		}
		
		function CalloutOnPostRenderCustomTemplate(renderCtx, calloutActionMenu) {
			var listItem = renderCtx.CurrentItem;
			var openText = GetCallOutOpenText(listItem, renderCtx);
		
			calloutActionMenu.addAction(new CalloutAction({
				text: openText,
				onClickCallback: function(calloutActionClickEvent, calloutAction) {
					CalloutAction_Open_OnClick(calloutActionClickEvent, calloutAction, renderCtx);
				}
			}));
		}
	});
})();