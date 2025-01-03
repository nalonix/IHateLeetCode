function dateToUnixEpoch(date) {
    return Math.floor(date.getTime() / 1000);
}
  
function hoursDifference(epochTime1, epochTime2) {
    // Calculate the absolute difference in seconds
    const differenceInSeconds = Math.abs(epochTime1 - epochTime2);
    // Convert the difference from seconds to hours
    const differenceInHours = differenceInSeconds / 3600;
    return differenceInHours;
}


module.exports = {
    dateToUnixEpoch,
    hoursDifference,
};