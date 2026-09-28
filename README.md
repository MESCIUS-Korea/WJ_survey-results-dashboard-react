# 설문조사 대시보드 - React + MESCIUS Wijmo

**React + JavaScript + MESCIUS Wijmo**로 구현한 설문조사 결과 분석 대시보드입니다. 연령대별 참여자 수와 비율, 성별 참여자 현황을 Grid로 확인하고, 참여 연령대별 데이터를 Pie Chart와 Column/Line Chart로 시각화합니다. 전체 응답자의 상세 정보는 별도의 Detail Grid에서 확인할 수 있습니다.

## 주요 기능

- 연령대별 응답자 수 및 비율 조회
- 연령대별 참여자 분류 Grid
- 성별 참여자 수 조회
- 성별 기준 상세 데이터 그룹화
- 참여 연령대별 비율 Pie Chart 시각화
- 참여 연령대별 응답자 수 및 비율 Column Chart 시각화
- 참여 연령대별 응답자 수 및 비율 Line Chart 시각화
- Chart 타입 선택
- 응답자 수 기준 데이터 정렬
- Chart 선택에 따른 상세 데이터 Grid 변경
- 상세 데이터 Grid 그룹화 및 정렬
- Grid 상단 행 고정
- 응답자 수가 가장 적거나 많은 연령대에 Note 표시
- Grid Tooltip을 통한 Note 확인
- 자차 보유 여부 Boolean 데이터 표시
- 한국어 Wijmo Culture 적용
- 반응형 Bootstrap Grid 기반 화면 구성

## 사용 기술

- React 18.3.1
- JavaScript
- React DOM 18.3.1
- MESCIUS Wijmo 5.20242.21
- Bootstrap CSS 3.3.7
- react-use-event-hook 0.9.6
- Create React App (`react-scripts`)

## 사용된 Wijmo 컴포넌트

| 컴포넌트 | 사용 목적 |
|---|---|
| FlexGrid | 연령대별·성별·상세 설문 데이터 표시 |
| FlexGridColumn | 설문 데이터 컬럼 구성 |
| CollectionView | 상세 데이터 정렬 및 그룹화 |
| GroupRow | Grid Footer의 집계 행 구성 |
| FlexChart | 참여 연령대별 응답자 수 및 비율 시각화 |
| FlexChartSeries | 응답자 수·비율 Chart Series 구성 |
| FlexChartLegend | Chart 범례 표시 |
| FlexChartAxis | 비율 및 응답자 수 축 구성 |
| FlexChartAnimation | Chart 애니메이션 적용 |
| FlexPie | 연령대별 참여 비율 시각화 |
| ComboBox | Chart 타입 선택 |
| Globalize | 비율 숫자 형식 처리 |
| Tooltip | Grid Note 표시 |
| `wijmo.culture.ko` | 한국어 Culture 적용 |

## 화면 구성

- **연령대별 참여자 분류**: 연령대별 응답자 수와 비율을 Grid로 표시
- **성별 참여자 분류**: 연령대별 남성·여성 참여자 수를 Grid로 표시
- **참여 인원별 비율 Chart**: 연령대별 참여 비율을 Pie Chart로 표시
- **응답자 수/비율 Chart**: 연령대별 응답자 수와 비율을 Column 또는 Line Chart로 표시
- **Chart 타입 선택**: `Pie`, `LineSymbols`, `Column` 중 하나를 선택
- **정렬 기준**: Line/Column Chart에서 초기화 또는 응답자 수 기준 정렬
- **상세 데이터 Grid**: 성명, 나이, 성별, 직업, 자차 보유 여부, 전화번호, 이메일 등의 상세 응답 데이터 조회
- **Chart 연동**: Chart에서 특정 항목을 선택하면 해당 연령대에 대응하는 상세 데이터가 Grid에 표시
- **Note 표시**: 가장 적은 응답자 수와 가장 많은 응답자 수를 가진 연령대에 Note를 설정하고 Tooltip으로 표시

## 프로젝트 구조

