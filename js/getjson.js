function hitApi(url, callback) {
  var req = new XMLHttpRequest();

  req.addEventListener('load', onLoad);
  req.addEventListener('error', onFail);
  req.addEventListener('abort', onFail);

  req.open('GET', url);
  req.send();

  function onLoad(event) {
    if (req.status >= 400) {
      onFail(event);
    } else {
      var json = JSON.parse(this.responseText);
      callback(null, json);
    }
  }

  function onFail(event) {
    callback(new Error('...'));
  }
}

var json_url = 'https://ashhhbradley.github.io/EverydayGossip/json/most-recent-content.json';

// hitApi(json_url, function(error, data) {
//   if (error) {
//     console.log('there was an error', error);
//   } else {
//     console.log('data is', data);
//   }
// });

String.prototype.capitalize = function(){return this.replace(/(?:^|\s)\S/g, function(a){return a.toUpperCase();});};

$.getJSON(json_url, function(json_file) {
	var carousel_objects = '';
	for (var i = 0; i < 5; i++) {
		var folder = json_file[i].folder;
		var title = folder.replace(/-/g,' ');
		var title_capitalize = title.capitalize();
		var upload_date = json_file[i].uploaded;

    carousel_objects += '<div><div class="image-wrap pt-page-fade-in"><img src="https://ashhhbradley.github.io/EverydayGossip/images/'+ folder +'/1.jpg"></img></div><a href="#">'+ title_capitalize +'</a></div>';

    $('#latest-articles').trigger('destroy.owl.carousel'); //these 3 lines kill the owl, and returns the markup to the initial state
    $('#latest-articles').find('.owl-stage-outer').children().unwrap();
    $('#latest-articles').removeClass("owl-center owl-loaded owl-text-select-on");

    $('#latest-articles').html(carousel_objects);

    $('#latest-articles').owlCarousel({
      items:3,
      loop:true,
      margin:10,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      autoplay:true,
      autoplayTimeout:5000,
      autoplayHoverPause:true
    });
	}
});
