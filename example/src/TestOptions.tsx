import React, { useEffect, useState, useContext } from 'react'

import {
  AppContext,
  TransformTrend,
  // Trend,
  DetailFilter
  // Detail,
  // InstallButton
} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'

const TestOptions = () => {
  const { state: options } = useContext(AppContext)

  // const detailLink: string = '#'
  // const mapTitle:string = '地域分布';
  // const barchartTitle: string = '扩展渠道'
  // const promoteTitle:string = "推广分析";
  // const trendTitle:string = "趋势图";
  const [createTime, setCreateTime] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setCreateTime('2020-10-20')
    }, 2000)
  }, [])
  console.log(options, createTime)

  return (
    <div>
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Summary url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/summary/" create_time={createTime}/>
          </Col>
        </Row> */}
      {/* <InstallButton downloadUrl='testurl' /> */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DetailFilter />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} cardTitle={barchartTitle} isDetailVersion={true} createTime ={createTime}  extra={<InstallButton downloadUrl='url'/>}/> 
          </Col>
      </Row>  */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TransformTrend
            summaryUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/transform/'
            optionsUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/idgoal/'
          />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Barchart
              // url="url" 
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
              create_time ={createTime}
            />
          </Col>
        </Row> */}
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              // url="url" 
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              createTime ={createTime}
              detailType='promote'
              extra={<InstallButton downloadUrl='url'/>}
            />
          </Col>
        </Row> */}
      {/* 
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <EchartsMap
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/map/'
            options={options}
            detailLink={detailLink}
            cardTitle={barchartTitle}
            isDetailVersion
            createTime={createTime}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Filter />
          </Col>
        </Row> */}

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="url"
              options={options}
              detailType="barchart"
              create_time ={create_time}
            />
          </Col>
        </Row> */}
    </div>
  )
}

export default TestOptions
