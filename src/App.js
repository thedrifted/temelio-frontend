import React, { useEffect, useState } from 'react';
import './App.css';
import { TabComponent } from './components/TabComponent';
import { TableComponent } from './components/Table';
import { Form } from './components/Form';
import { CustomTab } from './components/CustomTab';
import { SendEmailComponent } from './components/SendEmailComponent';
import { createNonProfit, createFoundation, fetchAllFoundations, fetchAllNonProfits, sendEmail, getAllEmails } from './handlers/api';
import { ErrorToast } from './components/ErrorToast';
import { height } from '@mui/system';
import { dark } from '@mui/material/styles/createPalette';

function App() {
  const [value, setValue] = useState(0);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [emailsList, setEmailsList] = useState([])
  const [foundationList, setFoundationList] = useState([]);
  const [nonProfitList, setNonProfitList] = useState([]);

  useEffect(() => {
    getAllFondations();
    getAllNPO();
  }, [])

  useEffect(() => {
    if (value == 3) {
      fetchAllEmails();
    }
  }, [value])
  const handleOnClickForCreateNonProfit = async (formState) => {
    try {
      await createNonProfit(formState);
      getAllNPO();
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  };

  const getAllFondations = async () => {
    try {
      const data = await fetchAllFoundations();
      if (data) {
        setFoundationList(data);
      }
    }
    catch (error) {
      setError(error.message);
      setOpen(true);
    }
  }

  const getAllNPO = async () => {
    try {
      const data = await fetchAllNonProfits();
      if (data) {
        setNonProfitList(data);
      }
    }
    catch (error) {
      setError(error.message);
      setOpen(true);
    }
  }

  const handleOnClickForFoundation = async (formState) => {
    try {
      await createFoundation(formState);
      getAllFondations()
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  }

  const sendEmailsToNPO = async (foundations, nonProfitList) => {
    console.log(foundations)
    const foundationId = foundations?.fid;
    const nonProfitIds = nonProfitList.map(nonProfit => nonProfit.npid);
    try {
      await sendEmail({ foundationId, nonProfitIds })
    }
    catch (error) {
      setError(error.message);
      setOpen(true);
    }
  }

  const fetchAllEmails = async () => {

    try {
      const data = await getAllEmails();
      setEmailsList(data)
    }
    catch (error) {
      setError(error.message);
      setOpen(true);
    }

  }


  return (
    <div className="App">
      <TabComponent value={value} setValue={setValue} sx={{ height: "100%" }}>
        <CustomTab value={value} index={0}>
          <Form
            boxWidth={"33%"}
            onClick={handleOnClickForCreateNonProfit}
            formFields={[{ name: "email", label: "email" }, { name: "name", label: "name" }, { name: "address", label: "address" }]}
          />
        </CustomTab>
        <CustomTab value={value} index={1}>
          <Form
            boxWidth={"33%"}
            onClick={handleOnClickForFoundation}
            formFields={[{ name: "email", label: "email" }]}
          />
        </CustomTab>
        <CustomTab value={value} index={2}>
          <SendEmailComponent
            foundations={foundationList}
            nonProfits={nonProfitList}
            sendEmail={sendEmailsToNPO}
          />
        </CustomTab>
        <CustomTab value={value} index={3} boxWidth={"80%"}>
          <TableComponent
            headers={{ "sentDate": "Date", "nonProfitName": "Non-profit name", "nonProfitEmail": "Non-profit email", "nonProfitAddress": "Non-profit address" }}
            rows={emailsList}
          />
        </CustomTab>
      </TabComponent>

      <ErrorToast open={open} onClose={() => { setOpen(false) }} message={error} />
    </div>
  );
}

export default App;
