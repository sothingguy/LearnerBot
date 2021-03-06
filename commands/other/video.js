module.exports = {
	name: 'video',
	description: 'Sends link to random youtube video with almost no views.',
	usage: '~video',
	op: '0',
	execute(message, args) {
        const {spawn} = require('child_process');
		var dataToSend;
		// spawn new child process to call the python script
		const python = spawn('python3', ['./commands/other/randomvid.py']);
		// collect data from script
		python.stdout.on('data', function (data) {
			dataToSend = data.toString();
		});
		// in close event we are sure that stream from child process is closed
		python.on('close', (code) => {
			// send data to browser
			message.channel.send(dataToSend);
		});
		python.on("error", (err) => {
			message.channel.send("An error has occurred.");
		});
	},
};