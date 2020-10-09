import React,{useContext} from 'react';
import {AppContext} from './context';
import SelectPeriod from './SelectPeriod';
import { Tabs} from 'antd';
import {keyToRange} from './dateCompute';
const { TabPane } = Tabs;

function Filter() {
    const {state:options, dispatch} = useContext(AppContext);

    const filter = (key:string) => {
        console.log('filter',key);
        const period = key;
        if(key==='all'){
            const newstate = {
                period:period
            }
            dispatch({
                type:'filter',
                payload:newstate
            })
        }else{
            const newRange = keyToRange(key);
            const newSate ={
                dateRange:newRange,
                period:period
            }
            dispatch({
                type: 'filter',
                payload: newSate
            })
        }
    };
    
    return(
        <Tabs defaultActiveKey="today" activeKey={options.period} tabBarExtraContent={<SelectPeriod/>} onChange={filter}>
            <TabPane tab="今日" key="today">          
            </TabPane>
            <TabPane tab="昨日" key="yesterday">          
            </TabPane>
            <TabPane tab="近7日" key="last7">        
            </TabPane>
            <TabPane tab="近15日" key="last15">        
            </TabPane>
            <TabPane tab="近30日" key="last30">        
            </TabPane>
            <TabPane tab="全部" key="all">        
            </TabPane>
        </Tabs>
    )
}

export default Filter;