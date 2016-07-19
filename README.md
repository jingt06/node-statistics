# Node-statistics
A JavaScript implementation  of mean/variance, and a collection of regression methods for finding the trend of data using R language.

# Install
> npm install node-statistics

# Requirement
Must able to run R in shell, visit [CRAM](https://cran.r-project.org/) to have R installed.

# Usage

##### nodeStat.mean(array, cb)

The first argument is an array of numeric value, and cb is a callback funciton of err and result

**return**: 
```javascript 
	{ mean: ...,
	  median: ...,
	  min: ...,
	  max: ...,
	  sum: ...,
	  variance: ...,
	  stdDev: ...,
	  quantile: { '0':..., '25':..., '50':..., '75': ..., '100':... } 
	 }
```

##### nodeStat.regression(method, array, array, cb)

The first argument is an string represents the method of regression, supported reggresion are linear, quadratic, cubic, log. The second and third argument are two array of numeric value, it is x and y value in regression respectfully. The last argument is a callbcak function.

**return**: 
```javascript 
	{
    residuals: [...],
    p-value: ...,
    sigma: ...,
    coefficients: {
    variable : { Estimate: ...,
                 StdErr  : ...,
                 t-value : ...,
                 PrGtT   : ... }
               }
    }
```

