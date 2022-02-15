import React from "react";
import { Logout } from "../actions";
import { connect } from "react-redux";
import { GoogleLogout } from "react-google-login";
import LoginButton from "./LoginButton";
import loading from "../img/loading-state.gif";

function Profil(props) {
  return (
    <div className="fixed left-0 top-0 w-80">
      <div className="me h-screen w-full p-3 col-span-3 flex flex-col text-gray-200 bg-slate-800">
        {props.login && props.isLoading && props.isLoading ? (
          <img src={loading} alt="loading..." />
        ) : props.login ? (
          <div className="profil w-full h-full flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center flex-1">
              <img
                className="w-28 rounded-full h-28 bg-gray-500"
                src={
                  props.user && props.user.imageUrl
                    ? props.user.imageUrl + "?v=" + Date.now()
                    : "Veri yok!"
                }
                alt="pp"
              />
              <h1 className=" truncate mt-4 text-2xl font-bold">
                {props.user && props.user.name ? props.user.name : null}
              </h1>
              <p className="truncate text-gray-500">
                {props.user && props.user.email ? props.user.email : null}
              </p>
            </div>

            <div className="btn w-full">
              <GoogleLogout
                clientId="844133981494-0ijvuno7od40s7hj5gd07kgjpg3d6kcs.apps.googleusercontent.com"
                onClick={() => props.Logout()}
                onLogoutSuccess={() => window.location.reload()}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="border-red-700 border-2 w-full p-4 rounded-xl text-red-700 text-xl"
                  >
                    Çıkış Yap
                  </button>
                )}
              ></GoogleLogout>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    isLoading: state.isLoading,
    accessToken: state.accessToken,
    lists: state.lists,
    user: state.user,
    messages: state.messages,
    status: state.status,
  };
};

export default connect(mapStateToProps, { Logout })(Profil);
