import React, { useState } from 'react';
import { Form, Input, Button, Radio, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const Cars = () => {
  const [form] = Form.useForm();
  const [maxUploads, setMaxUploads] = useState(1);
  const [fileList, setFileList] = useState([]);

  const handleCopiesChange = value => {
    setMaxUploads(parseInt(value, 10));
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('model', values.model);
      formData.append('price', values.price);
      formData.append('phone', values.phone);
      formData.append('city', values.city);
      formData.append('copies', values.copies);
      fileList.forEach(file => {
        formData.append('pictures', file.originFileObj);
      });

      const response = await axios.post(
        'http://localhost:8080/v1/cars/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        message.success('Car details submitted successfully!');
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          'Failed to create car. Please try again.'
      );
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Add Car</h2>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{
          city: 'Lahore',
          copies: '1'
        }}
      >
        <Form.Item
          label='Car Model:'
          name='model'
          rules={[{ required: true, message: 'Please enter car model!' }]}
        >
          <Input placeholder='Enter car model' />
        </Form.Item>
        <Form.Item
          label='Price:'
          name='price'
          rules={[{ required: true, message: 'Please enter price!' }]}
        >
          <Input placeholder='Enter price' type='number' />
        </Form.Item>
        <Form.Item
          label='Phone:'
          name='phone'
          rules={[{ required: true, message: 'Please enter phone number!' }]}
        >
          <Input placeholder='Enter phone number' type='tel' />
        </Form.Item>
        <Form.Item
          label='City:'
          name='city'
          rules={[{ required: true, message: 'Please select a city!' }]}
        >
          <Radio.Group>
            <Radio value='Lahore'>Lahore</Radio>
            <Radio value='Karachi'>Karachi</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='No. of copies:'
          name='copies'
          rules={[
            { required: true, message: 'Please select the number of copies!' }
          ]}
        >
          <Select onChange={handleCopiesChange}>
            <Select.Option value='1'>1</Select.Option>
            <Select.Option value='2'>2</Select.Option>
            <Select.Option value='3'>3</Select.Option>
            <Select.Option value='4'>4</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Upload Pictures:' name='pictures'>
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            multiple
            listType='picture-card'
            maxCount={maxUploads}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Add Pictures</div>
            </div>
          </Upload>
        </Form.Item>
        <Button type='primary' htmlType='submit' block>
          Add Car
        </Button>
      </Form>
    </div>
  );
};

export default Cars;
