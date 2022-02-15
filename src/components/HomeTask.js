import React, { useEffect, useState } from "react";
import {
  getTasks,
  AddTasks,
  Done,
  deleteLists,
  deleteTask,
  deleteAllTasks,
  updateListTitle,
  UpdateTask,
} from "../actions";
import { connect } from "react-redux";
import { date, orjDate, formatDate } from "./date";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import loading from "../img/loading-state.gif";
import AddNewTaks from "./AddNewTasks";
import Tamamlananlar from "./Tamamlananlar";
import toast, { Toaster } from "react-hot-toast";
import EditTask from "./EditTask";
const error = (message) => toast.error(message, { duration: 3000 });

function HomeTask(props) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [showDones, setShowDones] = useState(false);
  const [tamamlananlar, setTamamlanlar] = useState([]);
  const [editTask, setEditTask] = useState();

  useEffect(() => {
    if (props.login) {
      props.getTasks(
        props.secili_lists.id,
        props.secili_lists.title,
        props.secili_lists.updated,
        props.accessToken
      );
    }
  }, [props.login, props.lists]);
  const AddTask = (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const notes = document.getElementById("ayrinti");
    const date = document.getElementById("date");
    var data = {};
    data.title = title.value.slice(0, title.maxLength);
    if (title && !notes && !date) {
      data.title = title.value.slice(0, title.maxLength);
    } else if (title && notes && !date) {
      data.notes = notes.value.slice(0, notes.maxLength);
    } else if (title && !notes && date) {
      data.due = date.value + "T00:00:00.00+03:00";
    } else if (title && notes && date) {
      data.notes = notes.value.slice(0, notes.maxLength);
      data.due = date.value + "T00:00:00.00+03:00";
    } else {
      error("Görev eklerken bir sorun oluştu.");
    }
    const add = props.AddTasks(
      props.secili_lists.id,
      props.secili_lists.title,
      props.secili_lists.updated,
      data,
      props.accessToken
    );
    toast.promise(add, {
      loading: "Bir saniye...",
      success: "Eklendi!",
      error: "Eklenirken hata oluştu",
    });
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };

  const Edit = (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const notes = document.getElementById("ayrinti");
    const date = document.getElementById("date");
    var data = {};
    data.id = editTask;
    data.title = title.value.slice(0, title.maxLength);
    if (title && !notes && !date) {
      data.title = title.value.slice(0, title.maxLength);
    } else if (title && notes && !date) {
      data.notes = notes.value.slice(0, notes.maxLength);
    } else if (title && !notes && date) {
      data.due = date.value + "T00:00:00.00+03:00";
    } else if (title && notes && date) {
      data.notes = notes.value.slice(0, notes.maxLength);
      data.due = date.value + "T00:00:00.00+03:00";
    } else {
      error("Görev eklerken bir sorun oluştu.");
    }
    const update = props.UpdateTask(
      props.secili_lists.id,
      props.secili_lists.title,
      props.secili_lists.updated,
      data,
      props.accessToken
    );
    toast.promise(update, {
      loading: "Bir saniye...",
      success: "Güncellendi!",
      error: "Güncellenirken hata oluştu",
    });
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    setEditTask(0);
  };

  const updateTitle = (e) => {
    e.preventDefault();
    const title = String(e.target[0].value.slice(0, e.target[0].maxLength));
    if (title) {
      const updateTitle = props.updateListTitle(
        props.secili_lists.id,
        props.secili_lists.updated,
        props.user,
        title,
        props.accessToken
      );
      toast.promise(updateTitle, {
        loading: "Güncelleniyor...",
        success: "Güncellendi!",
        error: "Güncellenirken hata oluştu",
      });
    } else {
      error("Boş bırakma!");
    }
  };

  useEffect(() => {
    setShowAddNew(false);
    setShowDones(false);
    setTamamlanlar([]);
    setEditTitle(false);
    setEditTask(0);
  }, [props.secili_lists.id]);

  useEffect(() => {
    if (props.secili_lists.data) {
      setTamamlanlar([]);
      for (let i = 0; i < props.secili_lists.data.length; i++) {
        const e = props.secili_lists.data[i];
        if (e.status === "completed") {
          setTamamlanlar((tamamlananlar) => [...tamamlananlar, e]);
        }
      }
    }
  }, [props.secili_lists.data]);

  return (
    <div className="w-full flex-1 h-screen overflow-y-auto overflow-hidden relative">
      <Toaster />
      <header className="w-full relative bg-gray-600 p-4">
        {editTitle ? (
          <form method="post" onSubmit={updateTitle}>
            <input
              type="text"
              name="title"
              id="title"
              maxLength="25"
              autoFocus
              defaultValue={props.secili_lists.title}
              className="bg-transparent border-b-2 h-10 w-64 border-gray-200 text-gray-200 text-lg px-2 font-bold"
            />
            <button
              onClick={() => setEditTitle(false)}
              className="ml-2 w-24 rounded-lg mr-2 text-gray-200 font-medium h-10 bg-gray-500"
              type="reset"
            >
              İptal
            </button>
            <button
              className="ml-2 w-24 rounded-lg text-gray-200 font-medium h-10 bg-indigo-500"
              type="submit"
            >
              Kaydet
            </button>
          </form>
        ) : (
          <h1 className="truncate font-semibold text-xl text-white opacity-95">
            {props.secili_lists.title
              ? props.secili_lists.title
              : "Yükleniyor..."}
          </h1>
        )}
        <p className="text-gray-400 text-sm">
          Son güncelleme :{" "}
          {props.secili_lists.updated
            ? date(props.secili_lists.updated)
            : "yükleniyor..."}
        </p>
        <div className="w-12 absolute top-1 right-6 flex items-center justify-center h-full text-gray-200 cursor-pointer">
          <Menu
            align="start"
            position="initial"
            viewScroll="initial"
            arrow={true}
            direction="left"
            menuButton={
              <MenuButton>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                >
                  <path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                </svg>
              </MenuButton>
            }
            transition
          >
            <MenuItem
              onClick={() => {
                if (props.lists.length === 1) {
                  error("En az 1 listen olmak zorunda.");
                } else {
                  props.deleteLists(
                    props.secili_lists.id,
                    props.accessToken,
                    props.user
                  );
                }
              }}
              className="text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="mr-1"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
              </svg>{" "}
              Listeyi sil
            </MenuItem>
            <MenuItem onClick={() => setEditTitle(!editTitle)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="20"
                height="20"
                className="mr-1"
                viewBox="0 0 24 24"
              >
                <path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" />
              </svg>
              Adı düzenle
            </MenuItem>
            <MenuItem
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
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm4 5c-2.339 0-3.537-1.388-4.917-3h-4.083v16h20v-13h-11zm-1.586 3l2.586 2.586 2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414z" />
              </svg>
              Tamamlananları temizle
            </MenuItem>
          </Menu>
        </div>
      </header>
      {showAddNew ? (
        <AddNewTaks setShowAddNew={setShowAddNew} AddTask={AddTask} />
      ) : null}

      <div
        className="p-2 w-full space-y-2 overflow-y-auto"
        style={{ minHeight: "85vh" }}
      >
        <ul className="w-full space-y-2 h-auto">
          {props.secili_lists.data &&
          props.secili_lists.data.length > 100 ? null : showAddNew ? null : (
            <li className="w-full h-12">
              <button
                onClick={() => {
                  setShowAddNew(true);
                  setEditTask(0);
                }}
                className="flex bg-gray-600 w-full h-full rounded-lg items-center justify-center text-white"
              >
                <p className="opacity-90 flex items-center w-full h-full justify-center text-lg">
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
          {props.login && props.login ? (
            props.secili_lists.loading ? (
              <img src={loading} className="w-44" alt="loading..." />
            ) : props.secili_lists.data &&
              props.secili_lists.data.length > 0 ? (
              props.secili_lists.data.map((list, index) => {
                if (list.status === "completed") {
                  return null;
                } else {
                  return (
                    <li
                      key={index}
                      className="flex w-full flex-col items-start rounded-lg bg-gray-300 justify-between px-4"
                    >
                      {editTask === list.id ? (
                        <div className="w-full h-auto flex items-center justify-between px-5">
                          <h3 className="text-2xl font-medium text-gray-900 py-4">
                            Düzenleme modu.
                          </h3>
                          <button
                            onClick={() => setEditTask(0)}
                            className="opacity-75 rounded-full hover:bg-gray-400 p-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between w-full">
                          <div className="flex">
                            <div className="flex">
                              <button
                                onClick={() => {
                                  var data = {};
                                  data.title = list.title;
                                  data.id = list.id;
                                  data.status = "completed";
                                  if (list.title && !list.notes && !list.due) {
                                    data.title = list.title;
                                  } else if (
                                    list.title &&
                                    list.notes &&
                                    !list.due
                                  ) {
                                    data.notes = list.notes;
                                  } else if (
                                    list.title &&
                                    !list.notes &&
                                    list.due
                                  ) {
                                    data.due = list.due;
                                  } else if (
                                    list.title &&
                                    list.notes &&
                                    list.due
                                  ) {
                                    data.notes = list.notes;
                                    data.due = list.due;
                                  } else {
                                    error("Görev eklerken bir sorun oluştu.");
                                  }
                                  const done = props.Done(
                                    props.secili_lists.id,
                                    props.secili_lists.title,
                                    props.secili_lists.updated,
                                    data,
                                    props.accessToken
                                  );
                                  toast.promise(done, {
                                    loading: "Bir saniye...",
                                    success: "Görev tamamlandı!",
                                    error: "Tamamlanırken hata oluştu",
                                  });
                                }}
                                className="flex pt-4 pb-4 text-indigo-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z" />
                                </svg>
                              </button>
                              <div className="mx-3 w-2 h-5/6 rounded-xl block my-auto bg-slate-700"></div>
                            </div>
                            <div className="py-2">
                              <h3 className="text-lg break-all pt-2 text-gray-900">
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
                                  <p className="break-all w-10/12">
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
                                  <p>
                                    {formatDate(list.due)} - {orjDate(list.due)}
                                  </p>
                                </div>
                              ) : null}

                              <div className="flex mb-3 items-center justify-start w-full text-sm opacity-75 text-gray-400">
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

                          <div className="w-12 my-auto flex items-center justify-center h-full text-gray-900 cursor-pointer">
                            <Menu
                              align="start"
                              position="initial"
                              viewScroll="initial"
                              arrow={true}
                              direction="left"
                              menuButton={
                                <MenuButton>
                                  <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                  >
                                    <path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                                  </svg>
                                </MenuButton>
                              }
                              transition
                            >
                              <MenuItem
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
                                className="text-red-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  className="mr-1"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                                </svg>{" "}
                                Sil
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setEditTask(list.id);
                                  setShowAddNew(false);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  width="20"
                                  height="20"
                                  className="mr-1"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" />
                                </svg>
                                Düzenle
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      )}

                      {editTask === list.id ? (
                        <EditTask
                          list={list}
                          Edit={Edit}
                          setEditTask={setEditTask}
                        />
                      ) : null}
                    </li>
                  );
                }
              })
            ) : (
              <div className="w-full h-auto flex flex-col p-4 items-start justify-center text-slate-800">
                <h1 className="text-4xl font-semibold">Hiç görevin yok!</h1>
                <p className="text-gray-500 my-1">Hemen bir tane ekle.</p>
                {showAddNew ? null : (
                  <button
                    className="w-40 h-12 bg-indigo-600 text-gray-200 font-medium rounded-lg ml-10 mt-5"
                    onClick={() => {
                      setShowAddNew(true);
                      setEditTask(0);
                    }}
                  >
                    Eklemek için tıkla
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="w-full h-auto flex flex-col p-4 items-center justify-center text-red-700">
              Üzgünüm şuan bişeyler doğru çalışmıyor olabilir.
            </div>
          )}
          {tamamlananlar.length > 0 ? (
            <Tamamlananlar
              showDones={showDones}
              setShowDones={setShowDones}
              tamamlananlar={tamamlananlar}
            />
          ) : null}
        </ul>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    accessToken: state.accessToken,
    user: state.user,
    login: state.login,
    secili_lists: state.secili_lists,
  };
};

export default connect(mapStateToProps, {
  getTasks,
  AddTasks,
  Done,
  deleteLists,
  deleteTask,
  deleteAllTasks,
  updateListTitle,
  UpdateTask,
})(HomeTask);
