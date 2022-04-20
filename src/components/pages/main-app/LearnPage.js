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
