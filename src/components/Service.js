import React from "react";
import { Link } from "react-router-dom";

function Service() {
  return (
    <div className="p-16">
      <h1 className="my-6 text-4xl font-medium">Service</h1>
      <p className="my-4 text-lg text-gray-900">
        My To Do List app makes it easier for you to manage your Google list. In
        this way, you can manage, delete, change and mark as completed your
        tasks in your to-do lists.
      </p>
      <p className="my-4 text-base text-gray-800">
        If you have doubts about privacy, you can visit our{" "}
        <Link className="text-indigo-500" to="/privacy">
          Privacy Policy{" "}
        </Link>
        page.
      </p>
      <h2 className="text-xl font-medium my-2">
        What you can do in this application;
      </h2>
      <ul className="list-disc pl-5 my-5">
        <li>Create new list.</li>
        <li>Create new task.</li>
        <li>Add details to your new task.</li>
        <li>Add the date to your new task.</li>
        <li>Manage your lists.</li>
        <li>Manage your tasks.</li>
      </ul>

      <a href="mailto:ibrahimodev42@gmail.com" className="text-indigo-500">
        Click to contact.
      </a>
    </div>
  );
}

export default Service;
