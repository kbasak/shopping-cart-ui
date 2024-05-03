import { NavLink } from "react-router-dom";
import "../../App.css";

function LoginUINav({ activeTab }) {
    console.log(activeTab);
    return (
        <>
            <div className="pageSwitcher">
                <NavLink
                    to="/"
                    className={(activeTab === "signin" ? "pageSwitcherItem-signin" : "pageSwitcherItem")}
                >
                    Sign In
                </NavLink>
                <NavLink
                    exact="true"
                    to="/sign-up"
                    className={(activeTab === "signup" ? "pageSwitcherItem-signup" : "pageSwitcherItem")}
                >
                    Sign Up
                </NavLink>
            </div>
            {/* <div className="formTitle">
                <NavLink
                    to="/"
                    className={(activeTab === "signin" ? "formTitleLink-signin" : "formTitleLink")}
                >
                    Sign In
                </NavLink>{" "}
                or{" "}
                <NavLink
                    exact="true"
                    to="/sign-up"
                    className={(activeTab === "signup" ? "formTitleLink-signup" : "formTitleLink")}
                >
                    Sign Up
                </NavLink>
            </div> */}
            <div className="formTitle">
                <div className={(activeTab === "signin" ? "formTitleLink-signin" : "formTitleLink")}>
                    Sign In
                </div>{" "}
                or {" "}
                <div className={(activeTab === "signup" ? "formTitleLink-signup" : "formTitleLink")}>
                    Sign Up
                </div>
            </div>
        </>
    );
}

export default LoginUINav;