```text
.
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── data.js
    ├── style.css
    └── components/
        ├── Chart.js
        ├── DetailGrid.js
        ├── GenderGrid.js
        └── SummaryGrid.js
```

### 주요 파일

- `src/index.js`: React 애플리케이션 진입점 및 전체 대시보드 구성
- `src/data.js`: 설문 상세·요약·성별 데이터 조회 및 가공
- `src/style.css`: 대시보드 및 Wijmo Grid/Chart 스타일 정의
- `src/components/SummaryGrid.js`: 연령대별 참여자 수 및 비율 Grid
- `src/components/GenderGrid.js`: 연령대별 남성·여성 참여자 수 Grid
- `src/components/DetailGrid.js`: 설문 상세 응답 데이터 Grid
- `src/components/Chart.js`: Pie/Column/Line Chart 및 Chart 선택·정렬 기능

## 데이터

프로젝트의 데이터는 `src/data.js`에서 외부 JSON 데이터를 `fetch`하여 가져옵니다.

### 사용 데이터

- `research_data.json`: 설문 응답 상세 데이터
- `research_summary_result_data.json`: 연령대별 설문 결과 요약 데이터
- `gender_data.json`: 연령대별 성별 참여자 데이터

데이터는 다음 Assets URL에서 조회합니다.

```text
https://assets.codepen.io/975719/research_data.json
https://assets.codepen.io/975719/research_summary_result_data.json
https://assets.codepen.io/975719/gender_data.json
```

요약 데이터에서는 연령대에 따라 이모지를 추가한 `emoAgeGroup` 값을 생성하며, 응답자 수가 가장 적은 항목과 가장 많은 항목을 찾아 각각 Note를 설정합니다.

상세 데이터에서는 `carOwnership` 값을 Boolean 형태로 변환하여 Grid에서 자차 보유 여부를 표시합니다.

## Chart 동작

Chart에서는 다음 세 가지 타입을 제공합니다.

- **Pie**: 연령대별 참여 비율을 원형 차트로 표시
- **LineSymbols**: 연령대별 응답자 수와 비율을 선형 차트로 표시
- **Column**: 연령대별 응답자 수와 비율을 세로 막대 차트로 표시

Line/Column Chart에서는 `응답자수` 기준 정렬을 지원하며, `초기화` 버튼으로 정렬을 해제할 수 있습니다.

Chart에서 특정 데이터 항목을 선택하면 해당 선택값이 `DetailGrid`로 전달되어 상세 응답 데이터의 표시 범위를 변경합니다.

## 설치 및 실행

```bash
npm install
npm start
```

브라우저에서 기본 Create React App 개발 서버 주소로 접속합니다.

## 빌드

```bash
npm run build
```

프로덕션 배포용 빌드 결과물은 `build/` 디렉터리에 생성됩니다.

## 데이터 처리

`src/index.js`에서 애플리케이션 로딩 시 다음 세 가지 데이터를 비동기로 조회합니다.

1. 상세 설문 데이터
2. 연령대별 요약 데이터
3. 성별 데이터

조회된 데이터는 React State에 저장되고 각각 `SummaryGrid`, `GenderGrid`, `Chart`, `DetailGrid` 컴포넌트에 전달됩니다.

상세 Grid는 연령대 선택에 따라 전체 데이터 배열의 특정 구간을 표시하도록 구성되어 있으며, Chart 선택 이벤트와 연결되어 있습니다.

## 활용 사례

- 설문조사 결과 대시보드
- 연령대별 참여자 분석
- 성별 참여 현황 분석
- 설문 응답 상세 데이터 조회
- 응답자 통계 및 비율 시각화
- 고객·사용자 조사 결과 분석
- Wijmo 기반 React 데이터 대시보드
- React 기반 데이터 시각화

## 태그

`wijmo`, `mescius-wijmo`, `react`, `reactjs`, `javascript`, `flexgrid`, `collectionview`, `flexchart`, `flexpie`, `combobox`, `tooltip`, `globalize`, `survey-dashboard`, `survey-analysis`, `research-dashboard`, `data-visualization`, `respondent-analysis`, `gender-analysis`, `age-group-analysis`, `enterprise-ui-components`
