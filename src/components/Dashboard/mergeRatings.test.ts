import mergeRatings from './mergeRatings';

const r = (id: number, value: number) => ({
  id: id.toString(),
  name: id.toString(),
  latitude: id,
  longitude: id,
  value,
});

it('keeps index of ratings that stay when new ratings are longer', () => {
  const previousRatings = [r(1, 1), r(2, 1), r(3, 1), r(4, 1)];
  const newRatings = [r(5, 2), r(7, 2), r(3, 2), r(2, 2), r(8, 2)];
  const mergedRatings = mergeRatings(previousRatings, newRatings);
  expect(mergedRatings).toEqual([r(5, 2), r(2, 2), r(3, 2), r(7, 2), r(8, 2)]);
});

it('keeps index of ratings that stay when new ratings are shorter', () => {
  const previousRatings = [r(5, 1), r(7, 1), r(3, 1), r(2, 1), r(8, 1)];
  const newRatings = [r(1, 2), r(2, 2), r(3, 2), r(4, 2)];
  const mergedRatings = mergeRatings(previousRatings, newRatings);
  expect(mergedRatings).toEqual([r(1, 2), r(4, 2), r(3, 2), r(2, 2)]);
});

it('keeps index of as much ratings as possible when new ratings are shorter', () => {
  const previousRatings = [r(5, 1), r(7, 1), r(3, 1), r(2, 1), r(8, 1)];
  const newRatings = [r(1, 2), r(2, 2), r(3, 2)];
  const mergedRatings = mergeRatings(previousRatings, newRatings);
  expect(mergedRatings).toEqual([r(1, 2), r(2, 2), r(3, 2)]);
});    
