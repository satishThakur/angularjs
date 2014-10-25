/**
 * Created by satish on 25/10/14.
 */
angular.module('Services').factory('MyMembers',function(MembersResource){
    return MembersResource('members',[]);
});