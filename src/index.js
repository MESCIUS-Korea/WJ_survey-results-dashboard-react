import '@mescius/wijmo.styles/wijmo.css';

import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import useEvent from 'react-use-event-hook';
import { Selector } from '@mescius/wijmo.grid.selector';
import { FlexGrid, FlexGridColumn } from '@mescius/wijmo.react.grid';
import { FlexGridFilter } from '@mescius/wijmo.react.grid.filter';
import { FlexGridSearch } from '@mescius/wijmo.react.grid.search';
import { CollectionView, setLicenseKey } from '@mescius/wijmo';

import '@mescius/wijmo.cultures/wijmo.culture.ko';
import { data } from './data';
import ColumnPicker from './ColumnPicker';
import ExportCombo from './ExportComboBox';
import StatusComboBox from './StatusComboBox';
import AddNewPopup from './AddNewPopup';
import search from './search.svg';

export default function App() {
  setLicenseKey(window.evalkey);
  const theGridRef = useRef(null);

  const theSearchRef = useRef(null);
  const selectorRef = useRef(null);
  const [gridInitialized, setGridInitialized] = useState(false);
  const [state, setState] = useState({
    view: new CollectionView(data, {
      newItemCreator: () => {
        let newItem = {
          index: null,
          int: null,
          name: null,
          birthDate: null,
          department: null,
          position: null,
          phone: null,
          email: null,
          workplace: null,
          yearsOfService: null,
          startDate: null,
          qualificationStatus: null,
          performanceRating: null,
        };
        return newItem;
      },
    }),

    headers: true,
    selectedItems: [],
  });
  useEffect(() => {
    theSearchRef.current.control.grid = theGridRef.current.control;
  }, []);

  const initializedGrid = useEvent((flex) => {
    theGridRef.current = flex;
    setGridInitialized(true);
    selectorRef.current = new Selector(flex, {});
    flex.formatItem.addHandler((s, e) => {
      if (e.panel == s.topLeftCells) {
        e.cell.innerHTML =
          '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
      } else if (e.panel === s.cells) {
        if (s.columns[e.col].binding === 'performanceRating') {
          let val = s.rows[e.row].dataItem.performanceRating;

          let className =
            val === 'B'
              ? 'yellow-performance-cell'
              : val === 'C'
              ? 'red-performance-cell'
              : '';
          e.cell.innerHTML = `<div class="performance-cell ${className}">${e.cell.textContent}</div>`;
        }
      }
    });
  });

  const initializedSearch = (s) => {
    let img = document.createElement('img');
    img.src = search;
    img.class = 'search-icon';

    s.hostElement.prepend(img);
  };
  return (
    <div className="container-fluid">
      <div className="flexgrid-header-panel">
        <div className="header-panel-left">
          <div className="header-title">
            <h3>인사 정보 그리드</h3>
          </div>
          <FlexGridSearch
            ref={theSearchRef}
            placeholder="검색어를 입력해주세요"
            initialized={initializedSearch}
          />
        </div>
        <div className="header-panel-right">
          {gridInitialized && <StatusComboBox grid={theGridRef.current} />}
          {gridInitialized && <ExportCombo grid={theGridRef.current} />}
          {gridInitialized && <AddNewPopup grid={theGridRef.current} />}
        </div>
      </div>
      <FlexGrid
        ref={theGridRef}
        itemsSource={state.view}
        alternatingRowStep={0}
        frozenColumns={3}
        isReadOnly={true}
        initialized={initializedGrid}
      >
        <FlexGridColumn binding="index" header="No." width={60} />
        <FlexGridColumn binding="int" header="사원번호" />
        <FlexGridColumn binding="name" header="사원명" width={120} />
        <FlexGridColumn binding="birthDate" header="생년월일" dataType="Date" />
        <FlexGridColumn binding="department" header="부서명" />
        <FlexGridColumn binding="position" header="직위명" />
        <FlexGridColumn binding="phone" header="전화번호" />
        <FlexGridColumn binding="email" header="이메일" />
        <FlexGridColumn binding="workplace" header="근무지명" />
        <FlexGridColumn
          binding="yearsOfService"
          header="근속년도"
          dataType="Number"
        />
        <FlexGridColumn binding="startDate" header="입사일자" dataType="Date" />
        <FlexGridColumn
          binding="qualificationStatus"
          header="승급자격충족여부"
        />
        <FlexGridColumn binding="performanceRating" header="인사평가" />
        <FlexGridFilter />
      </FlexGrid>
      {gridInitialized && <ColumnPicker grid={theGridRef.current} />}
    </div>
  );
}

setTimeout(() => {
  const container = document.getElementById('root');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
  }
});
