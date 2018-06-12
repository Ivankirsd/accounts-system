import React from 'react';
import HomeComponent from "./components/home/home-component";
import AccountsComponent from "./components/home/accounts/accounts-component";
import NotFoundComponent from "./components/404/not-found-component";
import TvAccountsComponent from "./components/home/accounts/tv/tv-accounts-component";
import AuthComponent from "./components/auth/auth-component";

export const routes= [
    {   name: 'Auth',
        path: "/auth",
        component: AuthComponent,
        parentComponent: null,
    },
    {
        name: 'Home',
        path: "/",
        component: HomeComponent,
        parentComponent: null,
    },
    {
        name: 'Accounts',
        path: "/accounts",
        component: AccountsComponent,
        parentComponent: 'HomeComponent',
    },
    {
        name: 'TV',
        path: "/accounts/tv",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'MT',
        path: "/accounts/mt",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'Wia',
        path: "/accounts/wia",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'Reports',
        path: "/reports",
        component: AccountsComponent,
        parentComponent: 'HomeComponent',
    },
    {   name: 'Not found',
        component: NotFoundComponent,
        parentComponent: null,
    },
];

