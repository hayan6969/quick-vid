import React from "react";
import Image from "next/image";

type prop={
    img: string,
    title: string,
    description: string,
    handleClick: ()=>(void),
    className: string
}

function HomeCard({ img, title, description, handleClick, className }:prop) {
  return (
    <div
      onClick={handleClick}
      className={` ${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor pointer`}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={img}
          alt="Add Meeting"
          width={27}
          height={27}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
}

export default HomeCard;
