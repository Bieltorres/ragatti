export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_SELECTED_COMPANY = 'SET_SELECTED_COMPANY';

export const toggleTheme = () => ({
    type: TOGGLE_THEME,
});

export const setSelectedCompany = (company) => ({
    type: SET_SELECTED_COMPANY,
    payload: company,
});

