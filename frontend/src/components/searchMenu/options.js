const size = [
  {
    _id: 1,
    name: "XS",
  },
  {
    _id: 2,
    name: "S",
  },
  {
    _id: 3,
    name: "M",
  },
  {
    _id: 4,
    name: "L",
  },
  {
    _id: 5,
    name: "XL",
  },
  {
    _id: 6,
    name: "XXL",
  },
  {
    _id: 7,
    name: "XXXL",
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $99",
    array: [0, 99],
  },
  {
    _id: 2,
    name: "$100 to $199",
    array: [100, 199],
  },
  {
    _id: 3,
    name: "$200 to $399",
    array: [200, 399],
  },
  {
    _id: 4,
    name: "$400 to $599",
    array: [400, 599],
  },
  {
    _id: 5,
    name: "More than $600",
    array: [600, 150000],
  },
];

export { size, price };
