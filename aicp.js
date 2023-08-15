(function($){
	var aicpCookies = Cookies.noConflict();
	// Fire the code only of any ad codes exists
	if ( $(".adsbygoogle").length > 0 ) {
		//console.log($(".aicp").length);
		if( typeof aicpCookies.get('aicp_click_count') === 'undefined' ) {
			//console.log( "Cookie does not exists. Setting up cont var for the first time." );
			var count = 0;
		} else {
			//console.log( "Cookie already exists so I'm just passing the Cookie value to the variable" );
			var count = aicpCookies.get('aicp_click_count');
		}
		//console.log(count);

		//if the user has already reached the click limit, there is no point of showing the ads
		//just do display none
		if( count > AICP.clickLimit ) {
			$(".adsbygoogle").css({ display: "none" });
		} else {
			//$(".adsbygoogle iframe").iframeTracker({
				//blurCallback: function(){
					// Do something when the iframe is clicked
					//console.log( "Iframe Ad Clicked" );
					//console.log( "count: " + count );
					++count; //checking how many times uses click on the ads
					// console.log(count);
					/* Saving this value to the cookie in case the user reloads the page and the counter gets reset */
					aicpCookies.set(
						'aicp_click_count', 
						count, 
						{ 
							expires: ( AICP.clickCounterCookieExp )/24, 
							sameSite: 'strict', 
							secure: location.protocol === 'https:' ? true : false 
						}
					);
					//if the user click on ads for more than 3 times
					if( count >= AICP.clickLimit ) {
						// If the visitor is click bombing, stop showing ads immediately.
						$(".adsbygoogle").css({ display: "none" });
					}
				//}
			//});
		}
	}
})(jQuery);
