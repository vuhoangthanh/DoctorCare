import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
    // redirectPath: state => state.user.userInfo?.roleId === 'R3' ? '/home' : '/system/user-redux'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    // redirectPath: (state, ownProps) => {
    //     const user = state.user
    //     const currentPath = ownProps.location.pathname;
    //     // if (user.isLoggedIn) {
    //     //     return user.roleId === 'R3' ? '' : '/home';
    //     // }
    //     return locationHelper.getRedirectQueryParam(ownProps) || ''
    // },

    // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || (state.user.userInfo?.roleId === 'R3' ? '/home' : '/system/user-redux'),
    allowRedirectBack: false
});