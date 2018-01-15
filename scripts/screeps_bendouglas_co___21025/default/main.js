var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairman = require('role.repairman');

module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length + ' Repairmen: ' + repairmen.length);
    console.log('Available Energy: ' + Game.spawns['Spawn1'].room.energyAvailable);
    
    for(var name in Game.creeps) {
        
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        
         var creep = Game.creeps[name];
         if(creep.memory.role == 'harvester') {
             roleHarvester.run(creep);
         }
         if(creep.memory.role == 'upgrader') {
             roleUpgrader.run(creep);
         }
         if(creep.memory.role == 'builder') {
             roleBuilder.run(creep);
         }
         if(creep.memory.role == 'repairman') {
             roleRepairman.run(creep);
         }
     }
     
    if(harvesters.length < 3 && Game.spawns['Spawn1'].room.energyAvailable > 499) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    if(builders.length < 2 && harvesters.length > 2 && Game.spawns['Spawn1'].room.energyAvailable > 499) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
            {memory: {role: 'builder'}});
    }
    
    if(upgraders.length < 3 && harvesters.length > 2 && Game.spawns['Spawn1'].room.energyAvailable > 499) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    if(repairmen.length < 1 && harvesters.length > 2 && Game.spawns['Spawn1'].room.energyAvailable > 499) {
        var newName = 'Repairman' + Game.time;
        console.log('Spawning new repairman: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
            {memory: {role: 'repairman'}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}