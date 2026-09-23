import React from 'react';
import { useEvent } from 'react-use-event-hook';
import { Globalize, Tooltip, toggleClass } from '@mescius/wijmo';
import * as wjGrid from '@mescius/wijmo.grid';
import * as wjcGrid from '@mescius/wijmo.react.grid';

import '../style.css';

export default function GenderGrid(props) {
  const initializeGrid = useEvent((flex) => {
    flex.columnFooters.rows.push(new wjGrid.GroupRow());

    flex.formatItem.addHandler((s, e) => {
      if (e.panel == s.columnFooters) {
        if (e.col > 0) {
          e.cell.textContent = e.cell.textContent + '명';
        }
      }
    });
  });

  return (
    <>
      <h4> 성별 참여자 분류</h4>
      <wjcGrid.FlexGrid
        id="genderGrid"
        headersVisibility="Column"
        initialized={initializeGrid}
        itemsSource={props.data}
      >
        <wjcGrid.FlexGridColumn binding="ageGroup" header="연령대" />
        <wjcGrid.FlexGridColumn
          binding="male"
          header="남성 수(명)"
          aggregate="Sum"
        />
        <wjcGrid.FlexGridColumn
          binding="female"
          header="여성 수(명)"
          aggregate="Sum"
        />
      </wjcGrid.FlexGrid>
    </>
  );
}
