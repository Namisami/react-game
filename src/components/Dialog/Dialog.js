import React from 'react';

import './Dialog.css';

const Dialog = () => {
  return (
    <div className='dialog'>
      <div className='dialog__character'>
        {/* Image of first character who talks */}
      </div>
      <div className='dialog__content'>
        <p className='dialog__text'>
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
        </p>
        <ul className='dialog__choices'>
          <li className='dialog__choice'>
            Завершить разговор
          </li>
        </ul>
      </div>
      <div className='dialog__character'>
        {/* Image of second character who talks */}
      </div>
    </div>
  )
};

export default Dialog;