export default function dataMapping(data) {
  const mapping = {};

  data[0].forEach((item) => {
    if (item.name === "socialChannel" || item.name === "memeRequirement") {
      // If the item is a nested object (tuple), process its value recursively
      mapping[item.name] = item.value.reduce((acc, subItem) => {
        acc[subItem.name] = subItem.value;
        return acc;
      }, {});
    } else {
      // For regular key-value pairs
      mapping[item.name] = item.value;
    }
  });

  return mapping;
}
