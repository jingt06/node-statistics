const exec = require('child_process').exec;

// helper functions
// isNumeric checks if n is a numeric value
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkArrayAreNumeric(array) {
	return array != null && array.constructor === Array &&
	array.reduce((prev, curr) => prev && isNumeric(curr))
}

command = 'Rscript stat.r'

module.exports = stat = {};

stat.mean = (array, cb) => {
	// first argument is an array of numeric value
	// second is a callback function
	// returns:
	// { mean: ...,
	//   median: ...,
	//   min: ...,
	//   max: ...,
	//   quantile: { '0':..., '25':..., '50':..., '75': ..., '100':... } }
	option = "mean";
	if (!checkArrayAreNumeric(array)){
		console.log('error')
		return cb(new Error('First argument must be an array of numeric value'));
	}
	cmdString = command + ' ' + option + ' ' + array.join(',');
	exec(cmdString, (error, stdout, stderr) => {
	  if (error) {
	    return cb(error);
	    return;
	  }
	  result = JSON.parse(stdout);
	  return cb(null, result);
	});
}


