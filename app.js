    // *** Constant Require Section:
     
    const express = require("express");
    const request = require("request");
    const bodyParser = require("body-parser");
    const https = require("https");
     
    const app = express();
     
    // *** Body Parser ***
    app.use(bodyParser.urlencoded({extended: true}));
     
    // *** Static Folder ***
    app.use(express.static("public"));
    // app.use("/public", express.static(path.join(__dirname, "public")));
     
    // *** Tracking HTML File ***
    app.get("/", function(req, res){
        res.sendFile(__dirname + "/signup.html");
    });
     
    // *** Signup Route ***
    app.post("/", function(req, res){
     
        const firstName = req.body.fName;
    	const lastName = req.body.lName;
    	const email = req.body.email;
     
        // *** Construct Requesting data ***
        const data = {
            members: [
                {
                  email_address: email,
                  status: 'subscribed',
                  merge_fields: {
                      FNAME: firstName,
                      LNAME: lastName
                  }
                }
              ]
        }
     
        // *** Stringify inputed data ***
        const jsonData = JSON.stringify(data);
     
        // *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
        const url = "https://us21.api.mailchimp.com/3.0/lists/81fe24becb";
     
        const options = {
            method: "POST",
            auth: "name:465907a39993803ce706bd9c5d82f55e-us21"
        };
        
        // *** Requesting and send back our data to mailchimp ***
        const request = https.request(url, options, function(response){

            if(response.statusCode === 200){
                res.sendFile(__dirname+ "/success.html");
            } else {
                res.sendFile(__dirname+ "/failure.html");
            }
            response.on("data", function(data){
                console.log(JSON.parse(data));
            });
        });
     
        // request.write(jsonData);
        request.end();
    });

    //** Post request for our failure route */
    app.post("/failure", function(req,res) {
        res.redirect("/");
    })
     
    app.listen(process.env.PORT || 3000, function(){
        console.log("Server started on port: 3000!");
    });


// API Key : 465907a39993803ce706bd9c5d82f55e-us21
// List Id : 81fe24becb