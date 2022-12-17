import { Rating } from './getRatings';

/**
 * The purpose of this function is to prevent bubbles on the map moving when not necessary.
 */
const mergeRatings = (previousRatings: Rating[], newRatings: Rating[]): Rating[] => {
  const newRatingsNullable: (Rating | null) [] = JSON.parse(JSON.stringify(newRatings));
  const mergedRatings: (Rating | null)[] = Array(newRatings.length).fill(null);

  // put previous ratings in the same index as they were before
  for (let i = 0; i < Math.min(previousRatings.length, newRatings.length); i++) {
    const previousRating = previousRatings[i];
    const idxOfNewRating = newRatings.findIndex(r => r.id === previousRating.id);
    // if previous rating stays
    if (idxOfNewRating !== -1) {
      mergedRatings[i] = newRatings[idxOfNewRating];
      // mark as taken
      newRatingsNullable[idxOfNewRating] = null;
    }
  }

  const newRatingsWithoutNulls = newRatingsNullable.filter(r => r !== null);

  // fill nulls with new ratings
  for (let i = 0; i < mergedRatings.length; i++) {
    const mergedRating = mergedRatings[i];
    if (mergedRating === null) {
      mergedRatings[i] = newRatingsWithoutNulls.shift()!;
    }
  }

  return mergedRatings as Rating[];
};

export default mergeRatings;
