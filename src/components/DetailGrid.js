import React, { useEffect, useRef } from 'react';
import { useEvent } from 'react-use-event-hook';
import * as wjcGrid from '@mescius/wijmo.react.grid';
import { SortDescription, CollectionView,  } from '@mescius/wijmo';
import '../style.css';
let gridData = new CollectionView([], {
  sortDescriptions: ['gender'],
  groupDescriptions: ['gender'],
});
export default function DetailGrid(props) {

  const detailGridRef = useRef(null);

  useEffect(() => {
    if (detailGridRef.current && props.data.length > 0) {
      setDetailGridData(0);
    }
  }, [detailGridRef.current]);

  const initDetailGrid = useEvent((flexGrid) => {
    detailGridRef.current = flexGrid;

    setDetailGridData(0);
    flexGrid.frozenCells = { top: 1, right: 1 };
  });

  const setDetailGridData = (idx) => {
    switch (idx) {
      case 0:
        gridData.sourceCollection = props.data.slice(0, 272);

        break;
      case 1:
        gridData.sourceCollection = props.data.slice(272, 1188);
        break;
      case 2:
        gridData.sourceCollection = props.data.slice(1188, 1639);
        break;
      case 3:
        gridData.sourceCollection = props.data.slice(1639, 1821);
        break;
      case 4:
        gridData.sourceCollection = props.data.slice(
          1822,
          props.data.length - 1
        );
        break;
    }
    gridData.refresh();
  };

  useEffect(() => {
    if (props.onSetDetailGridData) {
      props.onSetDetailGridData(setDetailGridData);
    }
  }, [props.onSetDetailGridData]);
  return (
    <>
      <wjcGrid.FlexGrid
        itemsSource={gridData}
        initialized={initDetailGrid}
        showSort={true}
        allowSorting={false}
      >
        <wjcGrid.FlexGridColumn binding="index" header="순번" />
        <wjcGrid.FlexGridColumn binding="name" header="성명" />
        <wjcGrid.FlexGridColumn binding="age" header="나이" />
        <wjcGrid.FlexGridColumn binding="gender" header="성별" />
        <wjcGrid.FlexGridColumn binding="job" header="직업" />

        <wjcGrid.FlexGridColumn
          binding="carOwnership"
          header="자차보유여부"
          dataType="Boolean"
        />
        <wjcGrid.FlexGridColumn binding="phone" header="전화번호" width={120} />
        <wjcGrid.FlexGridColumn binding="email" header="이메일" width={200} />
      </wjcGrid.FlexGrid>
    </>
  );
}
