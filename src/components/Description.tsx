import React from 'react';

const Description = ({ description }: { description: string }) => {
  if (description.length > 0) {
    return (
      <div className="descriptionBox">
        <p>{description}</p>
      </div>
    );
  }

  return null;
};
