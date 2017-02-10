/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/
function parse(url) {
	var tempURL = decodeURIComponent(url);
	console.log("URL: " + tempURL);

	var parts = {
		scheme: null,
		authority:{
			username: null,
			password: null,
			host: null,
			port: null,
		},
		query: {},
		path: null,
		fragment: null
	};

	//used html tag to to get some data easily
	var a = document.createElement('a');
	a.href = tempURL;

	//extracting and assigning the scheme
	var b = a.protocol;
	parts.scheme = b.replace(":", "");

	//getting url authority
	parts.authority = getAuth(parts.scheme, a);

	//getting queries
	parts.query = getQuery(a.search);

	//getting path
	if(tempURL.includes("://")){
		tempURL = tempURL.replace("://", "");
	}

	if(tempURL.includes("/")){
		parts.path = decodeURIComponent(a.pathname);
	}
	else
		parts.path = "";

	//getting fragment
	parts.fragment = getFrag(a.hash);

	console.log("scheme: " + parts.scheme);
	console.log("username: " + parts.authority.username);
	console.log("password: " + parts.authority.password);
	console.log("host: " + parts.authority.host);
	console.log("port: " + parts.authority.port);
	console.log("path:" + parts.pathname);
	console.log("query: " + parts.query);
	console.log("fragment:" + parts.fragment);
	
	return parts;
}

function getAuth(scheme, authority){
	var auth = {
		username: null,
		password: null,
		host: null,
		port: null,
	}

	if(authority.username != "" && authority.password != ""){
		auth.username = decodeURIComponent(authority.username);
		auth.password = decodeURIComponent(authority.password);
	}

	auth.host = authority.host;
	
	if(auth.host.includes(":")){
		var temp = auth.host.split(":");
		auth.host = temp[0];
		auth.port = temp[1];
	}
	else if(auth.host == ""){
		auth.host = null;
	}
	else{
		if(scheme == "http")
			auth.port = "80";
		else if(scheme == "https")
			auth.port = "443";
		else if(scheme == "ftp")
			auth.port = "21";
		else if(scheme == "ssh")
			auth.port = "22";
	}
	
	return auth;
}

function getQuery(q){
	q = decodeURIComponent(q);
	var query = {};
	var tmp = null;
	var pair = null;
	var a = null;
	
	if(q.includes("?")){
		tmp = q.replace('?', '');

		//for multiple queries
		if(q.includes("&")){
			a = tmp.split("&");

			for(var i = 0; i < a.length; i++){
				pair = a[i].split("=");
				query[pair[0]] = pair[1];
			}
		}
		//for single query
		else{
			pair = tmp.split('=');
			query[pair[0]] = pair[1];
		}
	}
	else
		query = null;

	return query;
}

function getFrag(fragment){
	var frag = null;

	if(fragment.includes("#")){
		frag = fragment.replace('#', '');
	}

	return frag;
}
