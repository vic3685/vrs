/* All your JS starts here!
   Use requirejs (http://requirejs.org/) to include more JS files.
   You don't need to include requirejs yourself!
   The Grunt scripts will automatically merge all these files into /compiled/scripts.js */
   
  
$(function() {

	if (Modernizr.history) { // history is supported; 
		$(".thumbnails").delegate("a", "click", function() { 
			_href = $(this).attr("href");
			console.log(_href);
			history.pushState(null, null, _href); // change the url without a page refresh and add a history entry.
			loadContent(_href); // load the content
			return false;
		}); 
		$(window).bind("popstate", function() { 
			link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
			loadContent(link);
		});
	} 

	var $mainContent = $("#mainImage"),
		$contentInfo = $(".album_photos .info"),
		$el;

	function loadContent(href) {
		console.log("loading");
		$mainContent
			.find("img")
			.fadeOut(200, function() { // fade out the content of the current page
				$mainContent
				//.hide()
				.load(href + " #mainImage img", function() {	
					$(".thumbnails a").removeClass("current");
					$(".thumbnails a[href$='" + href + "']").addClass("current");
				});
			});	
		$(".itemInfo")
			.fadeOut(200, function() {
				console.log("new attempt started");
				$(".itemInfo").load(href + " .itemInfo > *", function() {$(this).fadeIn(200);console.log("new attempt over");});
				
			});
	};

});