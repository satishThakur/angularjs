var express = require('express'),
    app = express();

var bodyParser = require('body-parser');

//Express 3
//app.configure(function() {
//    app.use(express.static(__dirname, '/'));
//});

//Express 4
app.use(express.static(__dirname, '/'));

var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/app/members/:id', function(req, res) {
    var memberId = parseInt(req.params.id);
    var data = {};
    for (var i=0,len=teamMembers.length;i<len;i++) {
        if (teamMembers[i].id === memberId) {
            data = teamMembers[i];
            break;
        }
    }
    res.json(data);
});

app.get('/app/members', function(req, res) {
    res.json(teamMembers);
    //res.json(500, { error: 'An error has occurred!' });
});

app.get('/app/teams', function(req, res) {

    res.json(teams);
});


app.post('/app/members/:id', function(req, res){
    var memberId = parseInt(req.params.id);

    for (var i=0,len=teamMembers.length;i<len;i++) {
        if (teamMembers[i].id === memberId) {
            var member = teamMembers[i];
            member.name = req.body.name || member.name;
            member.role = req.body.role || member.role;
            member.team = req.body.team || member.team;
            member.officeEmail = req.body.officeEmail || member.officeEmail;
            member.gmail = req.body.gmail || member.gmail;
            return res.json(member);
        }
    }

    return res.json({status : false});

});


app.post('/app/members', function(req, res){
    var highestId = 0;

    for (var i=0,len=teamMembers.length;i<len;i++) {
        if(teamMembers[i].id > highestId){
            highestId = teamMembers[i].id;
        }
    }

    var id = highestId + 1;
    var newMember = {};
    newMember.id  = id;
    newMember.name = req.body.name;
    newMember.role = req.body.role;
    newMember.team = req.body.team;
    newMember.officeEmail = req.body.officeEmail;
    newMember.gmail = req.body.gmail;

    teamMembers.push(newMember);

    res.json(newMember);

});

app.delete('/app/members/:id', function(req, res) {
    var memberId = parseInt(req.params.id);
    var data = { status: true };
    for (var i=0,len=teamMembers.length;i<len;i++) {
        if (teamMembers[i].id === memberId) {
            teamMembers.splice(i,1);
            data = { status: true };
            break;
        }
    }
    res.json(data);
});

app.listen(3000);

console.log('Express listening on port 3000');


var teams = [
    "Template/NP",
    "SNMP Runtime",
    "AMS Core"
];

var teamMembers = [
    {
        id: 0,
        name : "Satish Kumar",
        team : "AMS Core",
        role : "Developer",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },

    {
        id: 1,
        name: "Steven Van Hoof",
        team: "AMS Core",
        role: "Architect",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },

    {
        id: 2,
        name: "Mukesh Palavalasa",
        team: "AMS Core",
        role: "IA",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },

    {
        id : 3,
        name : "Peter V",
        team : "SNMP Runtime",
        role : "IA",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },

    {
        id: 4,
        name: "Bala",
        team: "SNMP Runtime",
        role: "Developer",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },

    {
        id: 5,
        name: "Sathya",
        team: "SNMP Runtime",
        role: "Developer",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },
    {
        id: 6,
        name: "Huy Nagyen",
        team: "Template/NP",
        role: "IA",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },
    {
        id : 7,
        name : "Tuan Nguyen",
        team : "Template/NP",
        role : "Developer",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    },
    {
        id : 8,
        name : "Tai Tran",
        team : "Template/NP",
        role : "Developer",
        officeEmail : "satish.sk.kumar@alcatel-lucent.com",
        gmail : "satish.manit@gmail.com"
    }



];