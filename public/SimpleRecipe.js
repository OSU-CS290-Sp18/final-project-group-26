(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['SimpleRecipe'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- Need to pass two argument\r\n     1. photoURL\r\n     2. name\r\n    -->\r\n\r\n<div class=\"link-container\">\r\n    <!-- only need one for template -->\r\n    <!-- All others is for test purpose -->\r\n    <div class=\"linkimg-container\">\r\n        <img class=\"linkimg\" src=\""
    + alias4(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "\" alt=\"recipe image\" width=\"300\" height=\"200\">\r\n\r\n    </div>\r\n    <div class=\"rec_name_container\">\r\n        <p class=\"linkname\">\r\n            <a href=\"/recipes/"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n          \r\n        </p>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();