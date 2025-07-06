


import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip'


const CalendarHeatmapComponent = ({submissions}) => {
    console.log("submssions",submissions)
    return (

        <div style={{ maxWidth: '600px', margin: '0 auto', overflow: 'hidden' }}>

            <CalendarHeatmap
                startDate={new Date('2025-01-01')}
                endDate={new Date('2025-10-06')}
                values={submissions}


                classForValue={(value) => {
                    if (!value) return 'color-nostreak';

                    const date = new Date(value.date);
                    const isFirstOfMonth = date.getDate() <= 7 && date.getDay() === 0; // First Sunday

                    let baseClass = '';
                    if (value.count >= 4) baseClass = 'color-github-4';
                    else if (value.count === 3) baseClass = 'color-github-3';
                    else if (value.count === 2) baseClass = 'color-github-2';
                    else baseClass = 'color-github-1';

                    return isFirstOfMonth ? `${baseClass} month-separator` : baseClass;
                }}


                tooltipDataAttrs={(value) => {
                    // value will be undefined for truly empty cells
                    const date = value?.date ?? '';
                    const count = value?.count ?? 0;

                    return {
                        'data-tooltip-id': 'heatmap-tooltip',
                        'data-tooltip-content': `${date}: ${count} submissions`,
                    };
                    // return { 'data-tip': `${date}: ${count} submissions` } as { [key: string]: string }
                }}


            />
            <Tooltip id="heatmap-tooltip"  />

        </div>
    )
}

export default CalendarHeatmapComponent