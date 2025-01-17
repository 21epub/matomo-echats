import React from 'react'
import { Card, Row, Col, Spin } from 'antd'
import useSWR from 'swr'
// import { secondToTime } from '../util/dateCompute'

interface Props {
  url: string
  createTime: string
}

function Summary({ url, createTime }: Props) {
  let newUrl = ''
  if (createTime !== '') {
    newUrl = `${url}?start_time=${createTime}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements?.yesterday) {
    const content = []
    const spanList = [8, 8, 6]
    const titleList = [
      '浏览量（PV）',
      '访客数（UV）',
      '转发数'
      // '平均时长',
      // '跳出率'
    ]
    const todayData = [
      elements.today.nb_hits,
      elements.today.nb_uniq_visitors,
      elements.today.forwarding_number
      // secondToTime(elements.today.avg_time_on_page),
      // elements.today.bounce_rate
    ]
    const yesterdayData = [
      elements.yesterday.nb_hits,
      elements.yesterday.nb_uniq_visitors,
      elements.yesterday.forwarding_number
      // secondToTime(elements.yesterday.avg_time_on_page),
      // elements.yesterday.bounce_rate
    ]
    const totalData = [
      elements.total.nb_hits,
      elements.total.nb_uniq_visitors,
      elements.total.forwarding_number
      // secondToTime(elements.total.avg_time_on_page),
      // elements.total.bounce_rate
    ]
    for (let i = 0; i < 5; i++) {
      content[i] = {
        spanList: spanList[i],
        titleList: titleList[i],
        todayData: todayData[i],
        yesterdayData: yesterdayData[i],
        totalData: totalData[i]
      }
    }
    return (
      <Card title='基本信息'>
        <Row align='bottom'>
          <Col span={2}>
            <br />
            <p>今日</p>
            <p>昨日</p>
            <p>总</p>
          </Col>
          {content.map((e, i) => {
            return (
              <Col span={e.spanList} key={i}>
                <p>{e.titleList}</p>
                <h1>{e.todayData}</h1>
                <p>{e.yesterdayData}</p>
                <p>{e.totalData}</p>
              </Col>
            )
          })}
        </Row>
      </Card>
    )
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default Summary
