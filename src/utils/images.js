const complete = { cols: 2, rows: 2 };
const half = { cols: 1, rows: 2 };
const quarter = { cols: 1, rows: 1 };
const imageProps = {
  0: {
    1: complete,
    2: half,
    3: half,
    4: quarter,
  },
  1: {
    2: half,
    3: quarter,
    4: quarter,
  },
  2: {
    3: quarter,
    4: quarter,
  },
  3: {
    4: quarter,
  },
};

export const prepareForImageList = (images) => {
  if (!images) {
    return [];
  }

  return images.map((image, i, arr) => {
    return { ...image, ...imageProps[i][arr.length] };
  });
};
