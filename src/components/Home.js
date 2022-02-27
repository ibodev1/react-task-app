import React from "react";
import { connect } from "react-redux";
import HomeLists from "./HomeLists";
import HomeTask from "./HomeTask";
import LoginButton from "./LoginButton";
import Ticked from "../img/ticked.png";
import NoTicked from "../img/no_ticked.png";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="w-full h-screen overflow-hidden">
      {props.login && props.login ? (
        <div className="w-full h-screen overflow-hidden flex items-start justify-start">
          <HomeLists />
          <HomeTask />
        </div>
      ) : (
        <div className="w-full h-screen flex overflow-hidden p-20 text-gray-800">
          <div className="flex-1">
            {" "}
            <h1 className="text-4xl font-bold">
              Google hesanbınızla giriş yapın.
            </h1>
            <p className="text-xl font-medium my-3">Yapabilecekleriniz;</p>
            <ul className="list-disc pl-5">
              <li>Yeni liste oluşturun.</li>
              <li>Yeni görev oluşturun.</li>
              <li>Yeni görevinize aytıntı ekleyin.</li>
              <li>Yeni görevinize tarih ekleyin.</li>
              <li>Listelerinizi yönetin.</li>
              <li>Görevlerinizi yönetin.</li>
            </ul>
            <LoginButton />
          </div>
          <div className="flex-1 flex flex-col items-center justify-start">
            <div>
              <p>
                Google hesabınızla giriş yaparken izin ekranındaki bu bölümü;
              </p>
              <img src={NoTicked} alt="permission" />
              <p>Aşağıdaki hale getirin.</p>
              <img src={Ticked} alt="permission" />
            </div>
            <div className="m-16">
              <Link className="text-indigo-500" to="/service">
                Service
              </Link>{" "}
              |{" "}
              <Link className="text-indigo-500" to="/privacy">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Home);
