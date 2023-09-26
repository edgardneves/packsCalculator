$('#packs-per, #packs-per-what').on('change blur', function () {
	var productivity = [
							{
								speed: 0,
								productivity: 0
							},
							{
								speed: -15,
								productivity: 4
							},
							{
								speed: -15,
								productivity: 6
							},
							{
								speed: -15,
								productivity: 10
							}
						],
		speed = [
					0,
					20,
					30,
					50
				];
	var researchBonus = parseInt($('#lab-research-speed').val()),
		researchTime = parseInt($('#research-time').val()),
		productivityModuleLevel = parseInt($('input[name=pml]:checked').val()),
		productivityModules = parseInt($('input[name=pmpl]:checked').val()),
		speedModuleLevel = parseInt($('input[name=sml]:checked').val()),
		speedModules = parseInt($('#speed-modules').val()),
		numberOfPacks = parseInt($('#number-of-packs').val()),
		packsPerWhat = $('#packs-per-what').val(),
		packsPerSecond = parseInt($('#packs-per').val());

	if (packsPerWhat == 'm')
		packsPerSecond /= 60;

	var productivityBonus = productivity[productivityModuleLevel].productivity * productivityModules,
		speedBonus = (productivity[productivityModuleLevel].speed * productivityModules) + (speed[speedModuleLevel] * speedModules / 2),
		effectiveLabResearchSpeed = (1 + researchBonus / 100) * (1 + speedBonus / 100),
		adjustedCycleTime = researchTime / effectiveLabResearchSpeed,
		bonusPacksPerSecond = packsPerSecond * (productivityBonus / 100),
		numberOfLabs = adjustedCycleTime / (1 / packsPerSecond),
		secondsToComplete = (numberOfPacks / (packsPerSecond + bonusPacksPerSecond));

	$('#labs-needed').html(numberOfLabs.toFixed(2));
	$('#ppsstime').html(secondsToComplete.toFixed(2));
	$('#ppsmtime').html((secondsToComplete / 60).toFixed(2));
});

$('#number-of-labs').on('change blur', function () {
	var productivity = [
							{
								speed: 0,
								productivity: 0
							},
							{
								speed: -15,
								productivity: 4
							},
							{
								speed: -15,
								productivity: 6
							},
							{
								speed: -15,
								productivity: 10
							}
						],
		speed = [
					0,
					20,
					30,
					50
				];
				
	var researchBonus = parseInt($('#lab-research-speed').val()),
		researchTime = parseInt($('#research-time').val()),
		productivityModuleLevel = parseInt($('input[name=pml]:checked').val()),
		productivityModules = parseInt($('input[name=pmpl]:checked').val()),
		speedModuleLevel = parseInt($('input[name=sml]:checked').val()),
		speedModules = parseInt($('#speed-modules').val()),
		numberOfPacks = parseInt($('#number-of-packs').val()),
		numberOfLabs = parseInt($('#number-of-labs').val());

	var productivityBonus = productivity[productivityModuleLevel].productivity * productivityModules,
		speedBonus = (productivity[productivityModuleLevel].speed * productivityModules) + (speed[speedModuleLevel] * speedModules / 2),
		effectiveLabResearchSpeed = (1 + researchBonus / 100) * (1 + speedBonus / 100),
		adjustedCycleTime = researchTime / effectiveLabResearchSpeed,
		packsPerSecond = 1 / (adjustedCycleTime / numberOfLabs),
		bonusPacksPerSecond = packsPerSecond * (productivityBonus / 100),
		secondsToComplete = (numberOfPacks / (packsPerSecond + bonusPacksPerSecond));

	$('#pps').html(packsPerSecond.toFixed(2));
	$('#lstime').html(secondsToComplete.toFixed(2));
	$('#lmtime').html((secondsToComplete / 60).toFixed(2));
});

