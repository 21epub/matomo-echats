import React, { useContext } from 'react'
import { AppContext } from '../util/context'
import SelectPeriod from './SelectPeriod'
import { keyToRange } from '../util/dateCompute'
import styles from './index.module.less'
import { Space, Tabs } from 'antd'
const { TabPane } = Tabs

interface Props {
  isOrgVersion?: boolean
  isHomePageVersion?: boolean
  isStatisticReportVersion?: boolean
  isCbtVersion?: boolean
}

function Filter({
  isOrgVersion = false,
  isHomePageVersion = false,
  isStatisticReportVersion = false,
  isCbtVersion = false
}: Props) {
  const { state: options, dispatch } = useContext(AppContext)

  const filter = (key: string) => {
    const period = key
    if (key === 'all') {
      const newstate = {
        period: period
      }
      dispatch({
        type: 'filter',
        payload: newstate
      })
    } else {
      const newRange = keyToRange(key)
      const newSate = {
        dateRange: newRange,
        period: period
      }
      dispatch({
        type: 'filter',
        payload: newSate
      })
    }
  }

  if (isOrgVersion) {
    return (
      <div className={styles.filter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' />
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          <TabPane tab='近一年' key='last365' />
          <TabPane tab='本年' key='thisyear' />
          <TabPane tab='全部' key='total' />
        </Tabs>
      </div>
    )
  } else if (isHomePageVersion) {
    return (
      <div className={styles.reachFilter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          // tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          {/* <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' /> */}
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          {/* <TabPane tab='本年' key='thisyear' /> */}
          <TabPane tab='全部' key='all' />
        </Tabs>
      </div>
    )
  } else if (isStatisticReportVersion) {
    return (
      <Space className={styles.reachFilter} size='large'>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          onChange={filter}
        >
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
        </Tabs>
        <SelectPeriod />
      </Space>
    )
  } else if (isCbtVersion) {
    return (
      <Space className={styles.reachFilter} size='large'>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          onChange={filter}
        >
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近30日' key='last30' />
          <TabPane tab='近一年' key='last365' />
        </Tabs>
        <SelectPeriod />
      </Space>
    )
  } else {
    return (
      <div className={styles.filter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' />
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          <TabPane tab='本年' key='thisyear' />
          <TabPane tab='全部' key='all' />
        </Tabs>
      </div>
    )
  }
}

export default Filter
