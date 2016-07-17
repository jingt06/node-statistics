args <- commandArgs(trailingOnly=TRUE)

cmd <- args[1]

switch(cmd,
mean={
  # mean (list of num)
  array <- args[2]
  listOfNum <- as.integer(unlist(strsplit(array,",")))
  cat("{")
  cat(paste('"mean":',mean(listOfNum),","))
  cat(paste('"median":',median(listOfNum),","))
  cat(paste('"min":',min(listOfNum),","))
  cat(paste('"max":',max(listOfNum),","))
  quantile <- quantile(listOfNum)
  cat(paste('"quantile":{"0":', quantile[1],
    ',"25":',quantile[2],',"50":',quantile[3],
    ',"75":',quantile[4],',"100":',quantile[5],
    "}"))
  cat("}")
},
{
  # default
  cat('No command found')
}
)