$('form input, form select').on('change blur', function () {
	$('#packs-per').trigger('blur');
	$('#number-of-labs').trigger('blur');

	var productivityModules = parseInt($('input[name=pmpl]:checked').val()),
		speedModules = parseInt($('#speed-modules').val());

	$('#pml-block').toggleClass('invisible', productivityModules == 0);
	$('#sml-block').toggleClass('invisible', speedModules == 0);

}).first().trigger('change');

$('#drop-modules').on('click', function () {
	$('#pmpl0').prop('checked', true);
	$('#speed-modules').val(0);

	$('form input, form select').first().trigger('change');
});

$('#eight-beacon-modules').on('click', function () {
	$('#pmpl2').prop('checked', true);
	$('#pml3').prop('checked', true);
	$('#sml3').prop('checked', true);
	$('#speed-modules').val(16);

	$('form input, form select').first().trigger('change');
});

$('#twelve-beacon-modules').on('click', function () {
	$('#pmpl2').prop('checked', true);
	$('#pml3').prop('checked', true);
	$('#sml3').prop('checked', true);
	$('#speed-modules').val(24);

	$('form input, form select').first().trigger('change');
});

$('#mid-recipe').on('click', function () {
	$('#research-time').val(30);
	$('#number-of-packs').val(250);

	$('form input, form select').first().trigger('change');
});

$('#end-recipe').on('click', function () {
	$('#research-time').val(60);
	$('#number-of-packs').val(1000);

	$('form input, form select').first().trigger('change');
});

