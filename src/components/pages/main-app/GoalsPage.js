// RESOURCES
// https://ant.design/components/form/#components-form-demo-time-related-controls

import React from "react";
import { Form, Input, Select, DatePicker, Button } from 'antd';

// const tips = "Tips: You can add multiple goals by clicking the 'Add Goal' button below.";
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
  

const Goals = () => {
    return (
        <div>
            <h1>Goals</h1>
            <Form
                {...layout}>
                <Form.Item
                    name="goal_name"
                    label="Goal Name:"
                    rules={[
                        {
                          required: true,
                        },
                      ]}>
                    <Input placeholder="Demo Day Presentation" />
                </Form.Item>
                <Form.Item
                    name="goal_type"
                    label="Goal Description:">
                    <Input.TextArea placeholder="Need to cut fillers in first 1 min pitch!" />
                </Form.Item>
                <Form.Item
                    name="goal_date"
                    label="Goal Date:"
                    // rules={[
                    //     {
                    //       required: true,
                    //     },
                    //   ]}
                    >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="goal_freq"
                    label="Practice Frequency:"
                    help={tips}
                    rules={[
                        {
                          required: true,
                        },
                      ]}>
                    <Select>
                        <Option value="None">None</Option>
                        <Option value="Twice a day">Twice a day</Option>
                        <Option value="Daily">Daily</Option>
                        <Option value="Twice a week">Twice a week</Option>
                        <Option value="Weekly">Weekly</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Add Goal
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Goals;