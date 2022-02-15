import React from "react";
import { date, orjDate, formatDate } from "./date";
import { deleteTask, deleteAllTasks, geriAl } from "../actions";
import { connect } from "react-redux";
import toast from "react-hot-toast";

function Tamamlananlar(props) {
  return (
    <div>
      <li
        onClick={(e) => props.setShowDones(!props.showDones)}
        className="w-full h-14 bg-gray-300 text-gray-500 rounded-xl flex items-center justify-between px-5"
      >
        <p>Tamamlananlar... ({props.tamamlananlar.length})</p>{" "}
        {props.showDones ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
          </svg>
        )}
      </li>
      {props.tamamlananlar.length >= 5 && props.showDones ? (
        <li>
          <button
            onClick={() => {
              const deleteall = props.deleteAllTasks(
                props.secili_lists.id,
                props.secili_lists.title,
                props.secili_lists.updated,
                props.accessToken
              );
              toast.promise(deleteall, {
                loading: "Siliniyor...",
                success: "Tüm tamamlanan görevler silindi!",
                error: "Silinirken hata oluştu",
              });
            }}
            className="flex bg-red-600 mt-2 py-1 w-full h-full rounded-lg items-center justify-center text-white"
          >
            <p className="opacity-90 flex items-center w-full h-full justify-center text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="mr-1"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
              </svg>
              Tümünü Sil
            </p>
          </button>
        </li>
      ) : null}
      {props.showDones
        ? props.tamamlananlar && props.tamamlananlar.length > 0
          ? props.tamamlananlar.map((list, index) => {
              return (
                <li
                  key={index}
                  className="flex w-full items-center rounded-lg bg-gray-300 justify-between my-2 p-2"
                >
                  <div className="flex">
                    <div className="py-0">
                      <h3 className="text-lg break-all line-through pt-0 text-gray-900">
                        {list.title}
                      </h3>
                      {list.notes ? (
                        <div className="flex my-1 items-center justify-start w-full text-base opacity-75 text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 mr-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                          </svg>
                          <p className="break-all w-10/12 line-through">
                            {list.notes}
                          </p>
                        </div>
                      ) : null}

                      {list.due ? (
                        <div className="flex my-1 items-center justify-start w-full text-base opacity-75 text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 mr-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z" />
                          </svg>
                          <p className="line-through">
                            {formatDate(list.due)} - {orjDate(list.due)}
                          </p>
                        </div>
                      ) : null}

                      <div className="flex mb-0 items-center justify-start w-full text-sm opacity-75 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 mr-1"
                          fill="currentColor"
                        >
                          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                        </svg>{" "}
                        <p>{date(list.updated)}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ minWidth: "11rem" }}
                    className="w-44 ml-2 flex items-center justify-center h-full text-gray-900 cursor-pointer"
                  >
                    <button
                      onClick={() => {
                        var data = {};
                        data.title = list.title;
                        data.id = list.id;
                        data.status = "needsAction";
                        if (list.title && !list.notes && !list.due) {
                          data.title = list.title;
                        } else if (list.title && list.notes && !list.due) {
                          data.notes = list.notes;
                        } else if (list.title && !list.notes && list.due) {
                          data.due = list.due;
                        } else if (list.title && list.notes && list.due) {
                          data.notes = list.notes;
                          data.due = list.due;
                        } else {
                          console.error("Görev eklerken bir sorun oluştu.");
                        }
                        const deletetask = props.geriAl(
                          props.secili_lists.id,
                          props.secili_lists.title,
                          props.secili_lists.updated,
                          data,
                          props.accessToken
                        );
                        toast.promise(deletetask, {
                          loading: "Bir saniye...",
                          success: "Geri alındı!",
                          error: "Geri alınırken hata oluştu",
                        });
                      }}
                      className="flex-1 h-12 text-black border-black border-2 font-medium"
                    >
                      Geri Al
                    </button>
                    <button
                      onClick={() => {
                        const deletetask = props.deleteTask(
                          props.secili_lists.id,
                          props.secili_lists.title,
                          props.secili_lists.updated,
                          list.id,
                          props.accessToken
                        );
                        toast.promise(deletetask, {
                          loading: "Siliniyor...",
                          success: "Görev silindi!",
                          error: "Silinirken hata oluştu",
                        });
                      }}
                      className="flex-1 h-12 ml-1 border-red-700 text-red-700 border-2 font-bold "
                    >
                      Sil
                    </button>
                  </div>
                </li>
              );
            })
          : "Hiç görev yok"
        : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    secili_lists: state.secili_lists,
  };
};

export default connect(mapStateToProps, { deleteTask, deleteAllTasks, geriAl })(
  Tamamlananlar
);
