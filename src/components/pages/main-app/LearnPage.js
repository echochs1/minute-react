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
      type: "Article Link",
      content: "From verwell mind. Published on March 12, 2022.",
      address: "https://www.verywellmind.com/public-speaking-skills-3024308",
    },
    {
      id: 2,
      name: "How to Speak in Public",
      type: "Article Link",
      content:
        "From NYTimes: Public speaking can tap into a viper’s nest of dread with seemingly infinite possibilities for messing up and creating scar-tissue embarrassment in front of a crowd. If you do a Google search with these four words – “public speaking scarier death” – you’ll get more than 50 million results, many of them about surveys noting that people list speaking in public as their No. 1 fear, with death coming in second. If you find yourself agreeing with those surveys, even reading these words may be causing your pulse to quicken or your palms to sweat (apologies for that). But here’s the good news: You can do this. We’ve broken down the art of public speaking to make it less overwhelming and potentially even rewarding. (Seriously.)",
      address:
        "https://www.nytimes.com/guides/year-of-living-better/how-to-speak-in-public",
    },
    {
      id: 3,
      name: "Here are the new best practices for public speaking",
      type: "Article Link",
      content:
        "From Fortune: Public speaking is a “learnable skill,” says Azzam, that has been demystified as virtual engagements became the norm over the past two years. But for those tapping the virtual mic for the first time, Azzam offers a few basic rules so you can feel confident you'll give a compelling speech and keep folks engaged. Published January 18, 2022",
      address:
        "https://fortune.com/2022/01/18/the-new-best-practices-for-public-speaking-knowledge-charisma-and-authenticity/",
    },
    {
      id: 4,
      name: "10 Tips for Improving Your Public Speaking Skills",
      type: "Article Link",
      content:
        "From Professional Development @ Harvard DCE: Few are immune to the fear of public speaking. Marjorie North offers 10 tips for speakers to calm the nerves and deliverable memorable orations.",
      address:
        "https://professional.dce.harvard.edu/blog/10-tips-for-improving-your-public-speaking-skills/",
    },
    {
      id: 5,
      name: "8 subtle shifts that will help you enjoy public speaking on Zoom",
      type: "Video Link",
      content:
        "From TED: There's no single formula for a great talk, but there is a secret ingredient that all the best ones have in common. TED Curator Chris Anderson shares this secret — along with four ways to make it work for you. Do you have what it takes to share an idea worth spreading?",

      address: "https://youtu.be/-FOCpMAww28",
    },
    {
      id: 6,
      name: "How to Stop Saying “Um,” “Ah,” and “You Know”",
      type: "Article Link",
      content: "Published August 01, 2018.",
      address: "https://hbr.org/2018/08/how-to-stop-saying-um-ah-and-you-know",
    },
    {
      id: 7,
      name: "Speaking as a Skill for Success",
      type: "Article Link",
      content: "",
      address:
        "https://www.edutopia.org/practice/public-speaking-oracy-skills-real-world",
    },
    {
      id: 8,
      name:
        "How The Pandemic Is Giving Public Speakers A Boost: Four Silver Linings To Presenting Virtually",
      type: "Article Link",
      content: "",
      address:
        "https://www.forbes.com/sites/forbesagencycouncil/2020/11/17/how-the-pandemic-is-giving-public-speakers-a-boost-four-silver-linings-to-presenting-virtually/?sh=464527f754f6",
    },
    {
      id: 9,
      name:
        "A Communication Coach's 3 Best Tips to Make Zoom Presentations Less Awkward",
      type: "Article Link",
      content: "",
      address:
        "https://www.inc.com/jessica-stillman/communication-public-speaking-zoom-presentation-tips.html",
    },
    {
      id: 10,
      name: "How to Stop Saying “Um,” “Ah,” and “You Know”",
      type: "Article Link",
      content: "",
      address: "https://hbr.org/2018/08/how-to-stop-saying-um-ah-and-you-know",
    },
    {
      id: 11,
      name: "8 subtle shifts that will help you enjoy public speaking on Zoom",
      type: "Article Link",
      content:
        "...With a few subtle shifts ranging from mindset tricks to very practical habits, that’s entirely possible. Here are eight expert-approved speaking tips to embrace before your next virtual presentation. Published May 12, 2021.",
      address:
        "https://www.theladders.com/career-advice/8-subtle-shifts-that-will-help-you-enjoy-public-speaking-on-zoom",
    },
    {
      id: 12,
      name: "How I Overcame My Fear of Public Speaking",
      type: "Video Link",
      content:
        "From TEDxTALKS: Communication is the most important skill for personal and professional success. In this talk, Danish Dhamani discusses how overcoming your fear of public speaking is key to leading a fulfilling life and unlocking your true potential.  Danish’s vision is to empower everyone around the world to overcome their fear of public speaking and to become a better communicator. As a first generation immigrant, for whom English is a second language, the fear of public speaking haunted Danish throughout his early life. By constant practicing and coaching, he soon realized that people are not born public speakers; instead public speaking is a learn-able skill. This is what inspired Danish to create Orai, a mobile app that uses artificial intelligence to improve your speaking ability. ",
      address: "https://youtu.be/80UVjkcxGmA",
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
            <List.Item key={item.id} style={{ fontSize: "15px" }}>
              <List.Item.Meta
                avatar={<Avatar src={moneyverse[randomIndex(moneyverse)]} />}
                title={
                  <a
                    href={item.address}
                    target="_blank"
                    style={{ fontSize: "18px" }}
                  >
                    {item.name}
                  </a>
                }
                description={item.type}
              />
              {item.content}
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


// const renderLearnPage = () => {
//   return (
//     <ul className="articleList">
//       {articles.map((articles, index) => (
//         <li key={index} className="articleItem">
//           <div className="articleContent">
//             <div className="articleTitle">
//               <p className="fieldValue" style={{ fontSize: "18px" }}>
//                 <b>{articles.name}</b>
//                 {articles.}
//               </p>
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   )
// }

export default Learn;
