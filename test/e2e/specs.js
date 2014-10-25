/**
 * Created by satish on 18/10/14.
 */
// spec.js
describe('AMS Team Home Page', function() {
    beforeEach(function(){
        browser.get('http://localhost:3000/app');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('AMS Team Info');
    });

    it('should have total 3 teams', function(){
        var teams = element.all(by.repeater('team in teams'));
        expect(teams.count()).toBe(3);
    });


    it('should have in total 9 team members', function(){
        var members = element.all(by.repeater('memeber in members'));
        expect(members.count()).toBe(9);
    });

    function getTeamElementByName(name){
        var deferred = protractor.promise.defer();
        element.all(by.binding('team')).each(function(team){
            team.getText().then(function(text) {
                if (text === name) {
                    deferred.fulfill(team);
                }
            });
        });

        return deferred.promise;
    }


    it('should have 3 members in template/np team',function(){
        var coreTeamElement =  getTeamElementByName('Template/NP');
        coreTeamElement.then(function(team){
            team.click();
            var members = element.all(by.repeater('memeber in members'));
            expect(members.count()).toBe(3);
        });
    });

    it('should have 3 members in the core team',function(){
        var coreTeamElement =  getTeamElementByName('AMS Core');
        coreTeamElement.then(function(team){
            team.click();
            var members = element.all(by.repeater('memeber in members'));
            expect(members.count()).toBe(3);
        });

    });

    it('should only display steven, satish and sathya when we have filer as s',function(){

    });

    it('should display nothing when we put test in filter',function(){

    });



});