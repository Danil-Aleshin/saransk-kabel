import { createSlice } from "@reduxjs/toolkit";

interface initalState{
  theme:string,
}

const initialState:initalState ={
  theme:"light"
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state) {
      state.theme === "light" ? state.theme = "dark" : state.theme = "light"
    }
  }
})

export const { setTheme } = ThemeSlice.actions

export default ThemeSlice.reducer