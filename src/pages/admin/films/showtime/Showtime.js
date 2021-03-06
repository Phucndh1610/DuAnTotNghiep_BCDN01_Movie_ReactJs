import React, { useEffect } from 'react';
import { Form, Button, Select } from 'antd';
import { useFormik } from 'formik';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinCumRapAction, layThongTinHeThongRapAction, taoLichChieuAction } from '../../../../redux/action/QuanLyRapAction';

export default function Showtime(props) {
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: (values) => {
            console.log('values',values);
            dispatch(taoLichChieuAction(values));
        }
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layThongTinHeThongRapAction());
    },[]) 
    const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer);
    const {thongTinCumRap} = useSelector(state => state.QuanLyRapReducer);
    console.log(heThongRapChieu);
    const handleChangeHeThongRap = (value) => {
        dispatch(layThongTinCumRapAction(value));
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    }

    const convertSelectHTR = () => {
        return heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }

    let movie = {};
    if (localStorage.getItem('filmParams')) {
        movie = JSON.parse(localStorage.getItem('filmParams'));
    }

    return (
        <div className="container">
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap ' }}>
                <div className="title">
                    <h3 className="text-2xl">T???o l???ch chi???u - {movie.tenPhim}</h3>
                    <img src={movie.hinhAnh} alt='...' width={300} height={300} />
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onSubmitCapture={formik.handleSubmit}
                    style={{ width: '85%', paddingTop: '50px' }}
                >
                    <Form.Item label="H??? th???ng r???p">
                        <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Ch???n h??? th???ng r???p" />
                    </Form.Item>
                    <Form.Item label="C???m r???p">
                        <Select options={thongTinCumRap?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} placeholder="Ch???n c???m r???p" onChange={handleChangeCumRap} />
                    </Form.Item>

                    <Form.Item label="Ng??y chi???u gi??? chi???u">
                        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                    </Form.Item>

                    <Form.Item label="Gi?? v??">
                        <InputNumber min={75000} max={150000} onChange={onchangeInputNumber} />
                    </Form.Item>
                    <Form.Item label="Ch???c n??ng">
                        <Button htmlType="submit">T???o l???ch chi???u</Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
