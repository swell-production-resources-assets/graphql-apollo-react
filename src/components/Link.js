import React from 'react';

const Link = ({ link }) => {
  return (
    <>
      {link.description} ({link.url})
    </>
  )
}

export default Link;