// set up ======================================================================
var express  = require('express');
var app      = express();
var accounts = [];
var accNames=[];
var tokken="";
var jsonloanAPIresponse={};
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
var nforce = require('nforce');

var org = nforce.createConnection({
    clientId: '3MVG9JZ_r.QzrS7iWfpjhjXxEdlXH_PgO4PMaBBYxsMj2J5.4Dq8zpC6XYN1WM3wRxtvSEqVoBHXpY4RlW69M',
    clientSecret: '1649334025533170124',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    autoRefresh:true
});
var oauth;
var fn=function callAPI(token){
    tokken=token;
    console.log(token);
    var options = {
        url: 'https://na10.salesforce.com/services/apexrest/peer/v1/loanAccounts?borrowerId=001F00000160F23',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    function callback(error, response, body) {
        console.log('came till here');
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var jj=info.content.length;
            var temp=info.content;
            for(var xx=0;xx<jj;xx++){
                var chu=temp[xx];
                console.log(chu.Id + ":::" + chu.Name);
                accounts.push(chu.Id);
                accNames.push(chu.Name);
            }


        }
        else{
            console.log(error);
            console.log(response);
        }
    }
    request.get(options, callback);
};
org.authenticate({ username: 'darpan@69demo.com', password: 'Merc123!cAsAYYSHbDMGs3tjQMyQiQ80'}, function(err, resp){
    // store the oauth object for this user
    if(!err) oauth = resp;
    fn(oauth.access_token);
});
var request = require('request');

app.get('/SalesForceAPI/number', function (req,res) {
   // console.log(accounts.length + "aaaa" + accNames.length);
var jsonOBJ={
    length:accounts.length,
    acctNm:accNames,
    accts:accounts
};
    res.send(jsonOBJ);
});
app.get('/Sales/:LoanInfo', function (req,res) {
    var reqLoanInfo=req.query.LoanInfo;
    console.log('cm her');

    loanAPI(tokken,req.param('LoanInfo'));
    var jsonOBJ={
        length:accounts.length,
        acctNm:accNames,
        accts:accounts
    };
    res.send(jsonOBJ);
})
app.get('*',function(req,res){
    res.redirect('/public');
});


var loanAPI=function callAPI(token,reqLoanInfo){

    var options = {
        url: 'https://na10.salesforce.com/services/apexrest/peer/v1/loanAccounts/getDetails/'+ reqLoanInfo,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    function callback(error, response, body) {
        console.log('came till here');
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
         //  console.log(info.content[0]);


        }
        else{
            console.log(error);
            console.log(response);
        }
    }
    request.get(options, callback);
};

// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port " + 8000);
