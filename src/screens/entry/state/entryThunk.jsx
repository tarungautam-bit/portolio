import { createAsyncThunk } from "@reduxjs/toolkit";

const ENTER_KEY = "portfolio_entered";

export const checkFirstVisit = createAsyncThunk(
    "entry/checkFirstVisit",

    async () => {
        const hasEntered =
            localStorage.getItem(ENTER_KEY) === "true";

        return hasEntered;
    }
);


export const markFirstVisit = createAsyncThunk(
    "entry/markFirstVisit",

    async () => {
        localStorage.setItem(
            ENTER_KEY,
            "true"
        );

        return true;
    }
);