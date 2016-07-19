args <- commandArgs(trailingOnly=TRUE)

cmd <- args[1]

switch(cmd,
  mean={
    # mean (list of num)
    array <- args[2]
    listOfNum <- as.integer(unlist(strsplit(array,',')))
    cat('{')
    cat(paste('"mean":',mean(listOfNum),','))
    cat(paste('"median":',median(listOfNum),','))
    cat(paste('"min":',min(listOfNum),','))
    cat(paste('"max":',max(listOfNum),','))
    cat(paste('"sum":',sum(listOfNum),','))
    cat(paste('"variance":',var(listOfNum),','))
    cat(paste('"stdDev":',sd(listOfNum),','))
    quantile <- quantile(listOfNum)
    cat(paste('"quantile":{"0":', quantile[1],
      ',"25":',quantile[2],',"50":',quantile[3],
      ',"75":',quantile[4],',"100":',quantile[5],
      "}"))
    cat('}')
  },
  regression={
    method <- args[2]
    x <- as.integer(unlist(strsplit(args[3],',')))
    y <- as.integer(unlist(strsplit(args[4],',')))
    switch(method,
      linear={
        # linear regression
        fit <- lm(y~x)
      }
    )
    summary <- summary(fit)
    cat('{')
    res <- summary$residuals
    cat(paste('"residuals":', '[', paste(res, collapse = ','), ']', ','))
    cat(paste('"sigma":', summary$sigma, ','))
    f <- summary$fstatistic
    p <- pf(f[1],f[2],f[3],lower.tail=F)
    cat(paste('"p-value":', p, ','))
    cat('"coefficients":{')
      coe <- summary$coefficients
      length <- length(coe)
      for (i in 1: (length/4)) {
        row <- rownames(coe)[i]
        if (identical(row, '(Intercept)')) {
          row <- 'Intercept'
        }
        l <- length/4
        cat(paste('"',row,'":{', sep = ''))
          cat(paste('"Estimate":', coe[i], ',', sep = ''))
          cat(paste('"StdErr":', coe[i+l], ',', sep = ''))
          cat(paste('"t-value":', coe[i+l*2], ',', sep = ''))
          cat(paste('"PrGtT":', coe[i+l*3], sep = '')) # probability greate than T
        if(i == length/4){
          cat('}')
        } else {
          cat('},')
        }
      }
    cat('}')
    cat('}')
  },
  {
    # default
    cat('No command found')
  }
)