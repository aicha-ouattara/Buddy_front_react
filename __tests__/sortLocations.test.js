import sortLocations from "../src/utils/sortLocations.js";

test("sort cities", () => {
  const locations = [
    ["Marseille", [{ exp: 1 }]],
    ["Nice", [{ exp: 1 }, { exp: 2 }, { exp: 3 }]],
    ["Montpellier", [{ exp: 1 }, { exp: 2 }]],
  ];

  const locationsSorted = [
    ["Nice", [{ exp: 1 }, { exp: 2 }, { exp: 3 }]],
    ["Montpellier", [{ exp: 1 }, { exp: 2 }]],
    ["Marseille", [{ exp: 1 }]],
  ];

  expect(sortLocations(locations)).toStrictEqual(locationsSorted);
});
