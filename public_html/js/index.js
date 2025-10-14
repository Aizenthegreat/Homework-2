var scheduleButton = document.getElementById('Schedule');
var cancelButton = document.getElementsById('cancel');
var checkButton = document.getElementById('check');

scheduleButton.onclick = function(){
    var name = document.getElementById('nameInput').value;
    var day = document.getElementById('dayInput').value;
    var time = document.getElementById('timeInput').value;

   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onload = function(){
       if(this.status == 200) {
          document.getElementsById('results').innerHTML = this.responseText;
       }else{
          alert("Server Error");
       }
   };
   xmlhttp.onerror = function(){
        alert("Error");
   };
   xmlhttp.open("GET", "/schedule?name=" + name + "&day=" + day + "&time=" + time);
   xmlhttp.send();
};



cancelButton.onclick = function(){
    var name = document.getElementById('nameInput').value;
    var day = document.getElementById('dayInput').value;
    var time = document.getElementById('timeInput').value;

   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onload = function(){
      if(this.status == 200) {
         document.getElementById('results').innerHTML = this.responseText;
      }else{
         alert("server Error");
      }
   };
   xmlhttp.onerror = function(){
       alert("Error");
   };
   xmlhttp.open("GET", "/cancel?name=" + name + "&day=" + day + "&time=" + time);
   xmlhttp.send();
};




cancelButton.onclick = function(){
    var day = document.getElementById('dayInput').value;
    var time = document.getElementById('timeInput').value;

   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onload = function(){
       if(this.status == 200) {
         document.getElementById('results').innerHTML = this.responseText;
      }else{
         alert("server Error");
      }
   };
   xmlhttp.onerror = function(){
       alert("Error");
   };
   xmlhttp.open("GET", "/check?day=" + day + "&time=" + time + >
   xmlhttp.send();
};



