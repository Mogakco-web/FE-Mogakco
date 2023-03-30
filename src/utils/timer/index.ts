interface ITime {
  second: number;
  minute: number;
  hour: number;
}

const today = new Date();

export const getCurrentDate = () => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${String(year).padStart(2, '0')}-${String(month).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
};

export const getYesterDate = () => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate() - 1;
  return `${String(year).padStart(2, '0')}-${String(month).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
};

export const formatTime = ({ hour = 0, minute = 0, second = 0 }: ITime) => {
  // 화면에 보여지는 타임 데이터 포맷 및 백엔드에게 보낼때도 사용하는 포맷터
  if (isNaN(hour)) {
    hour = 0;
  }
  const getHours = hour.toString().padStart(2, '0');
  const getMinutes = minute.toString().padStart(2, '0');
  const getSeconds = second.toString().padStart(2, '0');
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const transHMC = (time: ITime) => {
  // 백엔드에게 저장할 날짜 보내는 바디값
  const [hours, minute, second] = formatTime(time)
    .split(':')
    .map((data) => data.trim());
  return [hours, minute, second];
};

export const dateFormat = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${year}年 ${month}月 ${day}日`;
};

export const ContinuousMode = () => {
  const startDate = localStorage.getItem('startDate');
  const cureentDate = getCurrentDate();
  let sendDate = getCurrentDate();
  if (startDate) {
    // 타이머 시작을 전날에 한 경우 (자정이 넘어서도 지속된 타이머)
    if (startDate < cureentDate) {
      sendDate = startDate;
      // 자정이 넘었으니 startDate를 서버로 전송 후 로컬에서 삭제
      localStorage.removeItem('startDate');
    } else {
      // 자정이 넘지 않았으니 getCurrentDate()를 서버로 전송하면 된다.
      sendDate = cureentDate;
    }
  }
  return sendDate;
};
