import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Typography } from '@material-ui/core';

import styles from './Picker.module.css';


const Picker = React.forwardRef(({regions, handlePickerFunction},ref) =>{

	var oneRegionPicker = null;

	if (regions && regions.length > 0) {
		var regionDict ={}
		var regionList = regions.map((e)=>{ 
			regionDict[e.region_code] = e.region_name;
			return e.region_code;
		})
		oneRegionPicker = (
			<FormControl className={styles.form} id="dis-pic">
				<InputLabel labelId="dis-pic" >지역 선택</InputLabel>
				<Select onChange={(e)=>{handlePickerFunction(e)}}>
				{regionList.map(e=><MenuItem value={e}>{regionDict[e]}</MenuItem>)}
				</Select>
			</FormControl>
		)
	}

	const categoryPicker = (
		<FormControl className={styles.form} >
		  <InputLabel id="cat-pic">카테고리</InputLabel>
		  <Select 
				labelId="cat-pic"
				onChange={(e)=>{handlePickerFunction(e)}}
			>
			<MenuItem value={'population'}>거주 인구 수</MenuItem>
			<MenuItem value={'crime'}>범죄 발생 건수</MenuItem>    
			<MenuItem value={'house'}>평당 평균 가격</MenuItem>
			<MenuItem value={'children'}>어린이 교통사고</MenuItem>
			<MenuItem value={'fire'}>화재피해</MenuItem>
			<MenuItem value={'flood'}>홍수피해인원</MenuItem>
			<MenuItem value={'alcohol'}>음주운전사고</MenuItem>
			{/* <MenuItem value={'test'}>TEST</MenuItem> */}
		  </Select>
		</FormControl>
	)

	return (
		<div className={styles.container} ref={ref}>
			{regions ? oneRegionPicker : categoryPicker}
		</div>
	);
});
export default Picker;