import { useState } from "react";
import { minToday } from "./date";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
const AddNewTaks = ({ setShowAddNew, AddTask }) => {
  const [showAyrinti, setShowAyrinti] = useState(false);
  const [showDate, setShowDate] = useState(false);
  return (
    <div className="w-full h-auto bg-slate-300 p-2 relative">
      <h4 className="text-xl h-auto font-medium flex items-center justify-between ">
        Yeni Görev Ekle{" "}
      </h4>
      <button
        onClick={() => {
          setShowAddNew(false);
          setShowAyrinti(false);
          setShowDate(false);
        }}
        className="opacity-75 absolute top-2 right-3 rounded-full hover:bg-gray-400 p-3"
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
      <form
        method="post"
        onSubmit={AddTask}
        className="w-full h-auto flex flex-col text-gray-600 space-y-1 pb-12 relative"
      >
        <label htmlFor="title" className="text-gray-500 text-base">
          Yeni göreviniz ne hakkında?
        </label>
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
            onFocus={function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
        </div>

        {showAyrinti ? (
          <div className="w-full flex relative items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => setShowAyrinti(false)}
              className="w-3.5 absolute -top-1 -right-1 text-red-600 opacity-75 h-4 cursor-pointer hover:text-red-900"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
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
            />
          </div>
        ) : null}

        {showDate ? (
          <div className="w-44 flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => setShowDate(false)}
              className="w-3.5 absolute -top-1 -right-1 opacity-75 text-red-600 h-4 cursor-pointer hover:text-red-900"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
            <input
              type="date"
              required
              className="w-44 p-3 rounded-lg outline-none"
              name="date"
              id="date"
              min={minToday()}
            />
          </div>
        ) : null}

        <Menu
          align="start"
          position="initial"
          viewScroll="initial"
          arrow={true}
          direction="right"
          menuButton={
            <MenuButton className="select-none w-9 h-9 bg-gray-700 absolute bottom-1 left-1  flex items-center font-medium text-gray-200 text-4xl justify-center rounded-full">
              +
            </MenuButton>
          }
          transition
        >
          <MenuItem
            onClick={() => setShowAyrinti(true)}
            disabled={showAyrinti ? true : false}
          >
            <svg
              width="24"
              height="24"
              className="mr-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M20 15h4.071v2h-4.071v4.071h-2v-4.071h-4.071v-2h4.071v-4.071h2v4.071zm-8 6h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z" />
            </svg>
            Ayrıntı ekle
          </MenuItem>
          <MenuItem
            onClick={() => setShowDate(true)}
            disabled={showDate ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="mr-3"
              viewBox="0 0 24 24"
            >
              <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
            </svg>
            Tarih ekle
          </MenuItem>
        </Menu>
        <button
          type="submit"
          className="w-44 h-10 absolute bottom-0 right-0 flex items-center justify-center font-medium bg-indigo-700 hover:bg-indigo-800 duration-150 rounded-lg text-xl text-white mt-auto ml-auto"
        >
          Ekle
        </button>
      </form>
    </div>
  );
};

export default AddNewTaks;
