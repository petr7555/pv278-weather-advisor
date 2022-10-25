import React from 'react';
import { ReactComponent as UndoUp } from '../icons/undo_up.svg';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="btn btn-circle btn-outline border-0 hover:text-base-100 group m-2 w-16 h-16">
      <UndoUp className="group-hover:text-white w-16 h-16"/>
    </button>
  );
};

export default BackButton;
