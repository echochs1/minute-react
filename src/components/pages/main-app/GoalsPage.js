// RESOURCES
// https://ant.design/components/form/#components-form-demo-time-related-controls

import React, { useState, useContext } from 'react';
import { Button, Modal } from 'antd';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { FirebaseContext } from "../../../service/firebase/fbContext";
moment().format();

const tips = "We recommend you practice daily, but you can also practice twice a day, twice a week, or once a week.";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const defaultValues = {
  name: "",
  type: "",
  date: "",
  freq: "",
};

// const today = moment().year().toString() + '-' + moment().month().toString()+ '-' + moment().date().toString();

const Goals = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {authUser} = useContext(FirebaseContext);

  const handleChange = (event) => {
    console.log(event);
  };

  const openCreateGoalModal = () => {
    setIsModalVisible(true);
    console.log(formValues);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(formValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderGoals = () => {
    // if (goals) {
    //   return (
    //     <ul className="recordingsList">
    //       {goals.map((goal, index) =>
    //         <li key={index} className="recordingItem">

    //         </li>
    //       )}
    //     </ul>
    //   )
    // } else {
    //   return (
    //     <div>
    //       <Space size="middle">
    //         <Spin size="large" />
    //       </Space>
    //     </div>
    //   )
    // }
  }

  return (
    <div>
      <Grid container direction="row" justifyContent="space-between" align-items="center" style={{padding: '20px'}}>
        <Grid item>
          <h1>Goals</h1>
        </Grid>
        <Grid item direction="column"
        align-items="center"
        justify-content="center">
          <Button type='primary' onClick={openCreateGoalModal}>
            Create a goal
          </Button>
        </Grid>
      </Grid>
      {renderGoals()}
      <Modal title="Create a Goal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Submit">
        <div>
          <form >
            <Grid container alignItems="center" justify="center" direction="column" gap="10px 20px">
              <Grid item>
                <TextField style={{ width: "350px" }} id="name" name="name" label="Goal Name" variant="filled" onChange={handleChange} />
              </Grid>
              <Grid item>
                <FormControl style={{ width: "350px" }} variant="filled">
                  <InputLabel>Practice Frequency</InputLabel>
                  <Select
                    labelId="freq"
                    id="freq"
                    value={formValues.freq}
                    label="Practice Frequency"
                    onChange={handleChange}
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Twice a day"}>Twice a day</MenuItem>
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Twice a week"}>Twice a week</MenuItem>
                    <MenuItem value={"Week"}>Week</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "350px" }}
                  variant="filled"
                  id="date"
                  label="Goal Date"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "350px" }}
                  id="goal_description"
                  label="Goal Description"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="filled"
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Goals;