import React from 'react';
import {
    LinkedinFilled
  } from '@ant-design/icons';
  import moment from "moment"

// const img = require("../../public/images/avatar.png")

export default function Card({ content,authName,authRole,authPic, source, link, date }) {
    return <div className="card md:w-2/3 m-auto bg-white boxshadow-3xl outline-none rounded-xl border-2 border-blue">
        <div className="card-content p-6 pt-8">
            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.625 17.5H27V12.5C27 9.74219 29.018 7.5 31.5 7.5H32.0625C32.9977 7.5 33.75 6.66406 33.75 5.625V1.875C33.75 0.835938 32.9977 0 32.0625 0H31.5C25.2844 0 20.25 5.59375 20.25 12.5V31.25C20.25 33.3203 21.7617 35 23.625 35H32.625C34.4883 35 36 33.3203 36 31.25V21.25C36 19.1797 34.4883 17.5 32.625 17.5ZM12.375 17.5H6.75V12.5C6.75 9.74219 8.76797 7.5 11.25 7.5H11.8125C12.7477 7.5 13.5 6.66406 13.5 5.625V1.875C13.5 0.835938 12.7477 0 11.8125 0H11.25C5.03437 0 0 5.59375 0 12.5V31.25C0 33.3203 1.51172 35 3.375 35H12.375C14.2383 35 15.75 33.3203 15.75 31.25V21.25C15.75 19.1797 14.2383 17.5 12.375 17.5Z" fill="#44CCFF" fillOpacity="0.4" />
            </svg>

            <p className="mt-8">
                {content}
            </p>
            <p className="text-gray-400 text-sm">
                {/* {!!date && moment(date)} */}
                {moment(date, "MM-YYYY").format("MMMM, YYYY")}
            </p>
        </div>
        <div className="card-footer md:flex block p-4 justify-between">
            <div className="auth md:flex block ">
                {
                    (authPic && authPic !== "") ?
                        <div className="picture bg-cover bg-center w-12 h-12 border-white border-4 mr-3 shadow-xl rounded-full" style={{ backgroundImage: `url(${authPic})` }}></div> :
                        null
                }

                <div className="block">
                    <b className="text-white text-md font-medium">{authName}</b><br />
                    <b className="text-white font-bold">{authRole}</b>
                </div>
            </div>
            <div className="source w-12 h-12 rounded-full border-white border-4 bg-white ">
                {
                    source==="upwork" && <a className="p-2 mt-0 flex" href={link} target="_blank" rel="noreferrer" title="visit my profile upwork"><svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7435 2.51699C21.3135 2.53349 18.7065 4.80199 17.7305 8.41699C16.093 5.89699 14.8155 3.01449 14.083 0.580994L10.473 0.597994L10.523 10.167C10.5251 10.6175 10.4385 11.064 10.2681 11.481C10.0977 11.8981 9.84676 12.2774 9.52972 12.5975C9.21268 12.9175 8.8357 13.172 8.42031 13.3464C8.00492 13.5208 7.55925 13.6116 7.10875 13.6137C6.19892 13.6181 5.32465 13.2608 4.67826 12.6205C4.3582 12.3034 4.10372 11.9264 3.92935 11.5111C3.75498 11.0957 3.66413 10.65 3.662 10.1995L3.612 0.630494L0 0.647994L0.05 10.2175C0.064 14.1885 3.237 17.335 7.12 17.315C11.003 17.295 14.1475 14.122 14.13 10.15L14.1225 8.52499C14.8505 9.96499 15.7605 11.495 16.7605 12.845L14.553 23.417L18.253 23.4L19.843 15.719C21.291 16.6155 22.918 17.149 24.813 17.14C28.785 17.1225 32.02 13.8585 32 9.705C31.982 5.73199 28.716 2.49849 24.744 2.51649L24.7435 2.51699ZM24.795 13.44C23.351 13.4465 21.904 12.822 20.726 11.8335L21.08 10.3835V10.2925C21.344 8.75549 22.143 6.13449 24.851 6.12249C25.8079 6.12075 26.7266 6.49775 27.4065 7.17114C28.0863 7.84454 28.4721 8.75961 28.4795 9.71649C28.398 11.793 26.691 13.4265 24.7945 13.435L24.795 13.44Z" fill="#6FDA44" />
                </svg></a> 
                }
                {
                    source ==="linkedin" && <a className="text-2xl p-2" href={link} target="_blank" rel="noreferrer" title={`visit ${authName}'s profile`}>
                        <LinkedinFilled /></a>
                }
                
            </div>
        </div>
    </div>
};
