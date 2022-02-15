import React from "react";
import { connect } from "react-redux";
import HomeLists from "./HomeLists";
import HomeTask from "./HomeTask";
import LoginButton from "./LoginButton";

function Home(props) {
  return (
    <div className="w-full h-screen overflow-hidden">
      {props.login && props.login ? (
        <div className="w-full h-screen overflow-hidden flex items-start justify-start">
          <HomeLists />
          <HomeTask />
        </div>
      ) : (
        <div className="w-full h-screen overflow-hidden p-20 text-gray-800">
          <h1 className="text-4xl font-bold">
            Google hesanbınızla giriş yapın.
          </h1>
          <p className="text-xl font-medium my-3">Yapabilececkleriniz;</p>
          <ul className="list-disc">
            <li>Yeni liste oluşturun.</li>
            <li>Yeni görev oluşturun.</li>
            <li>Yeni görevinize aytıntı ekleyin.</li>
            <li>Yeni görevinize tarih ekleyin.</li>
            <li>Listelerinizi yönetin.</li>
            <li>Görevlerinizi yönetin.</li>
          </ul>

          <LoginButton />
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
