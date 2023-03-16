var clientContext;
var web;
var ContentTypeCollection;
var SiteColumnsCollection;
var field;

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    clientContext = new SP.ClientContext("/");
    web = clientContext.get_web();

    $("#CreateSiteColumn").click(function () {
        $('#message').empty();
        CreateSiteColumns();
        return false;
    });

    $("#CreateContentType").click(function () {
        $('#message').empty();
        CreateContentType();
        return false;
    });

    $("#LinkFieldToContentType").click(function () {
        $('#message').empty();
        LinkFieldToContentType();
        return false;
    });
});


function CreateSiteColumns() { 
    // Create Site Columns
    SiteColumnsCollection = web.get_fields();
    var xmlField = '<Field Type="Text" DisplayName="EStruyf Field" Name="estruyf" Group="EStruyf Columns" Hidden="False"></Field>';
    
    this.SiteColumnsCollection.addFieldAsXml(xmlField, false, SP.AddFieldOptions.AddToNoContentType);
    
    clientContext.load(SiteColumnsCollection);
    clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
}

function CreateContentType() {
    // Create Site Content Type
    ContentTypeCollection = web.get_contentTypes();
    var newContentType = new SP.ContentTypeCreationInformation();
    newContentType.set_name("EStruyf Content Type");
    newContentType.set_description("This is my custom EStruyf content type");
    newContentType.set_group("EStruyf");

    ContentTypeCollection.add(newContentType);
    
    clientContext.load(ContentTypeCollection);
    clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
}

function LinkFieldToContentType() {
    ContentTypeCollection = web.get_contentTypes();
    field = web.get_fields().getByTitle("EStruyf Field");
    clientContext.load(ContentTypeCollection);
    clientContext.load(field);
    clientContext.executeQueryAsync(onQuerySuccess, onCreationFail);
}

function onQuerySuccess() {
    var contentTypeEnumerator = ContentTypeCollection.getEnumerator();
    var myCt;
    while (contentTypeEnumerator.moveNext()) {
        var ct = contentTypeEnumerator.get_current();
        if (ct.get_name() === "EStruyf Content Type") {
            myCt = ct;
            break;
        }
    }

    if (myCt != null) {
        var fieldLink = new SP.FieldLinkCreationInformation();
        fieldLink.set_field(field);
        myCt.get_fieldLinks().add(fieldLink);
        myCt.update(true);
        
        clientContext.load(myCt);
        clientContext.executeQueryAsync(onCreationSuccess, onCreationFail);
    }
}

// This function is executed if the above OM call is successful
function onCreationSuccess() {
    $('#message').text('Action was successful.');
}

// This function is executed if the above call fails
function onCreationFail(sender, args) {
    alert('Action failed: ' + args.get_message());
}
