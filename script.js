var systemStart = moment("2017-09-23T21:44:51Z") //genesis start time from genesis.json
var epochLength = 432000 //number of slots in an epoch from genesis.json
var slotLength = 1 //slot length in seconds from genesis.json (is not needed right now because it is 1 second)

var now = moment() //current time
var seconds_since_start = now.diff(systemStart, "seconds") //the amout of seconds since between the current time and system start
var current_epoch = parseInt(seconds_since_start / (epochLength * slotLength)) //the current epoch
var seconds_from_start_to_next_epoch =
	(current_epoch + 1) * (epochLength * slotLength)
var next_epoch = systemStart
	.clone()
	.add(seconds_from_start_to_next_epoch, "seconds")
var seconds_between_now_and_next_epoch_start = next_epoch.diff(now, "seconds")
var duration = moment.duration(
	seconds_between_now_and_next_epoch_start,
	"seconds"
)

let epochTimer = function () {
	duration.add(-1, "second")

	if (duration <= 0) {
		current_epoch += 1
		seconds_from_start_to_next_epoch =
			(current_epoch + 1) * (epochLength * slotLength)
		next_epoch = systemStart
			.clone()
			.add(seconds_from_start_to_next_epoch, "seconds")
		seconds_between_now_and_next_epoch_start = next_epoch.diff(now, "seconds")
		duration = moment.duration(
			seconds_between_now_and_next_epoch_start,
			"seconds"
		)
	}
	console.log(duration)
	document.getElementById("currentepoch").innerHTML = current_epoch
	document.getElementById("countdown").innerHTML =
		duration.days() +
		"d " +
		duration.hours() +
		"h " +
		duration.minutes() +
		"m " +
		duration.seconds() +
		"s"
	document.getElementById("date").innerHTML = next_epoch.format(
		"ddd DD MMM YYYY hh:mm:ssa"
	)
}

epochTimer()

var x = setInterval(function () {
	epochTimer()
}, 1000)
