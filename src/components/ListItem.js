import React from "react";
import * as moment from "moment";
import "moment/locale/tr";

function Lists({ data, deleteLists }) {
  moment.locale("tr");
  let parse = Date.parse(data.updated);
  var yayinlanma = moment(parse).startOf("hours").fromNow();
  return (
    <li
      data-id={data.id}
      //onClick={}
      className="cursor-pointer h-20 bg-gray-300 px-10 rounded-lg my-5 w-full flex items-center justify-between"
    >
      <div>
        <p>{data.title}</p>
        <p className="text-gray-500 text-sm">{yayinlanma}</p>
      </div>
      <div>
        <button
          onClick={() => deleteLists(data.id)}
          className="p-3 mx-2 bg-red-600 text-white rounded"
        >
          Sil
        </button>
        <button className="p-3 mx-2 bg-orange-500 text-white rounded">
          Güncelle
        </button>
      </div>
    </li>
  );
}

export default Lists;
