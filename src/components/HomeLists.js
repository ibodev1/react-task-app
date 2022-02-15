import React, { useState } from "react";
import { getTasks, AddTasksList } from "../actions";
import loading from "../img/loading-state.gif";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const error = (message) => toast.error(message, { duration: 3000 });

function HomeLists(props) {
  const secili_id =
    window.localStorage.getItem("secili_id") || props.secili_lists.id;
  const [showAddNew, setShowAddNew] = useState(false);

  const addSubmit = (e) => {
    e.preventDefault();
    const title = String(e.target[0].value.slice(0, e.target[0].maxLength));
    if (title) {
      const add = props.AddTasksList(title, props.accessToken, props.user);
      toast.promise(add, {
        loading: "Ekleniyor...",
        success: title + " Eklendi!",
        error: "Eklenirken hata oluştu",
      });
      e.target[0].value = "";
      setShowAddNew(false);
    } else {
      error("Boş bırakma!");
    }
  };
  return (
    <div className="w-64 lists h-screen overflow-y-auto min-w-min bg-gray-900">
      <Toaster />
      <p className="font-bold pl-4 pt-3 text-white opacity-95 text-xl">
        Listelerim
      </p>
      <ul className="w-full p-2 overflow-y-auto h-auto">
        {props.isLoading && props.isLoading ? (
          <img src={loading} alt="loading..." />
        ) : props.lists.length > 0 ? (
          props.lists.map((list, index) => {
            if (list.id === secili_id) {
              return (
                <li
                  onClick={() =>
                    props.getTasks(
                      list.id,
                      list.title,
                      list.updated,
                      props.accessToken
                    )
                  }
                  key={index}
                  className="w-full h-12 my-1 flex items-center justify-start p-2 cursor-pointer font-medium bg-gray-800 text-gray-200 rounded-lg"
                >
                  <p className="opacity-90 truncate w-full">{list.title}</p>
                </li>
              );
            } else {
              return (
                <li
                  onClick={() =>
                    props.getTasks(
                      list.id,
                      list.title,
                      list.updated,
                      props.accessToken
                    )
                  }
                  key={index}
                  className="w-full h-12 flex my-1 items-center justify-start p-2 cursor-pointer font-medium hover:bg-gray-800 text-gray-200 rounded-lg"
                >
                  <p className="opacity-90 truncate w-full">{list.title}</p>
                </li>
              );
            }
          })
        ) : (
          setShowAddNew(true)
        )}
        {showAddNew ? (
          <li className="w-full h-auto bg-gray-800 rounded-lg p-2">
            <p className="font-medium text-gray-200">Yeni Liste</p>
            <form
              method="post"
              className="flex flex-col space-y-1"
              onSubmit={addSubmit}
            >
              <input
                type="text"
                name="list_title"
                id="list_title"
                maxLength="30"
                placeholder="Haftaya yapacaklarım."
                className="p-1"
                autoFocus
              />
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowAddNew(false)}
                  type="reset"
                  className="bg-gray-700 p-1 flex-1 text-gray-400"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-indigo-700 flex-1 p-1 text-gray-200"
                >
                  Ekle
                </button>
              </div>
            </form>
          </li>
        ) : (
          <li
            onClick={() => setShowAddNew(true)}
            className="w-full h-12 flex my-1 items-center justify-start p-2 cursor-pointer font-medium bg-gray-800 text-gray-200 rounded-lg"
          >
            <button>
              <p className="opacity-90 flex items-center w-full h-full justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1"
                >
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
                Yeni Ekle
              </p>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    user: state.user,
    login: state.login,
    isLoading: state.isLoading,
    lists: state.lists,
    messages: state.messages,
    status: state.status,
    secili_lists: state.secili_lists,
  };
};

export default connect(mapStateToProps, { getTasks, AddTasksList })(HomeLists);
