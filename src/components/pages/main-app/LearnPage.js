import React from "react";
import { moneyverse } from "../../../assets/images/moneyverse";
import "antd/dist/antd.css";
// import "./index.css";
import { List, Avatar, Space } from "antd";

const Learn = () => {
  const articles = [
    {
      id: 1,
      name: "How to Improve Your Public Speaking Skills",
      published: "March 12, 2022",
      address: "https://www.verywellmind.com/public-speaking-skills-3024308",
    },
    {
      id: 2,
      name: "How to Speak in Public",
      published: "xx",
      address:
        "https://www.nytimes.com/guides/year-of-living-better/how-to-speak-in-public",
    },
    {
      id: 3,
      name: "Here are the new best practices for public speaking",
      published: "January 18, 2022",
      address:
        "https://fortune.com/2022/01/18/the-new-best-practices-for-public-speaking-knowledge-charisma-and-authenticity/",
    },
    {
      id: 4,
      name: "10 Tips for Improving Your Public Speaking Skills",
      published: "March 17, 2020",
      address:
        "https://professional.dce.harvard.edu/blog/10-tips-for-improving-your-public-speaking-skills/",
    },
    {
      id: 5,
      name: "How to Stop Saying “Um,” “Ah,” and “You Know”",
      published: "August 1, 2018",
      address: "https://hbr.org/2018/08/how-to-stop-saying-um-ah-and-you-know",
    },
    {
      id: 6,
      name: "Speaking as a Skill for Success",
      published: "September 15, 2016",
      address:
        "https://www.edutopia.org/practice/public-speaking-oracy-skills-real-world",
    },
    {
      id: 7,
      name:
        "How The Pandemic Is Giving Public Speakers A Boost: Four Silver Linings To Presenting Virtually",
      published: "November 17, 2020",
      address:
        "https://www.forbes.com/sites/forbesagencycouncil/2020/11/17/how-the-pandemic-is-giving-public-speakers-a-boost-four-silver-linings-to-presenting-virtually/?sh=464527f754f6",
    },
    {
      id: 8,
      name:
        "A Communication Coach's 3 Best Tips to Make Zoom Presentations Less Awkward",
      published: "November 17, 2020",
      address:
        "https://www.inc.com/jessica-stillman/communication-public-speaking-zoom-presentation-tips.html",
    },
  ];

  const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const renderLearn = () => {
    return (
    <div style={{ height: "100vh" }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={articles}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            // actions={[
            //   <IconText
            //     icon={StarOutlined}
            //     text="156"
            //     key="list-vertical-star-o"
            //   />,
            //   <IconText
            //     icon={LikeOutlined}
            //     text="156"
            //     key="list-vertical-like-o"
            //   />,
            //   <IconText
            //     icon={MessageOutlined}
            //     text="2"
            //     key="list-vertical-message"
            //   />,
            // ]}
            // extra={
            //   <div className="recordingImage">
            //     <img
            //       width={100}
            //       src={moneyverse[randomIndex(moneyverse)]}
            //       alt="fun recording img"
            //     />
            //   </div>
            // }
          >
            <List.Item.Meta
              avatar={<Avatar src={moneyverse[randomIndex(moneyverse)]} />}
              title={
                <a href={item.address} target="_blank">
                  {item.name}
                </a>
              }
              description={item.published}
            />
            {/* {item.content} */}
          </List.Item>
        )}
      />
    </div>
    );
  };

  return (
    <div className="learnPage">
      <h1>Learn</h1>
      {renderLearn()}
    </div>
  );
};

export default Learn;
