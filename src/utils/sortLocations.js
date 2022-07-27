function sortLocations(locations) {
  return locations.sort(function (a, b) {
    return b[1].length - a[1].length;
  });
}
module.exports = sortLocations;
