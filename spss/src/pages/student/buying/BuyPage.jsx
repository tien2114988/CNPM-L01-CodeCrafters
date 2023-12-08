import React, { useState } from "react";
import { Link } from "react-router-dom";

const Button = ({ to, text, type, handleClick }) => {
  const bgColor = {
    confirm: "bg-myblue",
    cancel: "bg-myred",
  };
  return (
    <Link
      to={to}
      className={`rounded-lg px-8 py-2 text-2xl text-white ${bgColor[type]}`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

const BuyPage = () => {
  const [pages, setPages] = useState(0);

  const handleClick = () => {
    fetch("http://localhost:3000/user/page/buy", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        page_num: Number(pages),
      }),
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-light-mygray">
      <form className="flex h-2/5 w-2/5 flex-col rounded-2xl bg-white">
        {/* Title */}
        <div className="w-full rounded-t-2xl bg-myblue py-4 text-center text-3xl text-white">
          Mua Trang
        </div>
        {/* Input Fields */}
        <div className="flex h-full items-center text-2xl">
          <div className="flex w-1/2 items-center justify-start">
            <label className="min-w-fit p-4" htmlFor="page-input">
              Số lượng
            </label>
            <input
              className="w-full rounded-lg border border-mygray p-2 text-2xl"
              type="number"
              name="page-input"
              id="page-input"
              placeholder="0"
              onKeyDown={(e) => {
                if (e.key === "-") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
          <div className="flex w-1/2 items-center justify-start">
            <div className="min-w-fit p-4">Tổng</div>
            <div className="mr-4 w-full max-w-full overflow-hidden rounded-lg border border-mygray py-2 pl-2 text-mygray">
              {250 * pages} đ
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="my-4 flex justify-evenly">
          <Button
            to={"/buy/success"}
            text={"Xác nhận"}
            type={"confirm"}
            handleClick={handleClick}
          />
          <Button to={"/buy"} text={"Quay lại"} type={"cancel"} />
        </div>
      </form>
    </div>
  );
};

export default BuyPage;
