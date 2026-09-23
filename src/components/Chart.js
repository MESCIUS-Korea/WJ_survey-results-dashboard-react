import React, { useState, useEffect, useRef } from 'react';
import { useEvent } from 'react-use-event-hook';
import { SortDescription } from '@mescius/wijmo';
import * as wjchart from '@mescius/wijmo.chart';
import * as wjcChart from '@mescius/wijmo.react.chart';
import { palette } from '../data';
import * as wjInput from '@mescius/wijmo.react.input';
import * as wjcChartAnimate from '@mescius/wijmo.react.chart.animation';
import '../style.css';

const strings = chartTypeList();
export default function Chart(props) {
  const [isPie, setPie] = useState(true);
  const [chartType, setChartType] = useState('Column'); // 차트 타입 저장
  const pieRef = useRef(null);
  const chartRef = useRef(null);
  const pieContent = `<b>참여 연령대 </b> {ageGroup}</br>비율 : {percentage}%`;
  const tooltipContent = `<b>참여 연령대 </b> {emoAgeGroup}</br>응답자 수 : {participants}명</br>비율 : {percentage}%`;

  // input

  const initComboString = () => {};

  const onStrValChanged = useEvent((sender, e) => {
    if (props.chartSelectionChanged) {
      props.chartSelectionChanged(0);
    }

    const selectedType = sender.selectedItem;
    if (selectedType !== 'Pie') {
      setPie(false);

      if (selectedType === 'LineSymbols') {
        setChartType('LineSymbols');
      } else if (selectedType === 'Column') {
        setChartType('Column');
      }
    } else {
      setPie(true);
    }
  });
  //  input 끝

  const initPie = useEvent((sender) => {
    pieRef.current = sender;
    sender.dataLabel.content = '{value:g1}%';
    sender.tooltip.content = pieContent;
  });

  const initChart = useEvent((flexchart) => {
    chartRef.current = flexchart;

    flexchart.hostElement.addEventListener('click', (e) => {
      // build tooltip text
      let ht = flexchart.hitTest(e);

      if (ht.chartElement === wjchart.ChartElement.PlotArea) {
        if (props.chartSelectionChanged) {
          props.chartSelectionChanged(ht.item.index - 1);
        }
      }
    });
  });

  const sortOnClick = (prop) => {
    if (chartRef.current) {
      let sd = chartRef.current.collectionView.sortDescriptions;

      sd.clear();
      sd.push(new SortDescription(prop, true));
    } else {
      alert('LineSymbol, Column 차트에서 사용할 수 있습니다.');
    }
  };

  const selectionChanged = useEvent((s, e) => {
    let idx = s.selectedIndex;

    if (props.chartSelectionChanged) {
      props.chartSelectionChanged(idx);
    }
  });

  return (
    <>
      <p className="chart-setting-group">
        <wjInput.ComboBox
          id="theComboString"
          itemsSource={strings}
          initialized={initComboString}
          selectedIndexChanged={onStrValChanged}
        />
        정렬 기준:
        <button
          id="btnNone"
          className="btn btn-default"
          onClick={() => sortOnClick(null)}
        >
          초기화
        </button>
        <button
          id="btnParticipants"
          className="btn btn-default"
          onClick={() => sortOnClick('participants')}
        >
          응답자수
        </button>
      </p>

      {/* 오른쪽 차트 */}
      <div>
        {isPie ? (
          <wjcChart.FlexPie
            header="🎯 참여 인원별 비율"
            bindingName="ageGroup"
            binding="percentage"
            isAnimated={true}
            selectionMode="Point"
            selectedItemPosition="Top"
            selectedItemOffset={0.2}
            itemsSource={props.data}
            palette={palette}
            initialized={initPie}
            selectionChanged={selectionChanged}
          ></wjcChart.FlexPie>
        ) : (
          <wjcChart.FlexChart
            header="🎯 참여 인원별 비율"
            chartType={chartType}
            bindingX="emoAgeGroup"
            selectionMode="Point"
            palette={palette}
            itemsSource={props.data}
            initialized={initChart}
          >
            <wjcChart.FlexChartLegend position="Bottom" />
            <wjcChart.FlexChartSeries
              name="응답자 수"
              binding="participants"
              tooltipContent={tooltipContent}
            />
            <wjcChart.FlexChartSeries
              name="비율"
              binding="percentage"
              tooltipContent={tooltipContent}
            >
              <wjcChart.FlexChartAxis
                wjProperty="axisY"
                position="Right"
                title="비율 (%)"
                format="n0"
                majorUnit={10}
                min={0}
              />
            </wjcChart.FlexChartSeries>
            <wjcChart.FlexChartAxis wjProperty="axisY" majorUnit={200} />
            <wjcChartAnimate.FlexChartAnimation />
          </wjcChart.FlexChart>
        )}
      </div>
    </>
  );
}

function chartTypeList() {
  return ['Pie', 'LineSymbols', 'Column'];
}
