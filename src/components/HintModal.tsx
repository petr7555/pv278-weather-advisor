import React, { FC } from 'react';

const HintModal: FC = () => {
  const modalId = "hint-modal";
  
  return (
    <div className="w-full max-w-xs">
      <div className="text-right pb-2">
        <label htmlFor={modalId} className="btn btn-circle btn-outline btn-sm text-xl border-2">?</label>
      </div>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2 text-primary-content">✕</label>
          <h3 className="text-lg font-bold">How it works?</h3>
          <p className="pt-2">By selecting an activity the sliders will be set to specific predefined values based on which weather conditions we think are suitable for such activity. You may readjust the sliders to fit your needs.</p>
          <p className="py-2">The closer each location's weather conditions are to the slider values – in the month you selected – the higher score it gets.</p>
        </label>
      </label>
    </div>
  );
};

export default HintModal;
