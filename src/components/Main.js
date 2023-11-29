import React,{useState} from 'react'
import { styled } from 'styled-components'
import { ArrowUp,ArrowDown, } from 'react-bootstrap-icons';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday } from 'date-fns';

function Main() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // next/prev button
    const nextMonth = () => {
        setCurrentDate(addDays(currentDate, 1));
        
      };
    
      const prevMonth = () => {
        setCurrentDate(addDays(currentDate, -1));
      };



const renderDays = ()=>{
        //   days show on calendar
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        
        const endDate = endOfWeek(monthEnd);

        console.log(endDate);
        const rows = [];
        let days = [];
        let day = startDate;

    while (day<=endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(
                <div  key={day}  className={`cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isToday(day) ? 'today' : ''}`}>
                    {format(day,'d')}
                </div>
                
            )
            day = addDays(day, 1);

            
            
        }
        rows.push(<div key={day} className="row">{days}</div>);
        days = [];

        
    }
    return <div className="container mainDays">{rows}</div>;
}

const renderWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="container weekDays">
        
          <div  className="row">
          {days.map((day) => (
            <div key={day}className='col-2'>{day}</div>
            ))}
          </div>
      
      </div>
    );
  };

    // console.log(currentDate);
    return(
        <MainSection>
            <div className='container '>
                <div className='row '>
                    <div className='d-flex d-inline-flex justify-content-between'>
                        <div className="d-flex d-inline-flex justify-content-between" >
                            <div className='up' ><button onClick={prevMonth}> <ArrowUp/></button></div>
                            <div className='down'><button onClick={nextMonth}><ArrowDown /></button></div>

                        </div>
                        <div><h2>{format(currentDate,'MMMM d')}</h2></div>
                        <div className="d-flex d-inline-flex justify-content-between">
                            <div className='week'><a href=''>Week</a></div>
                            <div className='month'><a href=''>Month</a></div>

                        </div>
                    </div>

                    
                </div>
            </div>


            {renderWeek()}


            {renderDays()}
            {/* <div className='container mainDays'>

                         

                        <div className='row'>


                            <div className='col-3'>1</div>

                            <div className='col-3'>2</div>
                            <div className='col-3'>3</div>
                            <div className='col-3'>4</div>
                            <div className='col-3'>5</div>
                            <div className='col-3'>6</div>
                            <div className='col-3'>7</div>
                            <div className='col-3'>8</div>
                            <div className='col-3'>9</div>
                            <div className='col-3'>10</div>
                            <div className='col-3'>11</div>
                            <div className='col-3'>12</div>
                            <div className='col-3'>13</div>
                            <div className='col-3'>14</div>
                            <div className='col-3'>15</div>
                            <div className='col-3'>16</div>
                            <div className='col-3'>17</div>
                            <div className='col-3'>18</div>
                            <div className='col-3'>19</div>
                            <div className='col-3'>20</div>
                            <div className='col-3'>21</div>
                            <div className='col-3'>22</div>
                            <div className='col-3'>23</div>
                            <div className='col-3'>24</div>
                            <div className='col-3'>25</div>
                            <div className='col-3'>26</div>
                            <div className='col-3'>27</div>
                            <div className='col-3'>28</div>
                            <div className='col-3'>29</div>
                            <div className='col-3'>30</div>
                        </div>

                    </div> */}

                    <div className='container weekDays'>
                        <div className='row'>
                            <div className='col-2'>1</div>
                            <div className='col-2'>2</div>
                            <div className='col-2'>3</div>
                            <div className='col-2'>4</div>
                            <div className='col-2'>5</div>
                            <div className='col-2'>6</div>
                            <div className='col-2'>7</div>
                        </div>
                    </div>
            
                
            
        </MainSection>
    )
    
}

const MainSection = styled.div`

height: auto;
padding-bottom: 20px;
width: 100%;
background-color: antiquewhite;

.mainDays div div{
    width: 13%;
    height: 120px;
    background-color: #E3E4E6;
    margin: 2px;
}
.weekDays div div{
    width: 13%;
    height: 20px;
    background-color: #E3E4E6;
    margin: 2px;
    text-align: end;
}

.cell.disabled {
  color: #aaa;
}

.cell.today {
  background-color: #f0f0f0;
}


`

export default Main