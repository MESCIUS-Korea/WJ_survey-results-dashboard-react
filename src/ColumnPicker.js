import 'bootstrap-css';
import React, { useEffect, useRef, useState } from 'react';
import useEvent from 'react-use-event-hook';
import * as wjcCore from '@mescius/wijmo';
import { hidePopup, showPopup, hasClass } from '@mescius/wijmo';
import * as wjInput from '@mescius/wijmo.react.input';
import './style.css';

export default function ColumnPicker(props) {
  const columnPicker = useRef(null);

  const initializedPicker = useEvent((picker) => {
    const host = picker.hostElement;
    let flex = props.grid;

    columnPicker.current = picker;
    columnPicker.current.itemsSource = flex.columns;
    columnPicker.current.checkedMemberPath = 'visible';
    columnPicker.current.displayMemberPath = 'header';
    columnPicker.current.lostFocus.addHandler(() => {
      hidePopup(columnPicker.current.hostElement);
    });

    // show the column picker when the user clicks the top-left cell
    let ref = flex.hostElement.querySelector('.wj-topleft');
    ref.addEventListener('mousedown', (e) => {
      if (hasClass(e.target, 'column-picker-icon')) {
        let host = columnPicker.current.hostElement;
        if (!host.offsetHeight) {
          showPopup(host, ref, false, true, false);
          columnPicker.current.focus();
        } else {
          hidePopup(host, true, true);
          flex.focus();
        }
        columnPicker.current.focus();
        e.preventDefault();
      }
    });
    // work around Safari/IOS bug (TFS 321525, 361500, 402670)
    // https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
    window.addEventListener('touchstart', (e) => {
      let host = columnPicker.current.hostElement;
      if (!contains(host, e.target) && !closest(e.target, '.wj-flexgrid')) {
        hidePopup(host, true, true);
      }
    });
  });

  return (
    <div className="column-picker-div">
      <wjInput.ListBox
        className="column-picker"
        initialized={initializedPicker}
      />
    </div>
  );
}
