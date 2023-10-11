export const TOGGLE_ALL = 'toggle_all';
export const TOGGLE_ONE = 'toggle_one';

export type ToggleAllAction = {
  type: typeof TOGGLE_ALL,
};

export type ToggleOneAction = {
  type: typeof TOGGLE_ONE,
  payload: number,
};

export const toggleAll = (): ToggleAllAction => ({
  type: TOGGLE_ALL,
});

export const toggleOne = (id: number): ToggleOneAction => ({
  type: TOGGLE_ONE,
  payload: id,
});
