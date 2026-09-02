import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import useEvent from 'react-use-event-hook';
import * as wjInput from '@mescius/wijmo.react.input';
import './style.css';
// import { data } from './data';

export default function StatusComboBox(props) {
  const combo = useRef(null);

  const initializedCombo = useEvent((s) => {
    const host = s.hostElement;
    let flex = props.grid;

    combo.current = s;
  });

  const statusResult = (s, e) => {
    if (props.grid) {
      props.grid.collectionView.filter = (item) => {
        if (!s.selectedIndex) {
          return true;
        }
        return item.performanceRating == s.selectedItem;
      };
    }
  };

  return (
    <wjInput.ComboBox
      className="status-comboBox"
      isEditable={false}
      isRequired={false}
      // selectedIndex={-1}
      itemsSource={['인사등급전체', 'A', 'B', 'C']}
      // placeholder="전체"
      initialized={initializedCombo}
      selectedIndexChanged={statusResult}
    />
  );
}
