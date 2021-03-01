import React, { ReactElement } from 'react';

const About = ({ visible }: { visible: boolean }): ReactElement | null => {
  if (visible === true) {
    return (
      <div id="aboutBox">
        <h5>About</h5>
        <p>
          Made by <a href="https://github.com/Mike-Mp">Mike-Mp</a>
        </p>
      </div>
    );
  }

  return null;
};

export default About;
