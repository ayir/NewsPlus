var length=0;
var image;
var titl;
var obj=0;
var url;
function getNews(){
  if(length==0){
   
$.getJSON("https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=23e8809be3504a1285d5557a711e677d")
.done(function(json){

var count=json.articles.length;
   length=count;
   obj=json;
}).fail(function(d){console.log("D"+"request failes");});
}}

getNews();

function show() {
  if(length==0){
    getNews();
  }
  if(obj!=0){
  image=obj.articles[length-1].urlToImage;
  titl=obj.articles[length-1].title;
  url=obj.articles[length-1].url;
  }
  else{
    image='48.png';
    titl='No toast';
  }
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: image,
    body: titl
  })
 .onclick = function () {
      window.open(url);      
    };
 length=length-1;
}



// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
     
      show();
      interval = 0;
    }
  }, 60000);
}