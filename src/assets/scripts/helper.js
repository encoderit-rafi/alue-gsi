const base_url = ""; // APIs base URL here

export default {
	data() {
		return {

		}
	},
	methods: {
		ajaxRequest: function(url,method,jsonData,success,failed) {
			let module = this;

			$.ajax({
				type: method,
				url: base_url + url,
				data: jsonData?JSON.stringify(jsonData): null,
				contentType: "application/json; charset=UTF-8",
				headers: {
			    "Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
			  },
				success: function (response) {
					success(response);
				},
				error: function (error) {
					failed(error);
				}, 
				statusCode: {
			    401: function() {
			    	localStorage.clear();
			    	module.$notify({
	            title: "Error",
	            message: "Session has exprired, please re-login",
	            type: "error"
	          });
			    	module.$router.push({path:"/home"});
			    },
			    403: function() {
						localStorage.clear();
						module.$notify({
	            title: "Error",
	            message: "Session has exprired, please re-login",
	            type: "error"
	          });
						module.$router.push({path:"/home"});
			    },
			    404: function() {
			    	module.$notify({
	            title: "Error",
	            message: "Ops, something went wrong",
	            type: "error"
	          });
			    }
				}
      });
    },
    getResponsiveState: function() {
    	let windowWidth = $(window).innerWidth();

    	if(windowWidth > 1380)
    		return 5; // XXL
    	if(this.isBetween(windowWidth,1220,1380))
    		return 4; // XL
    	if(this.isBetween(windowWidth,1024,1220))
    		return 3; // L
    	if(this.isBetween(windowWidth,768,1024))
    		return 2; // M
    	if(this.isBetween(windowWidth,480,768))
    		return 1; // S
    	if(windowWidth < 480)
    		return 0; // XS
    },
    isBetween: function(num,from,to) {
    	return num>from&&num<=to;
		},
		isMobile: function() {
		  if(this.getResponsiveState() <= 1)
		    return "mobile";

		  return "";
		}
  }
};
