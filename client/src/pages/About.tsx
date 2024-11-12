import Animation from "../components/Animated";

const About = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <Animation>
        <div className="center">
          <h1 id="aboutHeader">
            About<span> Hipub</span>
          </h1>
          <p className="about-text">
            We created Hipub to bring people together by helping them discover
            exciting nightlife and unique bars in their area. Instead of wading
            through endless reviews online, we designed Finn—an interactive AI
            guide—to recommend spots tailored to your preferences. With Finn,
            finding the perfect place becomes easy and engaging, as it offers
            personalized suggestions that fit your style, making nights out more
            spontaneous and fun.
          </p>
          <h2 className="center" id="meet-team">
            Meet the Team
          </h2>
          <div className="team-container">
            <div className="people">
              <h3 className="center botton-padding">Jake Magri</h3>
              <img
                src="/pictures/jaketop.png"
                alt="AI image of Jake in a goofy top hat"
                className="photo-container"
              />
              <p className="center text-align">
                Jake is the brains behind Finn's interactions. He worked
                extensively with the APIs to get Finn to respond in a unique and
                engaging way. Jake is also an invaluebale asset when it comes to
                fixing Finn's quirks and many other issues.
              </p>
            </div>
            <div className="people">
              <h3 className="center botton-padding">Parsa McMoody</h3>
              <img
                src="/pictures/parsabeer.png"
                alt="AI image of Parsa with a green hat and beer"
                className="photo-container"
              />
              <p className="center text-align">
                Parsa created the idea of Finn and the Hipub project. His design
                work can be seen through out the site: from Finn's all-seeing
                eye to the inviting bar atmosphere and much much more!
              </p>
            </div>
            <div className="people">
              <h3 className="center botton-padding">Brendan Murfield</h3>
              <img
                src="/pictures/brendansmoke.png"
                alt="AI image of brendan in a bowtie with cigar"
                className="photo-container"
              />
              <p className="center text-align">
                Brendan is a coding newcomer and new member of the team. He
                worked with the Places API to help Finn get the info give solid
                advice on where you should get a drink. He also helped with the
                sound design of Hipub.
              </p>
            </div>
          </div>
          <div>
            <div className="center other-work botton-padding">
              <h3>Check out our other work</h3>
              <ul>
                <li>
                  <button
                    onClick={() =>
                      handleLinkClick("https://github.com/jake-magri")
                    }
                    className="button"
                  >
                    Jake Magri
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleLinkClick("https://github.com/parsamh8")
                    }
                    className="button"
                  >
                    Parsa McMoody
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleLinkClick("https://github.com/bmurfield")
                    }
                    className="button"
                  >
                    Brendan Murfield
                  </button>
                </li>
              </ul>
              <br />
              <h5 id="trans">&copy; Hipub 2024. All Rights Reserved.</h5>
            </div>
          </div>
        </div>
      </Animation>
    </>
  );
};

export default About;
