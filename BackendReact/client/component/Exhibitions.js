import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const Exhibitions = () => {
  return (
    <div className="page">
      <nav className="page-header">
        <h3 className="page-title artwork">Exhibitions</h3>
        <div className="page-header-button-bar">
          <IoIosAddCircleOutline
            className="button"
            // onClick={() => this.props.history.push('/exhibitions/new')}
          />
        </div>
      </nav>
    </div>
  );
};
