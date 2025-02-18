'use client'
import React from 'react';
import { Timeline, Badge } from 'antd';
import { StarFilled } from '@ant-design/icons';
import Card from "./CardWork"
import { useMediaQuery } from "react-responsive";

// const grad = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" class="svg-inline--fa fa-graduation-cap fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>

const LIMIT_IS_MOBILE = 620
export default function TimeLine() {
    const isMobile = useMediaQuery({ maxWidth: LIMIT_IS_MOBILE });


    React.useEffect(() => {
        // setisMobile(window.innerWidth < LIMIT_IS_MOBILE);
        // window.addEventListener("resize", updateDimensions.bind(this));
        // return () => {
        //     window.removeEventListener("resize", updateDimensions.bind(this));
        // };
    });

    // const updateDimensions = () => {
    //     if (window.innerWidth < LIMIT_IS_MOBILE) {
    //         setisMobile(true);
    //     } else {
    //         setisMobile(false);
    //     }
    // }

    return <Timeline mode={isMobile ? "left" : "alternate"}>
        <Timeline.Item label={!isMobile && "Now"} dot={<Badge style={{ fontSize: '16px' }} color="#3de6b4" status="processing" text="" />}>
            <br />
            {isMobile && "Now"}
            <br />
            <br />
        </Timeline.Item>
        <Timeline.Item label={!isMobile && "Sept 2021"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li><b>Clevermate</b>:
                        <ul>
                            <li> Designed and developed a new matching platform from scratch.</li>
                            <li> Maintained legacy systems (Node.js, React.js) and implemented a CRM with Forest Admin.</li>
                            <li> Integrated SMS, email, Calendly, and Stripe services.</li>
                            <li> Improved SEO and optimized WordPress blog performance.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Servichain</b>
                        <ul>
                            <li> Developed the Smart Wallet mobile app using React Native and Expo.</li>
                            <li>Built APIs with Node.js and Express.js and integrated front-end/back-end workflows.</li>
                            <li>Designed architecture for app synchronization with the Marketplace. </li>
                        </ul>
                    </li>
                    <li>
                        <b>Adriver</b>
                        <ul>
                            <li> Built a web solution for 3D object manipulation using Three.js.</li>
                            <li>Developed APIs for uploading/downloading 3D models.</li>
                            <li>Designed the desktop app interface with React.js and Electron.js. </li>
                        </ul>
                    </li>
                </ul>}
                companyName="Skaalab"
                companyLogo="https://www.skaalab.com/images/logo-v1.png"
                role="Fullstack software engineer"
                link="https://www.skaalab.com/"
                address="Remote, Algeria"
                period="Since Sept 2021"
                isMobile={isMobile}
            />
        </Timeline.Item>
        <Timeline.Item label={!isMobile && "Oct 2020"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li>Design the UI/UX wireframes and sketchs.</li>
                    <li>Implement front end features using ReactJS and Redux. </li>
                    <li>Test and deploy the web applications.</li>
                    <li>Work by adopting Scrum method</li>
                </ul>}
                companyName="RightInnov| Cevital Group"
                companyLogo="https://www.cevital.com/wp-content/themes/cevital/img/logo.svg"
                role="Fullstack software engineer"
                link="https://www.cevital.com"
                address="Hybrid, Algeria"
                period="Oct 2020 - Sept 2021"
                isMobile={isMobile}
            />
        </Timeline.Item>

        <Timeline.Item label={!isMobile && "April 2020"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li>Convert Wireframes into React web apps (full responsive and pixel perfect).</li>
                    <li>Communicate with clients and understand their needs and take feedbacks.</li>
                    <li>Implementing full responsive web apps using ReactJS.</li>
                    <li>Implement Continues integration with Jenkins.</li>
                    <li>Debug and fix CSS styling issues and responsive views.</li>
                </ul>}
                companyName="Upwork"
                companyLogo="data:image/png;base64,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"
                role="Independent web developer"
                link="https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/"
                address="Remote"
                period="April 2020 - Sept 2021"
                isMobile={isMobile}
            />
        </Timeline.Item>
        <Timeline.Item label={!isMobile && "Dec 2019"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li>Maintain UI and UX of web applications and solutions.</li>
                    <li>Deploy web apps with IIS server and test them.</li>
                    <li>Deploy and manage mobile apps on PlayStore.</li>
                    <li>Write technical documents and illustrate system architecture with UML diagrams.</li>
                    <li>Work on front-end web app with AngularJS (creating new features and fixing bugs). </li>
                    <li>Implement, test and deploy Identity Server implemented using .NET core 2.</li>
                </ul>}
                companyName="National Agency of Employment"
                companyLogo="https://auth.anem.dz/icon1.png"
                role="Software engineer"
                link="https://wassitonline.anem.dz/"
                address="Remote & Algiers, Algeria"
                period="Dec 2019 - Oct 2020"
                isMobile={isMobile}
            />
        </Timeline.Item>
        <Timeline.Item label={!isMobile && "Sept 2019"} dot={<StarFilled />}>
            <p> <b>Graduation!</b>  <br /> MSC software engineering</p>
        </Timeline.Item>

        <Timeline.Item label={!isMobile && "Sept 2018"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li>Implement web application for talent management.</li>
                    <li>Analyse and understand the company&apos;s needs and write the functional and technical specifications for the project.</li>
                    <li>Design wireframes and validate them with product owner.</li>
                    <li>Implement front end side using React JS.</li>
                    <li>Implement Back end side using NodeJS with MYSQL database.</li>
                    <li>Work on Scrum project managment framework.</li>
                    <li>Write full documentation for the project (Specs, Diagrams, Technologies, System design and Tests).</li>
                </ul>}
                companyName="Cevital"
                companyLogo="https://scontent-amt2-1.xx.fbcdn.net/v/t1.18169-9/15578664_665808496932092_3681145542378061264_n.png?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=i9J0Dsmis0YAX_vWCsK&_nc_ht=scontent-amt2-1.xx&oh=c4f1f017cf34c65f4ec8c8bc5b98b7d0&oe=609380FE"
                role="Software engineer intern"
                link="https://www.cevital.com/en/"
                address="Algiers, Algeria"
                period="Sept 2018 - Aug 2019"
                isMobile={isMobile}
            />
        </Timeline.Item>
        <Timeline.Item label={!isMobile && "July 2018"}>
            <Card
                content={<ul>
                    <b>Main Roles:</b>
                    <li> Design the web interfaces, convert PSD designs to HTML.</li>
                    <li>build full responsive web applications with HTML CSS and JQuery</li>
                    <li>implement e-learning platform dashboard using ReactJS and material UI.</li>
                </ul>}
                companyName="Unicoorp"
                companyLogo="https://media-exp1.licdn.com/dms/image/C4E0BAQE-IR2UdXWhZw/company-logo_200_200/0/1527264519741?e=1625702400&v=beta&t=JP5YVsJkaCO8OTlhO60Guile496NPbBB1fnigRk7Tv8"
                role="Front-end developer intern"
                link="https://www.linkedin.com/company/unicoorp/about/"
                address="Algiers, Algeria"
                period="July 2018 to Nov 2018"
                isMobile={isMobile}
            />
        </Timeline.Item>


    </Timeline>
};
