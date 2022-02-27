import React from "react";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="p-16">
      <h1 className="my-6 text-4xl font-medium">Privacy</h1>
      <p className="my-4 text-lg text-gray-900">
        Your data is not saved in any way or used for commercial transactions.
        You can disconnect from the application at any time. After logging out,
        you can log in to your google account and remove the "Yapılacaklar
        Listem" application from the connected applications. Contact me if you
        have doubts about privacy.
      </p>
      <p className="my-4 text-base text-gray-800">
        If you are wondering how the application works, you can visit our{" "}
        <Link className="text-indigo-500" to="/service">
          Service page{" "}
        </Link>
        .
      </p>
      <h2 className="text-xl font-medium my-2">
        Review what third-party apps can access.
      </h2>
      <ul className="list-disc pl-5 my-5">
        <li>
          <a
            className="text-indigo-500"
            href="https://myaccount.google.com/security"
          >
            Go to the Security section of your Google Account.
          </a>
        </li>
        <li>
          Under "Third-party apps with account access," select Manage
          third-party access.
        </li>
        <li>
          Select the "Yapılacaklar Listem" app and perform the action you want
          to do.
        </li>
      </ul>

      <a href="mailto:ibrahimodev42@gmail.com" className="text-indigo-500">
        Click to contact.
      </a>
    </div>
  );
}

export default Privacy;
