import React from "react";
import { getDate, minToday } from "./date";

function EditTask({ list, setEditTask, Edit }) {
  return (
    <div className="w-full h-auto mb-5">
      <form method="post" className="space-y-1" onSubmit={Edit}>
        <div className="flex relative items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="absolute top-2 left-2"
            viewBox="0 0 24 24"
          >
            <path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z" />
          </svg>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-3 pl-10 outline-none"
            placeholder="Odamı toplayacağım."
            name="title"
            id="title"
            maxLength="100"
            required
            autoFocus
            defaultValue={list.title}
            onFocus={function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
        </div>
        {list.notes ? (
          <div className="w-full flex relative items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="absolute top-3 left-2"
              viewBox="0 0 24 24"
            >
              <path d="M24 3h-24v-2h24v2zm-12 3h-12v2h12v-2zm12 5h-24v2h24v-2zm-12 5h-12v2h12v-2zm12 5h-24v2h24v-2z" />
            </svg>
            <textarea
              type="text"
              name="ayrinti"
              id="ayrinti"
              required
              className="w-full rounded-lg p-3 pl-10 resize-none outline-none"
              placeholder="Yatağımın yönünü değiştireceğim."
              maxLength="150"
              autoFocus
              onFocus={function (e) {
                var val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
              defaultValue={list.notes}
            />
          </div>
        ) : null}
        {list.due ? (
          <div className="w-44 flex relative">
            <input
              type="date"
              required
              className="w-44 p-3 rounded-lg outline-none"
              name="date"
              id="date"
              min={minToday()}
              defaultValue={getDate(list.due)}
            />
          </div>
        ) : null}
        <button
          onClick={() => setEditTask(0)}
          className="w-24 rounded-lg mr-2 text-gray-200 font-medium h-10 bg-gray-500"
          type="reset"
        >
          İptal
        </button>
        <button
          className="w-24 rounded-lg text-gray-200 font-medium h-10 bg-indigo-500"
          type="submit"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default EditTask;
