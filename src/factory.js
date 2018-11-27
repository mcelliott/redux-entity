/** @module Factories */
/* eslint-disable import/prefer-default-export */

const createCursorMeta = () => ({
  endCursor: null,
  hasNextPage: null,
  startCursor: null,
});

const createDefaultMeta = () => ({
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
});

const createMetaData = useCursor => (useCursor ? createCursorMeta() : createDefaultMeta());

/**
 * Creates an initial collection state object with standard or cursor meta.
 * @memberof Factories
 * @param {Object} state Object that's spread into the collection state.
 * @param {Object} options Configuration object.
 * @param {boolean} options.useCursor Set to `true` to use cursor meta.
 * @example
 * import {createCollectionState} from '@foundcareers/redux-entity';
 *
 * // State with Standard Pagination:
 * const stateWithStandardPagination = createCollectionState({
 *  previouslySelectedEntityId: null,
 * }, false);
 * // Output:
 * {
 *  entities: {},
 *  meta: {
 *    currentPage: 0,
 *    nextPage: 0,
 *    prevPage: null,
 *    totalPages: 0,
 *    totalCount: 0
 *  },
 *  selectedEntityId: null,
 *  previouslySelectedEntityId: null
 * }
 *
 * // State with Cursor Pagination:
 * const stateWithMetaPagination = createCollectionState({}, {
 *  useCursor: true
 * });
 * // Output:
 * {
 *  entities: {},
 *  meta: {
 *    endCursor: null,
 *    hasNextPage: null,
 *    startCursor: null
 *  },
 *  selectedEntityId: null,
 * }
 */
export const createCollectionState = (state, options = {}) => ({
  entities: {},
  meta: createMetaData(options.useCursor),
  selectedEntityId: null,
  ...state,
});
