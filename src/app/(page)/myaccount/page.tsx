"use client";

import ForgotPassworduser from "@/components/ForgotPassword/ForgotPassword";
import UpdateUserPassword from "@/components/UpdateUserPassword/UpdateUserPassword";
// import Verifyresetcode from "../VerifyResetCode/page";

export default function myaccount() {
  return (
    <div className=" grid grid-cols-6 h-screen">
      <div className="button col-span-2  px-2 pl-5 bg-gray-200 ">
        <UpdateUserPassword />
        <ForgotPassworduser />
      </div>
      <div className="button mt-20  px-2 col-span-4">page</div>
    </div>
  );
}
