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
        <p>
          Made by{' '}
          <a href="https://github.com/Mike-Mp" target="_blank" rel="noreferrer">
            Mike-Mp
          </a>{' '}
          with Electron, React and the youtube-dl npm package.
        </p>
      </div>
    );
  }

  return null;
};

export default About;
