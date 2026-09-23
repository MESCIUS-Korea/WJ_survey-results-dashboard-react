import React from 'react';
import { useEvent } from 'react-use-event-hook';
import { Globalize, Tooltip, toggleClass } from '@mescius/wijmo';
import * as wjGrid from '@mescius/wijmo.grid';
import * as wjcGrid from '@mescius/wijmo.react.grid';

import '../style.css';

export default function SummaryGrid(props) {
  const initializeGrid = useEvent((flex) => {
    flex.columnFooters.rows.push(new wjGrid.GroupRow());
    // flex.bottomLeftCells.setCellData(0, 0, 'Σ');

    let tooltip = new Tooltip();
    flex.formatItem.addHandler((s, e) => {
      if (e.panel == s.cells) {
        let item = s.rows[e.row].dataItem,
          binding = s.columns[e.col].binding;

        if (binding === 'participants') {
          let note = item.note ? item.note : null;

          toggleClass(e.cell, 'wj-has-notes', note != null);
          if (note != null) {
            tooltip.setTooltip(e.cell, '<b>Note:</b><br/>' + note);
          }
        }
      } else if (e.panel == s.columnFooters) {
        if (e.col == 1) {
          e.cell.textContent = e.cell.textContent + '명';
        } else if (e.col == 2) {
          e.cell.textContent = e.cell.textContent + '%';
        }
      }
    });

    flex.updatingView.addHandler(() => {
      tooltip.dispose();
    });
  });

  return (
    <>
      <h4> 연령대별 참여자 분류</h4>
      <wjcGrid.FlexGrid
        id="summaryGrid"
        headersVisibility="Column"
        initialized={initializeGrid}
        itemsSource={props.data}
      >
        <wjcGrid.FlexGridColumn binding="ageGroup" header="연령대" />
        <wjcGrid.FlexGridColumn
          binding="participants"
          header="응답자수(명)"
          aggregate="Sum"
        />
        <wjcGrid.FlexGridColumn
          binding="percentage"
          header="비율(%)"
          aggregate="Sum"
        >
          <wjcGrid.FlexGridCellTemplate
            cellType="Cell"
            template={(cell) => (
              <React.Fragment>
                {Globalize.format(cell.item.percentage, 'n1')}%
              </React.Fragment>
            )}
          />
        </wjcGrid.FlexGridColumn>
      </wjcGrid.FlexGrid>
    </>
  );
}
