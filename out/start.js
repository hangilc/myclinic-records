require.config({
	path: {
		"text": "./text.js"
	}
});

require(["main"], function(main){
	main.run();
});
