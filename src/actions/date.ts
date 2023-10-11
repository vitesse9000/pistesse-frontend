export const CHANGED_DATE = 'change_date';

export type ChangeDateAction = {
  type: typeof CHANGED_DATE,
  payload: string,
};

export const changeDate = (date: string): ChangeDateAction => ({
  type: CHANGED_DATE,
  payload: date,
});