var recipes = [
	["Artillery shell range 1", "7", "2000", "60"],
	["Artillery shell shooting speed 1", "7", "2000", "60"],
	["Bullet damage 7", "7", "1000", "60"],
	["Cannon shell damage 6", "7", "2000", "60"],
	["Combat robot damage 6", "7", "1000", "30"],
	["Flamethrower damage 7", "7", "1000", "60"],
	["Follower robot count 7", "7", "1000", "30"],
	["Grenade damage 7", "7", "2000", "45"],
	["Gun turret damage 7", "7", "1000", "60"],
	["Laser turret damage 8", "7", "1000", "60"],
	["Mining productivity 16", "7", "1500", "60"],
	["Rocket damage 7", "7", "1000", "60"],
	["Shotgun shell damage 7", "7", "1000", "60"],
	["Worker robot speed 6", "7", "1000", "60"],
	["Artillery", "6", "2000", "30"],
	["Atomic bomb", "6", "5000", "45"],
	["Braking force 6", "6", "550", "45"],
	["Braking force 7", "6", "650", "60"],
	["Bullet damage 6", "6", "300", "60"],
	["Bullet shooting speed 6", "6", "400", "60"],
	["Cannon shell damage 4", "6", "300", "60"],
	["Cannon shell damage 5", "6", "1000", "60"],
	["Cannon shell shooting speed 4", "6", "400", "60"],
	["Cannon shell shooting speed 5", "6", "1000", "60"],
	["Character logistic slots 6", "6", "1000", "30"],
	["Combat robot damage 5", "6", "300", "30"],
	["Combat robotics 3", "6", "300", "30"],
	["Effect transmission", "6", "75", "30"],
	["Efficiency module 3", "6", "300", "60"],
	["Flamethrower damage 5", "6", "400", "60"],
	["Flamethrower damage 6", "6", "500", "60"],
	["Follower robot count 5", "6", "800", "30"],
	["Follower robot count 6", "6", "1000", "30"],
	["Grenade damage 6", "6", "1000", "45"],
	["Gun turret damage 6", "6", "300", "60"],
	["Inserter capacity bonus 7", "6", "600", "30"],
	["Kovarex enrichment process", "6", "1500", "30"],
	["Lab research speed 6", "6", "500", "30"],
	["Laser turret damage 5", "6", "200", "60"],
	["Laser turret damage 6", "6", "350", "60"],
	["Laser turret damage 7", "6", "500", "60"],
	["Laser turret shooting speed 5", "6", "200", "60"],
	["Laser turret shooting speed 6", "6", "350", "60"],
	["Laser turret shooting speed 7", "6", "450", "60"],
	["Logistic system", "6", "150", "30"],
	["Military 4", "6", "150", "45"],
	["Mining productivity 12", "6", "1200", "60"],
	["Mining productivity 13", "6", "1300", "60"],
	["Mining productivity 14", "6", "1400", "60"],
	["Mining productivity 15", "6", "1500", "60"],
	["Personal roboport 2", "6", "250", "30"],
	["Portable fusion reactor", "6", "200", "30"],
	["Power armor 2", "6", "400", "30"],
	["Rocket damage 6", "6", "300", "60"],
	["Rocket shooting speed 6", "6", "300", "60"],
	["Rocket shooting speed 7", "6", "500", "60"],
	["Rocket silo", "6", "1000", "60"],
	["Shotgun shell damage 6", "6", "300", "60"],
	["Shotgun shell shooting speed 6", "6", "400", "60"],
	["Speed module 3", "6", "300", "60"],
	["Uranium ammo", "6", "1000", "45"],
	["Worker robot cargo size 3", "6", "450", "60"],
	["Worker robot speed 5", "6", "500", "60"],
	["Automation 3", "5", "150", "60"],
	["Braking force 3", "5", "250", "30"],
	["Braking force 4", "5", "350", "30"],
	["Braking force 5", "5", "450", "35"],
	["Character logistic slots 4", "5", "150", "30"],
	["Character logistic slots 5", "5", "500", "30"],
	["Coal liquefaction", "5", "200", "30"],
	["Inserter capacity bonus 4", "5", "250", "30"],
	["Inserter capacity bonus 5", "5", "300", "30"],
	["Inserter capacity bonus 6", "5", "400", "30"],
	["Lab research speed 5", "5", "500", "30"],
	["Logistics 3", "5", "300", "15"],
	["Mining productivity 10", "5", "1000", "60"],
	["Mining productivity 11", "5", "1100", "60"],
	["Mining productivity 8", "5", "800", "60"],
	["Mining productivity 9", "5", "900", "60"],
	["Nuclear fuel reprocessing", "5", "1500", "30"],
	["Productivity module 3", "5", "300", "60"],
	["Worker robot cargo size 2", "5", "300", "60"],
	["Worker robot speed 3", "5", "150", "60"],
	["Worker robot speed 4", "5", "250", "60"],
	["Advanced electronics 2", "4", "300", "30"],
	["Advanced material processing 2", "4", "250", "30"],
	["Advanced oil processing", "4", "75", "30"],
	["Auto character logistic trash slots", "4", "150", "30"],
	["Battery MK2 equipment", "4", "100", "30"],
	["Braking force 1", "4", "100", "30"],
	["Braking force 2", "4", "200", "30"],
	["Bullet damage 5", "4", "200", "60"],
	["Bullet shooting speed 5", "4", "200", "60"],
	["Cannon shell damage 1", "4", "100", "60"],
	["Cannon shell damage 2", "4", "150", "60"],
	["Cannon shell damage 3", "4", "300", "60"],
	["Cannon shell shooting speed 1", "4", "100", "60"],
	["Cannon shell shooting speed 2", "4", "150", "60"],
	["Cannon shell shooting speed 3", "4", "300", "60"],
	["Character logistic slots 3", "4", "150", "30"],
	["Character logistic trash slots 2", "4", "100", "30"],
	["Combat robot damage 3", "4", "200", "30"],
	["Combat robot damage 4", "4", "300", "30"],
	["Combat robotics 2", "4", "200", "30"],
	["Discharge defense", "4", "100", "30"],
	["Efficiency module 2", "4", "75", "30"],
	["Electric energy distribution 2", "4", "100", "45"],
	["Energy shield MK2 equipment", "4", "200", "30"],
	["Exoskeleton equipment", "4", "50", "30"],
	["Explosive rocketry", "4", "100", "30"],
	["Flamethrower damage 3", "4", "250", "60"],
	["Flamethrower damage 4", "4", "250", "60"],
	["Follower robot count 3", "4", "500", "30"],
	["Follower robot count 4", "4", "600", "30"],
	["Grenade damage 4", "4", "300", "45"],
	["Grenade damage 5", "4", "600", "45"],
	["Gun turret damage 5", "4", "200", "60"],
	["Inserter capacity bonus 3", "4", "250", "30"],
	["Lab research speed 3", "4", "250", "30"],
	["Lab research speed 4", "4", "500", "30"],
	["Laser turret damage 3", "4", "100", "60"],
	["Laser turret damage 4", "4", "200", "60"],
	["Laser turret shooting speed 3", "4", "200", "60"],
	["Laser turret shooting speed 4", "4", "200", "60"],
	["Military 3", "4", "100", "30"],
	["Mining productivity 4", "4", "400", "60"],
	["Mining productivity 5", "4", "500", "60"],
	["Mining productivity 6", "4", "600", "60"],
	["Mining productivity 7", "4", "700", "60"],
	["Nuclear power", "4", "1000", "30"],
	["Personal laser defense", "4", "100", "30"],
	["Personal roboport", "4", "50", "30"],
	["Power armor", "4", "200", "30"],
	["Productivity module 2", "4", "75", "30"],
	["Rocket damage 3", "4", "200", "60"],
	["Rocket damage 4", "4", "200", "60"],
	["Rocket damage 5", "4", "300", "60"],
	["Rocket shooting speed 3", "4", "200", "60"],
	["Rocket shooting speed 4", "4", "300", "60"],
	["Rocket shooting speed 5", "4", "300", "60"],
	["Shotgun shell damage 5", "4", "200", "60"],
	["Shotgun shell shooting speed 5", "4", "200", "60"],
	["Speed module 2", "4", "75", "30"],
	["Tanks", "4", "75", "30"],
	["Worker robot cargo size 1", "4", "200", "30"],
	["Worker robot speed 1", "4", "50", "30"],
	["Worker robot speed 2", "4", "100", "30"],
	["Bullet damage 3", "3", "100", "60"],
	["Bullet damage 4", "3", "200", "60"],
	["Bullet shooting speed 4", "3", "200", "60"],
	["Combat robot damage 1", "3", "100", "30"],
	["Combat robot damage 2", "3", "200", "30"],
	["Combat robotics", "3", "150", "30"],
	["Energy shield equipment", "3", "150", "15"],
	["Explosives", "3", "100", "15"],
	["Flamethrower", "3", "50", "30"],
	["Flamethrower damage 1", "3", "100", "45"],
	["Flamethrower damage 2", "3", "200", "45"],
	["Follower robot count 1", "3", "300", "30"],
	["Follower robot count 2", "3", "400", "30"],
	["Grenade damage 1", "3", "50", "30"],
	["Grenade damage 2", "3", "100", "45"],
	["Grenade damage 3", "3", "150", "45"],
	["Gun turret damage 3", "3", "100", "60"],
	["Gun turret damage 4", "3", "200", "60"],
	["Landmines", "3", "100", "30"],
	["Laser turret damage 1", "3", "50", "30"],
	["Laser turret damage 2", "3", "100", "30"],
	["Laser turret shooting speed 1", "3", "50", "30"],
	["Laser turret shooting speed 2", "3", "100", "30"],
	["Laser turrets", "3", "200", "30"],
	["Rocket damage 1", "3", "100", "30"],
	["Rocket damage 2", "3", "200", "30"],
	["Rocket shooting speed 1", "3", "100", "30"],
	["Rocket shooting speed 2", "3", "200", "30"],
	["Rocketry", "3", "120", "15"],
	["Shotgun shell damage 3", "3", "100", "60"],
	["Shotgun shell damage 4", "3", "200", "60"],
	["Shotgun shell shooting speed 4", "3", "200", "60"],
	["Advanced electronics", "2", "200", "15"],
	["Advanced material processing", "2", "75", "30"],
	["Automated rail transportation", "2", "75", "30"],
	["Automobilism", "2", "100", "30"],
	["Battery", "2", "150", "30"],
	["Battery equipment", "2", "50", "15"],
	["Bullet damage 2", "2", "100", "30"],
	["Bullet shooting speed 2", "2", "100", "30"],
	["Bullet shooting speed 3", "2", "100", "60"],
	["Character logistic slots 1", "2", "100", "30"],
	["Character logistic slots 2", "2", "150", "30"],
	["Character logistic trash slots 1", "2", "100", "30"],
	["Circuit network", "2", "100", "15"],
	["Cliff explosives", "2", "200", "15"],
	["Concrete", "2", "250", "30"],
	["Construction robotics", "2", "100", "30"],
	["Efficiency module", "2", "50", "30"],
	["Electric energy accumulators", "2", "150", "30"],
	["Electric energy distribution 1", "2", "120", "30"],
	["Electric engine", "2", "100", "30"],
	["Engine", "2", "100", "15"],
	["Flammables", "2", "50", "30"],
	["Flight", "2", "200", "30"],
	["Fluid wagon", "2", "200", "30"],
	["Gates", "2", "100", "30"],
	["Gun turret damage 1", "2", "50", "30"],
	["Gun turret damage 2", "2", "100", "30"],
	["Inserter capacity bonus 1", "2", "200", "30"],
	["Inserter capacity bonus 2", "2", "250", "30"],
	["Lab research speed 1", "2", "100", "30"],
	["Lab research speed 2", "2", "200", "30"],
	["Landfill", "2", "50", "30"],
	["Laser", "2", "150", "30"],
	["Logistic robotics", "2", "150", "30"],
	["Logistics 2", "2", "200", "30"],
	["Military 2", "2", "20", "15"],
	["Mining productivity 1", "2", "100", "60"],
	["Mining productivity 2", "2", "200", "60"],
	["Mining productivity 3", "2", "300", "60"],
	["Modular armor", "2", "100", "30"],
	["Modules", "2", "100", "30"],
	["Nightvision equipment", "2", "50", "15"],
	["Oil processing", "2", "100", "30"],
	["Plastics", "2", "200", "30"],
	["Portable solar panel", "2", "100", "15"],
	["Productivity module", "2", "50", "30"],
	["Rail signals", "2", "100", "30"],
	["Railway", "2", "75", "30"],
	["Robotics", "2", "150", "30"],
	["Shotgun shell damage 2", "2", "100", "30"],
	["Shotgun shell shooting speed 2", "2", "100", "30"],
	["Shotgun shell shooting speed 3", "2", "100", "60"],
	["Solar energy", "2", "250", "30"],
	["Speed module", "2", "50", "30"],
	["Stack inserter", "2", "150", "30"],
	["Sulfur processing", "2", "150", "30"],
	["Toolbelt", "2", "100", "30"],
	["Automation", "1", "10", "10"],
	["Automation 2", "1", "80", "5"],
	["Bullet damage 1", "1", "50", "30"],
	["Bullet shooting speed 1", "1", "50", "30"],
	["Electronics", "1", "30", "15"],
	["Fluid handling", "1", "100", "30"],
	["Heavy Armor", "1", "30", "30"],
	["Logistics", "1", "20", "15"],
	["Military", "1", "10", "15"],
	["Optics", "1", "10", "15"],
	["Shotgun shell damage 1", "1", "50", "30"],
	["Shotgun shell shooting speed 1", "1", "50", "30"],
	["Steel processing", "1", "50", "5"],
	["Stone walls", "1", "10", "10"],
	["Turrets", "1", "10", "10"]
];

$.each(recipes, function () {
	var name = this[0],
		level = this[1],
		packs = this[2],
		time = this[3];

	$('#level-' + level).append("<option value='" + time + "|" + packs + "'>" + name + "</option>");
});

$('#recipe-select').on('change blur', function () {
	var values = $(this).val(),
		time = values.split('|')[0],
		packs = values.split('|')[1];

	$('#research-time').val(time);
	$('#number-of-packs').val(packs);

	$('#packs-per').trigger('blur');
	$('#number-of-labs').trigger('blur');
});
