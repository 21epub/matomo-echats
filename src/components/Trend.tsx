import React, { useState } from 'react'
import useSWR from 'swr'
import { Card, Spin, Space, Row, Col, Tabs } from 'antd'
import TrendDetail from './TrendDetail'
import { titleTranslate } from '../util/util'
import { RightOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'

const { TabPane } = Tabs

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  options: Options
  detailLink?: string
  cardTitle: string
  isDetailVersion?: boolean
  isOrgVersion?: boolean
  isCbtVersion?: boolean
  createTime?: string
  extra?: React.ReactNode[]
}

function Trend({
  url,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  isOrgVersion = false,
  isCbtVersion = false,
  createTime,
  extra
}: Props) {
  const bigVersion = styles.bigTrendVersion
  const smallVersion = styles.smallTrendVersion

  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const source = options.source

  let newUrl = ''
  if (isOrgVersion === false) {
    if (period !== 'all' && startDate && endDate) {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    } else if (createTime !== '') {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${createTime}`
    }
  } else if (isOrgVersion === true) {
    if (startDate && endDate) {
      newUrl = `${url}?period=${period}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    }
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: ele } = useSWR(newUrl, fetcher, swrOptions)

  const [keyState, setKeyState] = useState('nb_hits')

  function getKey(key: string) {
    setKeyState(key)
  }

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  const workTab = isDetailVersion ? (
    <Tabs defaultActiveKey='nb_hits' activeKey={keyState} onChange={getKey}>
      <TabPane tab='PV' key='nb_hits' />
      <TabPane tab='UV' key='nb_uniq_visitors' />
      {!isCbtVersion ? <TabPane tab='转发数' key='forwarding_number' /> : ''}
      {/* {!isCbtVersion ? <TabPane tab='平均时长' key='avg_time_on_page' /> : ''}
      {!isCbtVersion ? <TabPane tab='跳出率' key='bounce_rate' /> : ''} */}
    </Tabs>
  ) : (
    <Col xs={{ span: 14 }}>
      <Tabs
        defaultActiveKey='nb_hits'
        activeKey={keyState}
        onChange={getKey}
        style={isCbtVersion ? { marginLeft: '20%' } : undefined}
      >
        <TabPane tab='PV' key='nb_hits' />
        <TabPane tab='UV' key='nb_uniq_visitors' />
        {!isCbtVersion ? <TabPane tab='转发数' key='forwarding_number' /> : ''}
        {/* {!isCbtVersion ? <TabPane tab='平均时长' key='avg_time_on_page' /> : ''}
        {!isCbtVersion ? <TabPane tab='跳出率' key='bounce_rate' /> : ''} */}
      </Tabs>
    </Col>
  )

  const orgTab = isDetailVersion ? (
    <Tabs defaultActiveKey='nb_hits' activeKey={keyState} onChange={getKey}>
      <TabPane tab='PV' key='nb_hits' />
      <TabPane tab='UV' key='nb_uniq_visitors' />
      <TabPane tab='分享转发' key='forwarding_number' />
      {/* <TabPane tab='数据' key='add_data' /> */}
    </Tabs>
  ) : (
    <Col xs={{ span: 14 }}>
      <Tabs defaultActiveKey='nb_hits' activeKey={keyState} onChange={getKey}>
        <TabPane tab='PV' key='nb_hits' />
        <TabPane tab='UV' key='nb_uniq_visitors' />
        <TabPane tab='分享转发' key='forwarding_number' />
        {/* <TabPane tab='数据' key='add_data' /> */}
      </Tabs>
    </Col>
  )

  const tab = isOrgVersion ? orgTab : workTab

  if (ele && Object.keys(ele)?.length) {
    const { total, ...elements } = ele
    const keylist = Object.keys(elements)
    const elementsValue = []
    for (let i = 0; i < keylist.length; i++) {
      if (keyState === 'bounce_rate') {
        let value = elements[keylist[i]][keyState]
        value = Number(value.substr(0, value.length - 1))
        const name = titleTranslate(keyState)
        elementsValue[i] = { date: keylist[i], [name]: value }
      } else {
        const name = titleTranslate(keyState)
        elementsValue[i] = {
          date: keylist[i],
          [name]: elements[keylist[i]][keyState]
        }
      }
    }
    const name = titleTranslate(keyState)
    const sourceValue = elementsValue
    const labelList = ['date', name]

    const content = {
      tooltip: {
        formatter: function (params: any) {
          const date = params.data.date
          const key = params.dimensionNames[1]
          const value = params.data[key]
          return key + '<br/>' + date + ':  ' + value
        }
      },
      dataset: {
        dimensions: labelList,
        source: sourceValue
      },
      xAxis: { type: 'category' },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#7CA1F5',
              label: {
                show: true,
                position: 'top',
                color: '#000000 '
              }
            }
          }
        }
      ]
    }

    if (isDetailVersion === true) {
      return (
        <div className={isDetailVersion ? bigVersion : smallVersion}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title={cardTitle}
                extra={
                  <Space size='large'>
                    <p className='daterange'>{daterangeContent}</p>
                    <a className='detailLink' href={detailLink}>
                      <RightOutlined style={{ color: 'grey' }} />
                    </a>
                  </Space>
                }
              >
                {tab}
                <ReactEcharts option={content} />
              </Card>
            </Col>
            <Col span={24}>
              <TrendDetail
                url={url}
                options={options}
                keyState={keyState}
                createTime={createTime}
                extra={extra}
                isOrgVersion={isOrgVersion}
              />
            </Col>
          </Row>
        </div>
      )
    } else if (ele && Object.keys(ele)?.length === 0) {
      return (
        <div className={isDetailVersion ? bigVersion : smallVersion}>
          <Card
            title={cardTitle}
            extra={
              <Space size='large'>
                <p className='daterange'>{daterangeContent}</p>
                <a className='detailLink' href={detailLink}>
                  <RightOutlined style={{ color: 'grey' }} />
                </a>
              </Space>
            }
          >
            <h1>暂无数据</h1>
          </Card>
        </div>
      )
    } else {
      return (
        <div className={isDetailVersion ? bigVersion : smallVersion}>
          <Card
            title={cardTitle}
            extra={
              <Space size='large'>
                <p className='daterange'>{daterangeContent}</p>
                <a className='detailLink' href={detailLink}>
                  <RightOutlined style={{ color: 'grey' }} />
                </a>
              </Space>
            }
          >
            {tab}
            <ReactEcharts option={content} />
          </Card>
        </div>
      )
    }
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default Trend
