/* eslint-disable @next/next/no-img-element */
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useState } from "react";
import { useUserIcon } from "../function/supabase";
type UserIconType = {
  userId?: string;
};

const UserIcon = ({ userId }: UserIconType) => {
  //   const user = useUser();

  //   const { data, isLoading, error } = useUserIcon(user);
  const { data } = useUserIcon(userId);
  console.log(data);

  if (!userId) return null;
  //https://qiqanjfzoupbhfzfwtrr.supabase.co/storage/v1/object/public/icon/ef1e22a8-b116-4c4c-9533-c7986cce1ad4/happy-1836445_1280.jpg
  return (
    <div>
      {data?.[0] ? (
        <div className="h-7 w-7 relative overflow-hidden">
          <Image
            className="rounded-full"
            src={`https://qiqanjfzoupbhfzfwtrr.supabase.co/storage/v1/object/public/icon/${userId}/icon`}
            alt={""}
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
          {/* <img
            className="rounded-full"
            src={`https://qiqanjfzoupbhfzfwtrr.supabase.co/storage/v1/object/public/icon/${userId}/icon`}
            alt={""}
          /> */}
        </div>
      ) : (
        <div className="h-7 w-7 rounded-full bg-blue-300 overflow-hidden">
          User
        </div>
      )}
    </div>
  );
};

export default UserIcon;
