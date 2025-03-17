import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

// export const userIsAuthenticated = connectedRouterRedirect({
//     authenticatedSelector: state => state.user.isLoggedIn,
//     wrapperDisplayName: 'UserIsAuthenticated',
//     redirectPath: '/login'
//     // redirectPath: state => state.user.userInfo?.roleId === 'R3' ? '/home' : '/system/user-redux'
// });
export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login',
    allowRedirectBack: false  // Không sử dụng locationHelper để tránh ?redirect=...
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || "/system/user-redux",
    // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || "/doctor/manage-schedule",
    // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || state.user.userInfo?.roleId === 'R3' ? '/home' : '',

    allowRedirectBack: false
});