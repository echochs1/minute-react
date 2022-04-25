// RESOURCES
// https://ant.design/components/form/#components-form-demo-time-related-controls

import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Space, Spin } from 'antd';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { FirebaseContext } from "../../../service/firebase/fbContext";
import { fbUploadGoal, fbGetAllGoals } from "../../../service/firebase/fbConfig";
import { moneyverse } from "../../../assets/images/moneyverse";

/**
 * 
 * @param {*} arr array of items
 * @returns random index of the array arr
 */
 const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const tips = "We recommend you practice daily, but you can also practice twice a day, twice a week, or once a week.";

const defaultValues = {
  name: "",
  description: "",
  date: "",
  freq: "",
};

const createGoalModalTitle = "Create a Goal";
const editGoalModalTitle = "Edit a Goal";

const currentdate = new Date();

const Goals = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState(null);
  const [modalTitle, setModalTitle] = useState(createGoalModalTitle);
  const { authUser } = useContext(FirebaseContext);

  useEffect(() => {
    setGoals(fbGetAllGoals());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const getDaysLeft = (targetDate) => {
    var tempDate = new Date(targetDate);
    var diffTime = (tempDate - currentdate);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  }

  const openCreateGoalModal = () => {
    setModalTitle(createGoalModalTitle);
    setFormValues(defaultValues);
    setIsModalVisible(true);
    console.log(formValues);
    console.log(goals);
  };

  const openEditGoalModal = goal => {
    setModalTitle(editGoalModalTitle);
    setFormValues({
      name: goal.name,
      description: goal.description,
      date: goal.date,
      freq: goal.freq,
    });
    setIsModalVisible(true);
  }
  const handleOk = () => {
    setIsModalVisible(false);
    fbUploadGoal(formValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderGoals = () => {
    if (goals) {
      return (
        <ul className="goalsList">
          {goals.map((goal, index) =>
            <li key={index} className="goalItem" onClick={() => openEditGoalModal(goal)}>
              <div className="goalContent">
                <div className="goalImage">
                  <img src={moneyverse[randomIndex(moneyverse)]} alt="fun recording img" />
                </div>
                <div className="goalInfo">
                  <p className="goalName"><b>Name: </b>{goal.name}</p>
                  <p className="goalDate"><b>Target Date: </b>{goal.date}</p>
                  <p className="goalDaysLeft"><b>Days Left: </b>{getDaysLeft(goal.date)}</p>
                  <p className="goalFreq"><b>Practice Frequency: </b>{goal.freq}</p>
                  <p className="goalDescription"><b>Description: </b>{goal.description}</p>
                </div>
              </div>
              <hr className="goalLine" size="2px" width="100%" color="#BBD2E7"></hr>
            </li>
          )}
        </ul>
      )
    } else {
      return (
        <div>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      )
    }
  }

  return (
    <div className='goalPage'>
      <Grid container direction="row" justifyContent="space-between" align-items="center" style={{ padding: '20px' }}>
        <Grid item>
          <h1>Goals</h1>
        </Grid>
        <Grid item
          align-items="center"
          justify-content="center">
          <Button type='primary' onClick={openCreateGoalModal}>
            Create a goal
          </Button>
        </Grid>
      </Grid>
      {renderGoals()}
      <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Submit">
        <div>
          <form >
            <Grid container alignItems="center" justify="center" direction="column" gap="10px 20px">
              <Grid item>
                <TextField value={formValues.name} style={{ width: "350px" }} id="name" name="name" label="Goal Name" variant="filled" onChange={handleChange} />
              </Grid>
              <Grid item>
                <FormControl style={{ width: "350px" }} variant="filled">
                  <InputLabel>Practice Frequency</InputLabel>
                  <Select
                    labelId="freq"
                    id="freq"
                    name="freq"
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
                  name='date'
                  label="Goal Date"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formValues.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "350px" }}
                  id="goal_description"
                  name="description"
                  label="Goal Description"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="filled"
                  onChange={handleChange}
                  value={formValues.description}
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