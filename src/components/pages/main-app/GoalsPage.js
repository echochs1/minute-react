import React from "react";
import { Form, Input, Select, DatePicker, Button, Checkbox, message } from 'antd';

// const tips = "Tips: You can add multiple goals by clicking the 'Add Goal' button below.";
const tips = "We recommend you practice daily, but you can also practice twice a day, twice a week, or once a week.";

const Goals = () => {
    return (
        <div>
            <h1>Goals</h1>
            <Form>
                <Form.Item label="Goal Name:">
                    <Input placeholder="Demo Day Presentation" />
                </Form.Item>
                <Form.Item label="Goal Description:">
                    <Input.TextArea placeholder="Need to cut fillers in first 1 min pitch!" />
                </Form.Item>
                <Form.Item label="Goal Date:">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Practice Frequency:" help={tips}>
                    <Select defaultValue="None">
                        <Select.Option value="None">None</Select.Option>
                        <Select.Option value="Twice a day">Twice a day</Select.Option>
                        <Select.Option value="Daily">Daily</Select.Option>
                        <Select.Option value="Twice a week">Twice a week</Select.Option>
                        <Select.Option value="Weekly">Weekly</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Submit">
                    <Button type="primary" htmlType="submit">
                        Add Goal
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Goals;