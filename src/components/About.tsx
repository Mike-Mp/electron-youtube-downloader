import React, { ReactElement } from 'react';

type PropFunctions = () => void;

const About = ({
  visible,
  setAbout,
}: {
  visible: boolean;
  setAbout: PropFunctions;
}): ReactElement | null => {
  if (visible === true) {
    return (
      <div id="aboutBox">
        <button type="button" id="closeAbout" onClick={setAbout}>
          X
        </button>
        <h5>About</h5>
        <p>
          Made by <a href="https://github.com/Mike-Mp">Mike-Mp</a> with
          Electron, React and the youtube-dl npm package.
        </p>
      </div>
    );
  }

  return null;
};

export default About;
