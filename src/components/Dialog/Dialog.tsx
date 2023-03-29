import React from 'react';
import Portrait from '@components/Portrait/Portrait';

import './Dialog.css';

interface DialogProps {
  onEndBtnClick: () => void;
}

const Dialog = ({ 
  onEndBtnClick 
}: DialogProps) => {
  return (
    <div className='dialog'>
      <Portrait 
        className='dialog__portrait'
      />
      <div className='dialog__content'>
        <p className='dialog__text'>
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
          Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. Здесь будет диалог с персонажем. 
        </p>
        <ul className='dialog__choices'>
          <li className='dialog__choice' onClick={ onEndBtnClick }>
            Завершить разговор
          </li>
        </ul>
      </div>
      <Portrait 
        className='dialog__portrait'
      />
    </div>
  )
};

export default Dialog;