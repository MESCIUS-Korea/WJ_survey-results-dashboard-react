export const palette = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
export const detailData = async () => {
  const response = await fetch(
    `https://assets.codepen.io/975719/research_data.json`
  );
  const data = await response.json();

  const parsedData = data.map((item) => ({
    ...item,
    carOwnership: item.carOwnership === true,
  }));
  return parsedData; // 데이터를 반환
};

export const summaryData = async () => {
  const response = await fetch(
    `https://assets.codepen.io/975719/research_summary_result_data.json`
  );
  const data = await response.json();
  // 나이대에 따른 이모지 매핑
  const ageEmojiMap = {
    '20대': '🧑‍🦱',
    '30대': '🧑‍💼',
    '40대': '🧔',
    '50대': '🧓',
    '60세 이상': '👴',
  };

  const parsedData = data.map((item) => ({
    ...item,
    emoAgeGroup: `${ageEmojiMap[item.ageGroup] || ''} ${item.ageGroup}`,
  }));

  let minValueObject = parsedData[0];
  let maxValueObject = parsedData[0];
  const items = parsedData.forEach((item) => {
    if (item.participants < minValueObject.participants) {
      minValueObject = item;
    }
    if (item.participants > maxValueObject.participants) {
      maxValueObject = item;
    }
  });

  minValueObject.note = '가장 적은 응답자 수를 가졌습니다.';
  maxValueObject.note = '가장 많은 응답자 수를 가졌습니다.';

  return parsedData; // 데이터를 반환
};

export const genderData = async () => {
  const response = await fetch(
    `https://assets.codepen.io/975719/gender_data.json`
  );
  const data = await response.json();

  return data; // 데이터를 반환
};
