import React from 'react';
import {
    LinkOutlined
} from '@ant-design/icons';
import { Tag,Tooltip } from 'antd';

export default function Card({ projectName,skills,link="",cover,date, projectDescription="" }) {
    return <div className="card-slider w-full md:w-1/3 bg-white boxshadow-3xl outline-none rounded-xl">
        <div className="card-content h-80 bg-cover bg-center" style={{ backgroundImage: `url(${cover})` }}>

        </div>
        <div className="card-footer flex p-4 justify-between">
            <div className="auth flex">

                <div className="block">
                    <b className="text-white font-bold">{projectName}</b><br />
                    <b className="text-white font-normale text-sm">{projectDescription}</b><br />
                    {skills.map((skill, index) => {
                        var color = "green"
                        switch (skill) {
                            case 'React':
                            case 'Redux':
                            case 'JS':
                            case 'ES7':
                            case 'AJAX':
                            case 'JQuery':
                                color = "cyan"
                                break;
                            case 'Git':
                            case 'Gitlab':
                                color = "purple"
                                break;
                            case "Mongo":
                            case "NodeJS":
                            case "Material-UI":
                                color = "blue"
                                break
                            case "Heroku":
                            case ".NET core":
                            case "TFS":
                                color = "geekblue"
                                break;
                            case "Python":
                            case "Django":
                            case "Flask":
                            case "Php":
                            case "MYSQL":
                                color = "orange"
                                break;

                            default:
                        }
                        return <Tag key={index} icon={null} color={color}>
                            {skill}
                        </Tag>
                    })}
                    <p style={{fontSize:12, color:"white"}}>{date}</p>
                </div>
            </div>
            <div className="source w-12 h-12">
                <Tooltip title="Visit project">
                    {
                        link && <a className="text-2xl p-2" href={link} target="_blank" rel="noreferrer" title={`visit project link`}>
                            <LinkOutlined /></a>
                    }
                </Tooltip>

            </div>
        </div>
    </div>
};
