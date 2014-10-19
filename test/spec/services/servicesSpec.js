/**
 * Created by satish on 14/10/14.
 */
'use strict';

describe('service', function(){

    beforeEach(module('teamApp'));

    it('should have a team name service defined', inject(function(teamNameFactory){
        expect(teamNameFactory).toBeDefined();
    }));

    it('should have a team service defined', inject(function(teamMemberFactory){
        expect(teamMemberFactory).toBeDefined();
    }));
});