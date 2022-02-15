import axios from "axios";

export const Login = (e) => async (dispatch) => {
  dispatch({ type: "GET_LISTS_START" });
  const data = e;
  await axios
    .get("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
      params: {
        access_token: e.accessToken,
        maxResults: 100,
      },
    })
    .then((response) =>
      dispatch({
        type: "GET_LISTS_SUCCESS",
        accessToken: data.accessToken,
        lists: response.data.items,
        user: data.profileObj,
        secili_lists: {
          data: response.data.items,
          title: response.data.items[0].title,
          id: response.data.items[0].id,
          updated: response.data.items[0].updated,
        },
      })
    )
    .catch((error) => dispatch({ type: "GET_LISTS_ERROR", payload: error }));
};

export const Logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const getTasks =
  (id, title, updated, accessToken) => async (dispatch) => {
    dispatch({ type: "SECILI_CHANGE_START" });
    window.localStorage.setItem("secili_id", id);
    window.localStorage.setItem("secili_title", title);
    window.localStorage.setItem("secili_updated", updated);
    await axios
      .get("https://tasks.googleapis.com/tasks/v1/lists/" + id + "/tasks", {
        params: {
          access_token: accessToken,
          maxResults: 100,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) =>
        dispatch({
          type: "SECILI_CHANGE_SUCCESS",
          secili_lists: {
            data: response.data.items,
            title: title,
            id: id,
            updated: updated,
          },
        })
      )
      .catch((error) =>
        dispatch({ type: "SECILI_CHANGE_ERROR", payload: error })
      );
  };

export const AddTasks =
  (tasklist_id, tasklist_title, tasklist_updated, data, accessToken) =>
  async (dispatch) => {
    await axios
      .post(
        "https://tasks.googleapis.com/tasks/v1/lists/" + tasklist_id + "/tasks",
        JSON.stringify(data),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async function () {
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) => {
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                id: tasklist_id,
                title: tasklist_title,
                updated: tasklist_updated,
              },
            });
          })
          .catch((error) => console.log(error));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const Done =
  (tasklist_id, tasklist_title, tasklist_updated, data, accessToken) =>
  async (dispatch) => {
    await axios
      .put(
        "https://tasks.googleapis.com/tasks/v1/lists/" +
          tasklist_id +
          "/tasks/" +
          data.id,
        JSON.stringify(data),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async () => {
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) => {
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                id: tasklist_id,
                title: tasklist_title,
                updated: tasklist_updated,
              },
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

export const deleteLists =
  (id, accessToken, profileObj) => async (dispatch) => {
    await axios
      .delete("https://tasks.googleapis.com/tasks/v1/users/@me/lists/" + id, {
        params: {
          access_token: accessToken,
        },
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(async function () {
        await axios
          .get("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
            params: {
              access_token: accessToken,
              maxResults: 100,
            },
          })
          .then((response) =>
            dispatch({
              type: "GET_LISTS_SUCCESS",
              accessToken: accessToken,
              lists: response.data.items,
              user: profileObj,
              secili_lists: {
                title: response.data.items[0].title,
                id: response.data.items[0].id,
                updated: response.data.items[0].updated,
              },
            })
          )
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const AddTasksList =
  (title, accessToken, profileObj) => async (dispatch) => {
    await axios
      .post(
        "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
        JSON.stringify({
          title: title,
        }),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async function () {
        await axios
          .get("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
            params: {
              access_token: accessToken,
              maxResults: 100,
            },
          })
          .then((response) =>
            dispatch({
              type: "GET_LISTS_SUCCESS",
              accessToken: accessToken,
              lists: response.data.items,
              user: profileObj,
              secili_lists: {
                title:
                  response.data.items[response.data.items.length - 1].title,
                id: response.data.items[response.data.items.length - 1].id,
                updated:
                  response.data.items[response.data.items.length - 1].updated,
              },
            })
          )
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const deleteTask =
  (tasklist_id, tasklist_title, tasklist_updated, task_id, accessToken) =>
  async (dispatch) => {
    await axios
      .delete(
        "https://tasks.googleapis.com/tasks/v1/lists/" +
          tasklist_id +
          "/tasks/" +
          task_id,
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async function () {
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) =>
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                title: tasklist_title,
                id: tasklist_id,
                updated: tasklist_updated,
              },
            })
          )
          .catch((error) =>
            dispatch({ type: "SECILI_CHANGE_ERROR", payload: error })
          );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const deleteAllTasks =
  (tasklist_id, tasklist_title, tasklist_updated, accessToken) =>
  async (dispatch) => {
    await axios
      .post(
        "https://tasks.googleapis.com/tasks/v1/lists/" + tasklist_id + "/clear",
        {},
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async () => {
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) =>
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                title: tasklist_title,
                id: tasklist_id,
                updated: tasklist_updated,
              },
            })
          )
          .catch((error) => console.log("error 1"));
      })
      .catch((error) => console.log("error 2"));
  };

export const updateListTitle =
  (tasklist_id, tasklist_updated, user, newTitle, accessToken) =>
  async (dispatch) => {
    await axios
      .put(
        "https://tasks.googleapis.com/tasks/v1/users/@me/lists/" + tasklist_id,
        JSON.stringify({
          title: newTitle,
          id: tasklist_id,
        }),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async function () {
        await axios
          .get("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
            params: {
              access_token: accessToken,
              maxResults: 100,
            },
          })
          .then((response) =>
            dispatch({
              type: "GET_LISTS_SUCCESS",
              accessToken: accessToken,
              lists: response.data.items,
              user: user,
              secili_lists: {
                title: newTitle,
                id: tasklist_id,
                updated: tasklist_updated,
              },
            })
          )
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const geriAl =
  (tasklist_id, tasklist_title, tasklist_updated, data, accessToken) =>
  async (dispatch) => {
    await axios
      .put(
        "https://tasks.googleapis.com/tasks/v1/lists/" +
          tasklist_id +
          "/tasks/" +
          data.id,
        JSON.stringify(data),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async () => {
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) =>
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                title: tasklist_title,
                id: tasklist_id,
                updated: tasklist_updated,
              },
            })
          )
          .catch((error) => console.log("error 1"));
      })
      .catch((err) => console.error(err));
  };

export const UpdateTask =
  (tasklist_id, tasklist_title, tasklist_updated, data, accessToken) =>
  async (dispatch) => {
    await axios
      .patch(
        "https://tasks.googleapis.com/tasks/v1/lists/" +
          tasklist_id +
          "/tasks/" +
          data.id,
        JSON.stringify(data),
        {
          params: {
            access_token: accessToken,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        await axios
          .get(
            "https://tasks.googleapis.com/tasks/v1/lists/" +
              tasklist_id +
              "/tasks",
            {
              params: {
                access_token: accessToken,
                maxResults: 100,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
            dispatch({
              type: "SECILI_CHANGE_SUCCESS",
              secili_lists: {
                data: response.data.items,
                title: tasklist_title,
                id: tasklist_id,
                updated: tasklist_updated,
              },
            });
          })
          .catch((error) => console.log("error 1"));
      })
      .catch((err) => console.log(err));
  };
