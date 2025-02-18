import React from 'react';
import { EnvironmentFilled } from '@ant-design/icons';
import { Popover } from 'antd';

// const img = require("../../public/images/avatar.png")
export default function Card({ content,companyName,role,companyLogo,link,address,period = "" }) {
    return (
        <div className="card-work m-auto bg-white boxshadow-3xl outline-none rounded-xl border-2 border-blue">
            <Popover content={ content }>
                <div className="card-header flex p-4 justify-between">
                    <div className="auth md:flex block">
                        <a className="" href={link} target="_blank" rel="noreferrer" title={`visit ${companyName}'s profile`}>
                            {
                                (companyLogo && companyLogo !== "") ?
                                    <div className="picture bg-contain bg-no-repeat bg-white bg-center w-12 h-12 border-white border-4 mr-3 shadow-xl rounded-full" style={{ backgroundImage: `url(${companyLogo})` }}></div> :
                                    null
                            }
                        </a>


                        <div>
                            <b className="text-white font-bold">{role}</b><br />
                            <b className="text-white text-md font-medium">{companyName}</b>
                            <b className="text-white text-md font-medium ml-4"><EnvironmentFilled /><span className="ml-2">{address}</span></b>

                            <b className="text-gray-600 mt-3 block font-light text-xs">
                                {period}
                            </b>
                        </div>
                    </div>
                    {/* <div className="source w-12 h-12 rounded-full">
                        {
                            link && <a className="text-2xl p-2" href={link} target="_blank" rel="noreferrer" title={`visit ${companyName}'s profile`}>
                                <GlobalOutlined />
                            </a>
                        }
                    </div> */}
                </div>
            </Popover>
            <div className="card-content p-6 block md:hidden">
                <p className="mt-8">
                    {content}
                </p>

            </div>
        </div>
    );
};
