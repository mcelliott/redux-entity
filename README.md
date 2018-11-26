# @foundcareers/redux-entity

[![build status](https://img.shields.io/npm/v/@foundcareers/redux-entity.svg)](https://www.npmjs.com/package/@foundcareers/redux-entity) [![build status](https://img.shields.io/travis/com/foundcareers/redux-entity.svg)](https://travis-ci.com/foundcareers/redux-entity) [![npm downloads](https://img.shields.io/npm/dt/@foundcareers/redux-entity.svg)](https://www.npmjs.com/package/@foundcareers/redux-entity) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This library contains a bunch of helpers to manage entity collections in a redux store. 

## Installation

Install via npm: 
`npm i -s @foundcareers/redux-entity`

Install via yarn: 
`yarn add @foundcareers/redux-entity`

## Example Collection State

Here's an example store that works with `@foundcareers/redux-entity`.

```js
{
  todos: {
    entities: {
      'be9a-a25d21033a20': {
        id: 'be9a-a25d21033a20',
        value: 'Wash clothes'
      },
      'be9a-423mfas5345sd': {
        id: 'be9a-423mfas5345sd',
        value: 'Write todo'
      },
      'be9a-a245gf2033a20': {
        id: 'be9a-a245gf2033a20',
        value: 'Grill salmon'
      },      
    },
    meta: {
      currentPage: 2,
      nextPage: 3,
      prevPage: 1,
      totalPages: 4,
      totalCount: 12,
    },
    selectedEntityId: 'be9a-a245gf2033a20',
  },
  users: {
    entities: {
      'be9a-a245gf2033a21': {
        id: 'be9a-a245gf2033a21',
        name: 'Bob cutlass'
      },
      'ke9a-a245gf2033a22': {
        id: 'ke9a-a245gf2033a22',
        name: 'Peter Noopter'
      },
    },
    meta: {
      currentPage: 2,
      nextPage: 1,
      prevPage: 1,
      totalPages: 2,
      totalCount: 3,
    },
    selectedEntityId: 'ke9a-a245gf2033a22',
  },
}
```

# Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Factories](#factories)
    -   [createCollectionState](#createcollectionstate)
        -   [Parameters](#parameters)
        -   [Examples](#examples)
-   [Selectors](#selectors)
    -   [getEntities](#getentities)
        -   [Parameters](#parameters-1)
    -   [getEntitiesArray](#getentitiesarray)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples-1)
    -   [getSelectedEntityId](#getselectedentityid)
        -   [Parameters](#parameters-3)
    -   [getMeta](#getmeta)
        -   [Parameters](#parameters-4)
    -   [getNextPage](#getnextpage)
        -   [Parameters](#parameters-5)
    -   [getPrevPage](#getprevpage)
        -   [Parameters](#parameters-6)
-   [Reducers](#reducers)
    -   [Examples](#examples-2)
    -   [addEntity](#addentity)
        -   [Parameters](#parameters-7)
    -   [addEntities](#addentities)
        -   [Parameters](#parameters-8)
    -   [removeEntity](#removeentity)
        -   [Parameters](#parameters-9)
    -   [removeEntities](#removeentities)
        -   [Parameters](#parameters-10)
    -   [removeSelectedEntity](#removeselectedentity)
        -   [Parameters](#parameters-11)
    -   [addMeta](#addmeta)
        -   [Parameters](#parameters-12)
    -   [select](#select)
        -   [Parameters](#parameters-13)
    -   [reset](#reset)
        -   [Parameters](#parameters-14)
    -   [createReducer](#createreducer)
        -   [Parameters](#parameters-15)
        -   [Examples](#examples-3)

## Factories

### createCollectionState

Creates an initial collection state object with standard or cursor meta.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object that's spread into the collection state.
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Configuration object. (optional, default `{}`)
    -   `options.useCursor` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set to `true` to use cursor meta.

#### Examples

```javascript
import {createCollectionState} from '@foundcareers/redux-entity';

// State with Standard Pagination:
const stateWithStandardPagination = createCollectionState({
 previouslySelectedEntityId: null,
}, false);
// Output:
{
 entities: {},
 meta: {
   currentPage: 0,
   nextPage: 0,
   prevPage: null,
   totalPages: 0,
   totalCount: 0
 },
 selectedEntityId: null
}

// State with Cursor Pagination:
const stateWithMetaPagination = createCollectionState({}, {
 useCursor: true
});
// Output:
{
 entities: {},
 meta: {
   endCursor: null,
   hasNextPage: null,
   startCursor: null
 },
 selectedEntityId: null,  
}
```

## Selectors

### getEntities

Get entities from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

### getEntitiesArray

Get a sorted array of entities from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `compareFunction` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Comparator used to compare two objects.

#### Examples

```javascript
import {getEntitiesArray} from '@foundcareers/redux-entity';

const todoState = {
 entities: {
   'be9a-a25d21033a20': {
     id: 'be9a-a25d21033a20',
     value: 'Wash clothes'
   },
   'be9a-423mfas5345sd': {
     id: 'be9a-423mfas5345sd',
     value: 'Write todo'
   },
   'be9a-a245gf2033a20': {
     id: 'be9a-a245gf2033a20',
     value: 'Grill salmon'
   }
 },
 meta: {
   currentPage: 2,
   nextPage: 3,
   prevPage: 1,
   totalPages: 4,
   totalCount: 12,
 },
 selectedEntityId: 'be9a-a245gf2033a20'
};

const compareFunction = (a, b) => a.value.localeCompare(b.value);

const entities = getEntitiesArray(todoState, compareFunction);

// Resulting in the following entities array
[
 {
   id: 'be9a-a245gf2033a20',
   value: 'Grill salmon'
 },
 {
   id: 'be9a-a25d21033a20',
   value: 'Wash clothes'
 },
 {
   id: 'be9a-423mfas5345sd',
   value: 'Write todo'
 }
]
```

### getSelectedEntityId

Get the selected entity id from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

### getMeta

Get meta from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

### getNextPage

Get next page from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

### getPrevPage

Get previous page from a collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

## Reducers

### Examples

```javascript
import * as reduxEntity from '@foundcareers/redux-entity';
import * as action from '../actions/todo.js';

const initialState = reduxEntity.createCollectionState();

export const reducer = (state = initialState, {type, payload}) => {
 switch (type) {
   case action.ADD_ENTITY:
     return reduxEntity.addEntity(state, payload);
   case action.ADD_ENTITIES:
     return reduxEntity.addEntities(state, payload);
   case action.REMOVE_ENTITY:
     return reduxEntity.removeEntity(state, payload);
   case action.REMOVE_ENTITIES:
     return reduxEntity.removeEntities(state, payload);
   case action.REMOVE_SELECTED_ENTITY:
     return reduxEntity.removeSelectedEntity(state, payload);
   case action.ADD_META:
     return reduxEntity.addMeta(state, payload);
   case action.SELECT:
     return reduxEntity.select(state, payload);
   case action.RESET:
     return reduxEntity.reset(state, payload);
   default:
     return state;
 }
};
```

### addEntity

Add an entity to the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `payload` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The entity object you'd like to add. Must contain an `id` attribute

### addEntities

Adds entities to the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `payload` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The collection of entities you would

### removeEntity

Remove an entity from the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Entity's id you'd like to remove from the collection state.

### removeEntities

Removes entities from the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `ids` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** An array of entity ids.

### removeSelectedEntity

Remove the selected entity.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.

### addMeta

Add a meta object to the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `payload` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The meta object.

### select

Select an entity in the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `payload` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Entity Id that's being selected.

### reset

Reset the collection state.

#### Parameters

-   `state` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Current Collection state.
-   `initialState` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Initial Collection state (refer to `createCollectionState`).

### createReducer

Helper function used to create a reducer function.

#### Parameters

-   `initialState` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Collection state.
-   `actionTypes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the reducer's default action types.
-   `handlers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing custom reducer actions. (optional, default `{}`)

#### Examples

```javascript
// job.actions.js
export const jobActionTypes = {
 ADD_ENTITY: '[Job] Add Entity',
 REMOVE_ENTITY: '[Job] Remove Entity',
 CUSTOM: '[Job] Custom'
 ...
}

// Creating a reducer for a collection of entities (default case)
// job.reducer.js
export const reducer = reduxEntity.createReducer(
 reduxEntity.createCollectionState(),
 jobActionTypes
);

// Creating a reducer for a collection of entities (customized case)
// job.reducer.js
const initialState = reduxEntity.createCollectionState({
 entityIds: [ ]
});
const customHandlers = {
 [jobActionTypes.ADD_ENTITY_ID]: (state, action) => ({
   ...state, entityIds: [...state.entityIds, action.payload]
 }),
 [jobActionTypes.REMOVE_ENTITY_ID]: (state, action) => ({
   ...state, entityIds: state.entityIds.filter(e => e !== action.payload)
 })
};
export const reducer = reduxEntity.createReducer(
 initialState,
 jobActionTypes,
 customHandlers
);
```
