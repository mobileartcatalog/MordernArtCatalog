import React from 'react';

export const DeleteSubimage = props => {
  console.log(
    'id',
    props.location.artworkId,
    'imageId',
    props.match.params.imageId
  );
  return (
    <div>
      <p>Delete this image? Are you sure?</p>
    </div>
  );
};

//when dipatch thunk, pass in artworkId, and imageId
