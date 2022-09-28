import React, {useState} from 'react';
import {Button, Col, Row, Upload} from "antd";

const ExcelImport = ({ onFileUpload, excelHeader}) => {

    const XLSX = require('xlsx');
    const [file, setFile] = useState(null);
    const [sheetNames, setSheetNames] = useState([]);

    const readDataFromExcel = (data) => {
        const workBook = XLSX.read(data);
        setSheetNames(workBook.SheetNames);
        console.log(workBook.SheetNames)

        return workBook.SheetNames.map(v => {
            const workSheet = workBook.Sheets[v];
            const dataParse = XLSX.utils.sheet_to_json(workSheet, {
                header: 1,
                defval: ''
            });
            return {
                [v]: dataParse,
            }
        });
    }
    console.log(sheetNames)

    const handleReadFile = async (e) => {
        const uploadFile = e.file;

        // Read Excel File
        const data = await uploadFile.arrayBuffer();
        const sheetData = readDataFromExcel(data);

        setFile(uploadFile);
        onFileUpload(sheetData);
        console.log(sheetNames)
        excelHeader(sheetNames);
    }

    const beforeUploadHandle = () => {
        return false;
    }

    return (
        <>
            <Row>
                <Col>
                    <Upload type='file' accept='.xlsx' multiple={false} onChange={handleReadFile} beforeUpload={beforeUploadHandle}>
                        <Button>
                            Upload File
                        </Button>
                    </Upload>
                </Col>
            </Row>
        </>
    );
};

export default ExcelImport;