function ShowMoreResults (ctx, controlId) {
	var hiddenElm = $('#'+controlId);
	var visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
	// Hide the original set of results
	hiddenElm.hide();

	// Check if the Visible items element already exists
	if (visibleElm.length <= 0) {
		// Get the tag name of the element
		var tagname = hiddenElm.prop('tagName');
		// Box needs to be created before or after the web part, 
		// otherwise the content will be cleared when new results are retrieved.
		hiddenElm.parents('.ms-WPBody:eq(0)').before('<'+tagname+' id="Show-Items" class="'+hiddenElm.attr('class')+'"></'+tagname+'>');
		visibleElm = hiddenElm.parents('.ms-WPBody:eq(0)').parent().children('#Show-Items');
	}

	// Append all the hidden items to the visible items element
	hiddenElm.children().each(function () {
		//$('#Show-Items').append($(this).clone(true));

		// Append the items to the visible div
		$(this).appendTo(visibleElm);
	});

	// Get the paging information
	var pagingInfo = ctx.ClientControl.get_pagingInfo();
	var lastPage = pagingInfo[pagingInfo.length -1];
	// If the value of pageNumber is equal to -2, more results can be retrieved
	var hasNextPage = lastPage.pageNumber == -2;
	// Append the show more link if a next page is available
    if(hasNextPage)
    {
    	hiddenElm.after('<a href="#" id="'+controlId+'showmore">Show More Results</a>');
    }

    // When clicked on the show more link, the new set of results needs to be retrieved
	$('#'+controlId+'showmore').click(function () {
		// Load the next set of results
		ctx.ClientControl.page(lastPage.startItem);
		return false;
	});
}