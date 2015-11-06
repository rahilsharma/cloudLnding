// Our variables
var express  = require('express');
var app      = express();
var accounts = [];
var accNames=[];
var tokken="";
var jsonloanAPIresponse={};
var oauth;
var request = require('request');
app.use(express.static(__dirname + '/public'));
var nforce = require('nforce');



//using nforce to get token which will be used later=========================================================
var org = nforce.createConnection({
    clientId: '3MVG9JZ_r.QzrS7iWfpjhjXxEdlXH_PgO4PMaBBYxsMj2J5.4Dq8zpC6XYN1WM3wRxtvSEqVoBHXpY4RlW69M',
    clientSecret: '1649334025533170124',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    autoRefresh:true
});


//Gets our borrower Id================================================================================
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





//authenticating using username and password=======================================================================================
org.authenticate({ username: 'darpan@69demo.com', password: 'Merc123!cAsAYYSHbDMGs3tjQMyQiQ80'}, function(err, resp){
    // store the oauth object for this user
    if(!err) oauth = resp;
    fn(oauth.access_token);
});


//our APIs that are being called===============================================================================================
//thos api gives account num count and account num
app.get('/SalesForceAPI/number', function (req,res) {
var jsonOBJ={
    length:accounts.length,
    acctNm:accNames,
    accts:accounts
};
    res.send(jsonOBJ);
});

//this api gives LoanInfo related to oned account
app.get('/Sales/:LoanInfo', function (req,res) {
    var reqLoanInfo=req.query.LoanInfo;
    console.log('cm her');

    loanAPI(tokken,req.param('LoanInfo'),res);
console.log('this started');

})

//for all request redirect to this url
app.get('*',function(req,res){
    res.redirect('/public');
});

var loanAPI=function callAPI(token,reqLoanInfo,res){

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
          console.log(info.content);
            var tmp=[];
            var tmp1=[];
            for(var i=0;i<info.content.length;i++){
                var obj = info.content[i];
                for(var key in obj){
                    tmp.push(key);
                    tmp1.push(obj[key]);
                }
            }
            jsonloanAPIresponse=info.content;
            res.send(jsonloanAPIresponse);


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
