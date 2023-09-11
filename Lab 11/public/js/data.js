(function ($) {
   // page load
   let showList = $('#showList');
   let show = $('#show');
   let searchForm = $('#searchForm');
   let searchTerm = $('#search_term');
   let error = $('#error');
   let homeLink = $('#homeLink');
   let title = $('#title');

   $.ajax({
      url: 'http://api.tvmaze.com/shows',
      type: 'Get'
   }).then(function (shows) {
      for(let i=0; i<shows.length; i++){
         let a = $(`<a href="${shows[i]._links.self.href}"> ${shows[i].name} </a>`);
         a.click(function( event ) {
            // link clicked
            event.preventDefault();
            title.hide();
            error.hide();
            showList.hide();
            show.empty();
            homeLink.show();
            $.ajax({
               url: shows[i]._links.self.href,
               type: 'Get'
            }).then(function (showData) {
               // name
               if(showData.name){
                  show.append($(`<h1>${showData.name}</h1>`));
               } else {
                  show.append($(`<h1>N/A</h1>`));
               }
               // image
               if(showData.image){
                  show.append($(`<img src="${showData.image.medium}" alt="Show Image">`));
               } else {
                  show.append($(`<img src="/public/imgs/no_img.png" alt="No Image Available">`));
               }
               // dl
               let dl = $(`<dl></dl>`);
               dl.append($(`<dt>Language</dt>`));
               // language
               if(showData.language){
                  dl.append($(`<dd>${showData.language}</dd>`));
               } else {
                  dl.append($(`<dd>N/A</dd>`));
               }
               // genres
               dl.append($(`<dt>Genres</dt>`));
               if(showData.genres.length > 0){
                  let ul = $(`<ul></ul>`);
                  for(let i=0; i<showData.genres.length; i++){
                     ul.append($(`<li>${showData.genres[i]}</li>`));
                  }
                  let dd = $('<dd></dd>');
                  dd.append(ul);
                  dl.append(dd);
               } else {
                  dl.append($(`<dd>N/A</dd>`));
               }
               // rating.average
               dl.append($(`<dt>Average Rating</dt>`));
               if(showData.rating.average){
                  dl.append($(`<dd>${showData.rating.average}</dd>`));
               } else {
                  dl.append($(`<dd>N/A</dd>`));
               }
               // network.name
               dl.append($(`<dt>Network</dt>`));
               if(showData.network){
                  dl.append($(`<dd>${showData.network.name}</dd>`));
               } else {
                  dl.append($(`<dd>N/A</dd>`));
               }
               // summary
               dl.append($(`<dt>Summary</dt>`));
               if(showData.summary){
                  dl.append($(`<dd>${showData.summary}</dd>`));
               } else {
                  dl.append($(`<dd>N/A</dd>`));
               }
               show.append(dl);
            });
            show.show();
         });
         let li = $(`<li></li>`);
         li.append(a);
         showList.append(li);
      }
      showList.show();
      show.hide();
      error.hide();
      title.show();
   });

   // search form submission
   searchForm.submit(async function (event) {
      event.preventDefault();
      let term = searchTerm.val();
      term = term.trim();
      searchForm[0].reset();
      if(term.length === 0){
         error.html('Error: search term must have length greater than zero!');
         error.show();
      } else {
         error.hide();
         title.show();
         show.hide();
         showList.empty();
         homeLink.show();
         $.ajax({
            url: `http://api.tvmaze.com/search/shows?q=${term}`,
            type: 'Get'
         }).then(function (shows) {
            for(let i=0; i<shows.length; i++){
               let a = $(`<a href="${shows[i].show._links.self.href}"> ${shows[i].show.name} </a>`);
               a.click(function( event ) {
                  // link clicked
                  event.preventDefault();
                  title.hide();
                  showList.hide();
                  show.empty();
                  $.ajax({
                     url: shows[i].show._links.self.href,
                     type: 'Get'
                  }).then(function (showData) {
                     // name
                     if(showData.name){
                        show.append($(`<h1>${showData.name}</h1>`));
                     } else {
                        show.append($(`<h1>N/A</h1>`));
                     }
                     // image
                     if(showData.image){
                        show.append($(`<img src="${showData.image.medium}" alt="Show Image">`));
                     } else {
                        show.append($(`<img src="/public/imgs/no_img.png" alt="No Image Available">`));
                     }
                     // dl
                     let dl = $(`<dl></dl>`);
                     dl.append($(`<dt>Language</dt>`));
                     // language
                     if(showData.language){
                        dl.append($(`<dd>${showData.language}</dd>`));
                     } else {
                        dl.append($(`<dd>N/A</dd>`));
                     }
                     // genres
                     dl.append($(`<dt>Genres</dt>`));
                     if(showData.genres.length > 0){
                        let ul = $(`<ul></ul>`);
                        for(let i=0; i<showData.genres.length; i++){
                           ul.append($(`<li>${showData.genres[i]}</li>`));
                        }
                        let dd = $('<dd></dd>');
                        dd.append(ul);
                        dl.append(dd);
                     } else {
                        dl.append($(`<dd>N/A</dd>`));
                     }
                     // rating.average
                     dl.append($(`<dt>Average Rating</dt>`));
                     if(showData.rating.average){
                        dl.append($(`<dd>${showData.rating.average}</dd>`));
                     } else {
                        dl.append($(`<dd>N/A</dd>`));
                     }
                     // network.name
                     dl.append($(`<dt>Network</dt>`));
                     if(showData.network){
                        dl.append($(`<dd>${showData.network.name}</dd>`));
                     } else {
                        dl.append($(`<dd>N/A</dd>`));
                     }
                     // summary
                     dl.append($(`<dt>Summary</dt>`));
                     if(showData.summary){
                        dl.append($(`<dd>${showData.summary}</dd>`));
                     } else {
                        dl.append($(`<dd>N/A</dd>`));
                     }
                     show.append(dl);
                     show.show();
                     homeLink.show();
                  });
               });
               let li = $(`<li></li>`);
               li.append(a);
               showList.append(li);
            }
            showList.show();
            show.hide();
            error.hide();
         });
      }
   });

})(window.jQuery);