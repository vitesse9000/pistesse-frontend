export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export const SET_FLASH_MESSAGE = 'set_flash_message';
export const CLEAR_FLASH_MESSAGE = 'clear_flash_message';

export type SetFlashMessageAction = {
  type: typeof SET_FLASH_MESSAGE,
  payload: {
    message: string,
    type: AlertType,
  },
};

export type ClearFlashMessageAction = {
  type: typeof CLEAR_FLASH_MESSAGE,
};

export const setFlashMessage = (message: string, type: AlertType = 'warning'): SetFlashMessageAction => ({
  type: SET_FLASH_MESSAGE,
  payload: { message, type },
});

export const clearFlashMessage = (): ClearFlashMessageAction => ({
  type: CLEAR_FLASH_MESSAGE,
});
