import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from 'styled-components';
import { Star,Airplane,People,Calendar } from 'react-bootstrap-icons';


function Top() {
    return(
        <TopBar>
            <div className='container-inline'>
                <div className='row'>
                <div className='col-md-6 d-flex justify-content-start align-items-center'>
                    <ul className='d-flex d-inline-flex justify-content-start align-items-center'>
                        <li>
                            <a href=''>Digital Calendar </a><Star/>
                        </li>
                        <li>
                           <Airplane/> <a href=''>Travidux,LLc</a>
                        </li>
                        <li>
                           <People/> <a href=''>Team Visible</a>
                        </li>
                 
                    </ul>
                   
                </div>
                <div className='col-md-6 d-flex justify-content-end'>
                    <ul className='d-flex d-inline-flex justify-content-end align-items-center'>
                        <li>
                           <Calendar/> <a href=''> Calendar</a>
                        </li>
                
                    </ul>

                </div>
                </div>
            </div>
        </TopBar>


    )
    
}
const TopBar = styled.div`
height: auto;
width: 100%;
background:linear-gradient(45deg, #fdb400, #FB8602);
ul{
    margin-top: 10px;
    
}

ul li{
    list-style: none;
    border-right: 0.5px solid rgba(255,255,255,0.5) ;
    padding-right: 10px;
    margin-left: 10px;
}
ul li a{
    font-size: 14px;
    
    margin-left: 16px;

    
}

`



export default Top

