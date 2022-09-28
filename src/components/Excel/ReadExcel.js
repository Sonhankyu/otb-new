import React, {useState} from 'react';
import ExcelImport from "./ExcelImport";
import {Button, Upload} from "antd";
import ExcelTable from "./ExcelTable";

const ReadExcel = () => {

    const XLSX = require('xlsx');
    const [sheetData, setSheetData] = useState({});
    const [sheetNames, setSheetNames] = useState([]);
    const [currentSheet, setCurrentSheet] = useState();


    const handleReadFile = (e) => {
        const file = e.file;
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result;
            const workBook = XLSX.read(data, {type: "binary"});

            const tmp = {};
            setSheetNames(workBook.SheetNames)
            workBook.SheetNames.map(name => {
                const workSheets = workBook.Sheets[name];
                const rows = XLSX.utils.sheet_to_json(workSheets, { defval: "", header: 1});

                tmp[name] = rows;
                // setSheetData( {[name]: rows});
            })
            setSheetData(tmp);
            setCurrentSheet(Object.keys(tmp)[0]);
        };
        reader.readAsBinaryString(file);
    }


    const beforeUploadHandle = () => {
        return false;
    }

    return (
        <div>
            {/*<ExcelImport excelHeader={handleExcelHeader} onFileUpload={handleFileUpload}/>*/}
            <Upload type='file' accept='.xlsx' multiple={false} onChange={handleReadFile} beforeUpload={beforeUploadHandle}>
                <Button>
                    Upload File
                </Button>
            </Upload>
            <ExcelTable sheetName={sheetNames} sheetData={sheetData} currentSheet={currentSheet} seCurrentSheet={setCurrentSheet}/>
        </div>
    );
};

export default ReadExcel;