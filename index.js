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

command = command = 'Rscript ' + __dirname + '/stat.r'

module.exports = stat = {};

stat.mean = (array, cb) => {
	// first argument is an array of numeric value
	// second is a callback function
	// returns:
	// { mean: ...,
	//   median: ...,
	//   min: ...,
	//   max: ...,
	// 	 sum: ...,
    //   variance: ...,
    //   stdDev: ...,
	//   quantile: { '0':..., '25':..., '50':..., '75': ..., '100':... } }
	option = "mean";

	// error check
	if (!checkArrayAreNumeric(array)){
		return cb(new Error('First argument must be an array of numeric value'));
	}

	// build command
	cmdString = command + ' ' + option + ' ' + array.join(',');
	exec(cmdString, (error, stdout, stderr) => {
	  if (error) {
	    return cb(error);
	  }
	  result = JSON.parse(stdout);
	  return cb(null, result);
	});
}

stat.regression = (method, xArr, yArr, cb) => {
	option = 'regression';
	// first argument is string represent regression method
	supportedMethods = ['linear', 'quadratic', 'cubic', 'log'];
	// second argument an array of X value
	// third argument is an array of Y value
	// forth argument is a callback function
	// returns:
	//	{
	//   "residuals": [...],
	//   "p-value": ...,
	//   "sigma": ...,
	//   "coefficients": {
	//   	... : { "Estimate": ...
	//              "StdErr"  : ...
	//              "t-value" : ...
	//              "PrGtT"   : ... }
    //     }
    //  }

	//error check
	if (!checkArrayAreNumeric(xArr)){
		return cb(new Error('First argument must be an array of numeric value'));
	}
	if (!checkArrayAreNumeric(yArr)){
		return cb(new Error('First argument must be an array of numeric value'));
	}
	if (xArr.length != yArr.length){
		return cb(new Error('Two array are not equal length'));
	}
	if (supportedMethods.indexOf(method) == -1) {
		return cb(new Error('Method ' + method + ' is not one of supported methods'));
	}

	// build command
	cmdString = command +' ' + option + ' ' + method + ' ' +
	xArr.join(',') + ' ' + yArr.join(',')
	exec(cmdString, (error, stdout, stderr) => {
	  if (error) {
	    return cb(error);
	  }
	  result = JSON.parse(stdout);
	  cb(null, stdout)
	});
}