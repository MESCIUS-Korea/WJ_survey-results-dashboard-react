import '@mescius/wijmo.styles/wijmo.css';
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap-css';
import { detailData, summaryData, genderData } from './data';
import '@mescius/wijmo.cultures/wijmo.culture.ko';
import './style.css';
import SummaryGrid from './components/SummaryGrid.js';
import GenderGrid from './components/GenderGrid.js';
import DetailGrid from './components/DetailGrid.js';
import Chart from './components/Chart.js';

function App() {
  const [items, setItems] = useState([]);
  const [summaryItems, setSummaryItems] = useState([]);
  const [genderItems, setGenderItems] = useState([]);
  const setDetailGridDataRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailDataResult = await detailData();
        setItems(detailDataResult); // 상태 업데이트

        const summaryDataResult = await summaryData();
        setSummaryItems(summaryDataResult);

        const genderDataResult = await genderData();
        setGenderItems(genderDataResult); // 상태 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart에서 선택이 바뀔 때 DetailGrid의 데이터 업데이트
  const handleChartSelectionChanged = (selectedIndex) => {
    if (setDetailGridDataRef.current) {
      setDetailGridDataRef.current(selectedIndex); // DetailGrid의 setDetailGridData 호출
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 left-container">
          <SummaryGrid data={summaryItems} />
          <GenderGrid data={genderItems} />
        </div>

        <div className="col-md-8 right-container">
          <Chart
            data={summaryItems}
            chartSelectionChanged={handleChartSelectionChanged}
          />

          <DetailGrid
            data={items}
            onSetDetailGridData={(setDetailGridData) => {
              setDetailGridDataRef.current = setDetailGridData; // setDetailGridData 함수 참조 저장
            }}
          />
        </div>
      </div>
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
