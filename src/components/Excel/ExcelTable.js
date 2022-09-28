import React, {useEffect, useState} from 'react';
import {Button, Col, Empty, Form, Input, Row, Select, Table} from "antd";

const ExcelTable = ({sheetData, sheetName, currentSheet, seCurrentSheet}) => {


    const [saveData, setSaveData] = useState();
    const {Option} = Select;
    const [form] = Form.useForm();


    const onChangeSheet = (e) => {
        seCurrentSheet(e);
    }

    const onFinish = () => {
        const rows = sheetData[currentSheet];
        const keys = sheetData[currentSheet][0];
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])))
        }
        // result.map(v => Object.values(v).map(b => {
        //     if (b !== "") {
        //     } else {
        //         alert("dasds")
        //         return false;
        //     }
        // }))
        setSaveData(result);
        console.log(sheetData[currentSheet].slice(1).map(v => v))

    }

    console.log(saveData)

    return (
        <>
            {Object.keys(sheetData).length > 0 ? (
                <>
                <div>
                    <Select defaultValue={currentSheet} onChange={e => onChangeSheet(e)}>
                    {sheetName.map(v => <Option value={v} key={v} />)}
                    </Select>
                </div>
                    <Form form={form} onFinish={onFinish}>
                        <Row>
                            <Col span={24}>
                                <div className="ant-table-content">
                                    <table style={{tableLayout: "auto"}}>
                                        <thead className="ant-table-thead">
                                        <tr>
                                            {sheetData[currentSheet][0].map(v => <th className="ant-table-cell" style={{textAlign: "center"}} key={v}>{v}</th>)}
                                        </tr>
                                        </thead>
                                        <tbody className="ant-table-tbody">
                                        {sheetData[currentSheet].slice(1).map(v =>
                                            <tr className="ant-table-row ant-table-row-level-0">{v.map(c =>
                                                <td className="ant-table-cell" style={{textAlign: "center", padding: '0px'}}>
                                                    <Form.Item name={Math.random()} initialValue={c} rules={[{required: true, message: '입력하셈'}]}>
                                                        <Input style={{padding: '10px'}}/>
                                                    </Form.Item>
                                                </td>
                                            )}</tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type='primary' htmlType="submit">SAVE</Button>
                        </Form.Item>
                    </Form>
                </>
            ) : <Empty/>}
        </>
    );
};

export default ExcelTable;