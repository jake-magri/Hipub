import React from "react";

const About = () => {
  const handleLinkClick = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="center">
      <h1 id="aboutHeader">
        About<span> Hipub</span>
      </h1>
      <p className="about-text">
        We developed Hipub with the idea of bringing people together who are
        looking for ideas on nightlife and fun bars in their area. Instead of
        sorting through countless reviews on Google, we thought of Finn, a more
        interactive way to find out about great places to go.
      </p>
      <h2 className="center">Meet the Team</h2>
      <div className="team-container">
        <div className="people">
          <h3 className="center">Jake Magri</h3>
          <img
            src="/pictures/jaketop.png"
            alt="AI image of Jake in a goofy top hat"
            className="photo-container"
          />
          <p className="center">
            Jake is the brains behind Finn's interactions. He worked extensively
            with the APIs to get Finn to respond in a unique and engaging way.
            Jake is also an invaluebale asset when it comes to fixing Finn's
            quirks and many other issues.
          </p>
        </div>
        <div className="people">
          <h3 className="center">Parsa McMoody</h3>
          <img
            src="/pictures/parsabeer.png"
            alt="AI image of Parsa with a green hat and beer"
            className="photo-container"
          />
          <p className="center">
            Parsa created the idea of Finn and the Hipub project. His design
            work can be seen through out the site: from Finn's all-seeing eye to
            the inviting bar atmosphere and much much more!
          </p>
        </div>
        <div className="people">
          <h3 className="center">Brendan Murfield</h3>
          <img
            src="/pictures/brendansmoke.png"
            alt="AI image of brendan in a bowtie with cigar"
            className="photo-container"
          />
          <p className="center">
            Brendan is a coding newcomer and new member of the team. He worked
            with the Places API to help Finn get the info give solid advice on
            where you should get a drink. He also helped with the sound design
            of Hipub.
          </p>
        </div>
      </div>
      <div>
        <div className="center other-work">
          <h3>Check out our other work</h3>
          <ul>
            <li>
              <button
                onClick={() => handleLinkClick("https://github.com/jake-magri")}
                className="button"
              >
                Jake Magri
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("https://github.com/parsamh8")}
                className="button"
              >
                Parsa McMoody
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("https://github.com/bmurfield")}
                className="button"
              >
                Brendan Murfield
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
