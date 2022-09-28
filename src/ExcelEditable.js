import React, {useEffect, useState} from 'react';
import {generateObjects, ReactExcel, readFile} from "@ramonak/react-excel";

const ExcelEditable = () => {

    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});
    const [saveBtn, setSaveBtn] = useState(true);
    const [validationBtn, SetValidationBtn] = useState(true);
    const [inputCells, setInputCells] = useState([]);
    const [saveObject, setSaveObject] = useState([]);

    useEffect(() => {
        if(document.getElementsByTagName('td').length > 0) {
            setInputCells([...document.getElementsByTagName('td')]);
            SetValidationBtn(false);
            setSaveBtn(true)
        }
    }, [currentSheet])

    const handleUpload = (e) => {
        const file = e.target.files[0];
        readFile(file)
            .then((readedData) => setInitialData(readedData))
            .catch((err) => console.log(err));
    };

    const save = () => {
        const result = generateObjects(currentSheet);
        setSaveObject(result);
    }

    const validation = () => {
        if (inputCells.filter(v => v.innerHTML === "").length > 0) {
            alert('빈 값 있음');
        } else {
            setSaveBtn(false);
        }
    }

    console.log(saveObject);

    return (
        <>
            <input type='file' accept='.xlsx' onChange={handleUpload}/>
            <ReactExcel
                initialData={initialData}
                onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
                activeSheetClassName='active-sheet'
                reactExcelClassName='react-excel'
            />
            <button onClick={validation} disabled={validationBtn}>
                Validation
            </button>
            <button onClick={save} disabled={saveBtn}>
                Save
            </button>

            {/*{saveObject.length > 0 ? (*/}
            {/*    <textarea cols={70} rows={30} value={JSON.stringify(saveObject, null, 2)} readOnly/>*/}
            {/*) : null}*/}
        </>
    );
};

export default ExcelEditable;