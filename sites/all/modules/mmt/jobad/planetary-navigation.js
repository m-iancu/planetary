(function($){

var planetaryNavigation = {
	info: {
		'identifier' : 'kwarc.mmt.planetary.navigation',
		'title' : 'MMT Navigation Service in Planetary',
		'author': 'MMT developer team',
		'description' : 'The navigation service for browsing MMT repositories in Planetary',
		'version' : '1.0',
		'dependencies' : [],
		'hasCleanNamespace': false
	},
  

    leftClick: function(target, JOBADInstance) {
		if(target.hasAttribute('loadable')) {
			var elem = target.parent().get(0);
			var uri = $(elem).attr('jobad:load');
			var uriEnc = this.encode(uri);
			window.location.search = "?q=" + uriEnc;
			return true;
		}
		return false;
    },


    contextMenuEntries: function(target, JOBADInstance) {
		var blob_url = 'http://gl.mathhub.info/' + oaff_node_group  + "/" + oaff_node_archive + "/blob/master/source/" + oaff_node_rel_path;
		var blame_url = 'http://gl.mathhub.info/' + oaff_node_group  + "/" + oaff_node_archive + "/blame/master/source/" + oaff_node_rel_path;
		var res = {
			'View Source' : function() {window.open(blob_url, '_blank');},
			'View Change History' : function() {window.open(blame_url, '_blank');},
		};
		console.log(res);
		if (target.hasAttribute('jobad:href')) {			
			var mr = $(target).closest('mrow');
			var select = (mr.length === 0) ? target : mr[0];
			mmt.setSelected(select);
			var uri = target.attr('jobad:href');
			var me = this;
			console.log(res);
			res['Go To Declaration'] = function() {me.planetaryOpen(uri);};		
			console.log(res);
		} 
		return res;
	},

	planetaryOpen : function(uri) {
		uriSegs = uri.split("?");
		if (uriSegs.length < 2) {//document path 
			window.location.search = "?q=" + this.encode(uri);
		} else { //module, symbol or fragment path
			var modUri = uriSegs[0]; //getting doc
			window.location.search = "?q=" + this.encode(modUri);        
		}
	},


    encode : function(uri) {
		var rawEncoded = encodeURIComponent(uri);
		//mirroring drupal in not escaping slashes
		return rawEncoded.replace(/%2F/g, "/");
    },
};


JOBAD.modules.register(planetaryNavigation);
})(jQuery);