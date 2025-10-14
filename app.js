const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


const availableTimes = {
    Monday: ["1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30"],
    Tuesday: ["1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30"],
    Wednesday: ["1:00", "1:30", "2:00", "2:30", "3:00", "4:00", "4:30"],
    Thursday: ["1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30"],
    Friday: ["1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30"],
};
const appointments = [
    {name: "James", day: "Wednesday", time: "3:30" },
    {name: "Lillie", day: "Friday", time: "1:00" }];

let serverObj =  http.createServer(function(req,res){
	console.log(req.url);
	let urlObj = url.parse(req.url,true);
	switch (urlObj.pathname) {
                case "/":
                        sendFile(req,"/index.html", res);
                        break;
		case "/schedule":
			schedule(urlObj.query,res);
			break;
		case "/cancel":
			cancel(urlObj.query,res);
			break;
                case "/check":
                     check(urlObj.query,res);
                        break;
		default:
			sendFile(req,urlObj.pathname,res);
                        break;

	}
});

function schedule(qObj,res) {
	if (availableTimes[qObj.day].some(time => time == qObj.time))
	{
		res.writeHead(200,{'content-type':'text/plain'});
		res.write("scheduled");
		res.end();
	}
	else 
		error(res,400,"Can't schedule");

 
}

function SchedulingAppointment(qObj,res) {
          if (availableTimes[qObj.day].some(time => time == qObj.time)){
          opentimes[qObj.day] = availableTimes[qObj.day].filter(time => time !== qObj.time);
         

          const reserve = {
              name: qObj.name,
              day: qObj.day,
              time: qObj.time};
          appointments.push(reserve);
   
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write("reserved");
          res.end();
        }else{
           error(res,400, "timeslot Already taken");
        }
}


function cancel(qObj,res) {
          const index = appointments.findIndex( appt => appt.name === qObj.name && appt.day === qObj.day && appt.time === qObj.time);

         if (index !== -1) {
           const canceledAppt = appointments.splice(index,1);
         if (availableTimes[canceledAppt.day]) {
             availableTimes[canceledAppt.day].push(canceledAppt.time);
             availableTimes[canceledAppt.day].sort();
         }

          
           res.writeHead(200, {'Content-type': 'text/plain'});
           res.write("Appointment has been canceled")
           res.end();
         }else{ 
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write('Appointment not found');
            res.end();
         }
}



function sendFile(req,filePath,res){
         fs.readFile('./public_html'+filePath,(err,data) => {
            if (err) {
               console.log(err);
               Respond(res, 404, 'text/html', '404 file not found');
              
            } else{
               const ext = path.extname(filePath);
               let contentType = 'text/plain';
               if (ext === '.html') contentType = 'text/html';
               else if (ext === '.css') contentType = 'text/css';
               else if (ext === '.js') contentType = 'text/javascript';
               else if (ext === '.png') contentType = 'image/png';
               else if (ext === '.jpg') contentType = 'image/jpg';
               else if (ext === '.gif') contentType = 'image/gif';
               else if (ext === '.json') contentType = 'application/json';
               Respond(res, 200, contentType, data);
            }

         });
}

function Respond(res, statusCode, contentType, data){
         res.writeHead(statusCode, {'content-Type': contentType});
         res.end(data);
}

;



function check(qObj,res){
          if (availableTimes[qObj.day] && availableTimes[qObj.day].includes(qObj.time))
           {
                res.writeHead(200,{'content-type':'text/plain'});
                res.write("available");
                res.end();
        
             }else{
                res.writeHead(200,{"content-Type": "text/plain"});
                res.write("Not available");
                res.end();
             }

}

function error(response,status,message) {

	response.writeHead(status,{'content-type':'text/plain'});
	response.write(message);
	response.end();
}

serverObj.listen(80,function(){console.log("listening on port 80")});

