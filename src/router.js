import HomeComponent from "./Components/Home/HomeComponent";
import AccountsComponent from "./Components/Home/Accounts/AccountsComponent";
import NotFoundComponent from "./Components/404/NotFoundComponent";
import TvAccountsComponent from "./Components/Home/Accounts/tv/TvAccountsComponent";
import AuthComponent from "./Components/Auth/AuthComponent";

export const routes= [
    {   name: 'Auth',
        path: "/Auth",
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
        path: "/Accounts",
        component: AccountsComponent,
        parentComponent: 'HomeComponent',
    },
    {
        name: 'TV',
        path: "/Accounts/tv",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'MT',
        path: "/Accounts/mt",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'Wia',
        path: "/Accounts/wia",
        component: TvAccountsComponent,
        parentComponent: 'AccountsComponent',
    },
    {
        name: 'Reports',
        path: "/Reports",
        component: AccountsComponent,
        parentComponent: 'HomeComponent',
    },
    {   name: 'Not found',
        component: NotFoundComponent,
        parentComponent: null,
    },
];

