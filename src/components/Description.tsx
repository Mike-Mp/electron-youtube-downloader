import React from 'react';

const Description = ({ description }: { description: string | null }) => {
  const [descriptionBox, setDescriptionBox] = React.useState(false);

  if (description && description.length > 0) {
    return (
      <div className="descriptionBox">
        <button
          type="button"
          onClick={() => setDescriptionBox(!descriptionBox)}
        >
          {descriptionBox ? 'Hide description' : 'Show description'}
        </button>
        <p>{descriptionBox ? description : ''}</p>
      </div>
    );
  }

  return null;
};

export default Description;
