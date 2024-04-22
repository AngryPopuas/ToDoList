import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';





const TaskCalendar = ({dateCallBack}: {dateCallBack: (date:Dayjs) => void}) => {

  const handleCallBack = (date: Dayjs) => {
    dateCallBack(date)
  }
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div>
      <Calendar fullscreen={false} onChange={handleCallBack} />
    </div>
  )
}

export default TaskCalendar