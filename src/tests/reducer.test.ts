import boxMakerPageReducer from '../pages/box-maker/data/reducers/boxMakerPageReducer';

const initialState = {
  isDrawing: false,
  drawOptions: {
    color: 'red',
    mode: 'DRAW' as TDrawMode,
  },
  boxes: [],
};

test('Toggle is drawing flag', () => {
  const action = {
    type: 'TOGGLE_IS_DRAWING',
  };

  const newState = boxMakerPageReducer(initialState, action);

  expect(newState.isDrawing).toBe(true);
});

test('Set draw mode', () => {
  const action = {
    type: 'SET_DRAW_MODE',
    payload: {
      drawMode: 'REMOVE',
    },
  };

  const newState = boxMakerPageReducer(initialState, action);

  expect(newState.drawOptions.mode).toBe('REMOVE');
});

test('Set draw color', () => {
  const action = {
    type: 'SET_DRAW_COLOR',
    payload: {
      drawColor: '#ff6f47',
    },
  };

  const newState = boxMakerPageReducer(initialState, action);

  expect(newState.drawOptions.color).toBe('#ff6f47');
});

test('Add and remove boxes', () => {
  const box1 = {
    id: 100100,
    location: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
    ],
    color: '#000',
    rectData: {
      x: 100,
      y: 100,
      w: 100,
      h: 100,
    },
  };

  // Add a box
  const addBox1Action = {
    type: 'ADD_BOX',
    payload: {
      box: box1,
    },
  };

  const stateWithOneBox = boxMakerPageReducer(initialState, addBox1Action);

  expect(stateWithOneBox.boxes.length).toBe(1);
  expect(stateWithOneBox.boxes[0]).toEqual(box1);

  // Add another box
  const box2 = { ...box1, id: 200 };

  const addBox2Action = {
    type: 'ADD_BOX',
    payload: {
      box: box2,
    },
  };

  const stateWithTwoBoxes = boxMakerPageReducer(stateWithOneBox, addBox2Action);

  expect(stateWithTwoBoxes.boxes.length).toBe(2);
  expect(stateWithTwoBoxes.boxes[1]).toEqual(box2);

  // Remove box with id 200
  const removeAction = {
    type: 'REMOVE_BOX',
    payload: {
      boxId: 200,
    },
  };

  const stateAfterRemovingBox = boxMakerPageReducer(
    stateWithTwoBoxes,
    removeAction
  );

  expect(stateAfterRemovingBox.boxes.length).toBe(1);
  expect(stateAfterRemovingBox.boxes[0]).toEqual(box1);

  // Remove all boxes
  const removeAllAction = {
    type: 'REMOVE_ALL_BOXES',
  };

  const stateWithoutBoxes = boxMakerPageReducer(
    stateWithTwoBoxes,
    removeAllAction
  );

  expect(stateWithoutBoxes.boxes.length).toBe(0);
});

test('unknown action', () => {
  const action = {
    type: 'unknown_action',
  };

  const newState = boxMakerPageReducer(initialState, action);

  expect(newState).toEqual(initialState);
});
