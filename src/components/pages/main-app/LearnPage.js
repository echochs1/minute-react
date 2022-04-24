import React from "react";
// Resources:
// https://professional.dce.harvard.edu/blog/10-tips-for-improving-your-public-speaking-skills/
// https://www.nytimes.com/guides/year-of-living-better/how-to-speak-in-public
// https://fortune.com/2022/01/18/the-new-best-practices-for-public-speaking-knowledge-charisma-and-authenticity/
// https://www.verywellmind.com/public-speaking-skills-3024308

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

const CardListItem = (props) => {
  return (
    <li>
      <div
        className="card-container"
        style={{
          width: "50%",
          border: "solid 3px #d3d3d3",
          margin: "10px auto",
        }}
      >
        <a href={props.character.address} target="_blank">
          <p>
            <strong>{props.character.name}</strong>
          </p>
        </a>
        <p>{props.character.published}</p>
      </div>
    </li>
  );
};

const CardList = () => {
  return (
    <ul style={{ listStyleType: "none" }}>
      {articles.map((article) => {
        return <CardListItem character={article} key={article.id} />;
      })}
    </ul>
  );
};

export default function App() {
  return (
    <div className="App">
      <CardList />
    </div>
  );
}
