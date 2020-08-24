import React from 'react';
import { UseSvg,Picker, DrawTable, Chart,MainHeader ,RadarChart, RegionPicker, Loading } from './components'

import { fetchTestData, fetchBackend, fetchOneRegionData, fetchRegionDraw} from './api';

import styles from './App.module.css';

class App extends React.Component{

    state = {
        region : [],
        category :'',
        oneRegionData : null,
        drawData : [],
    };
    async componentDidMount(){
        try{
            const regions = await fetchBackend('population');
            const drawData = await fetchRegionDraw();
            this.setState({
                region : regions,
                category : '거주 인구 수',
                drawData,
            })
        }catch(e){

        }
    }

    fetchFromBack = async() => {
        try{
            const test = await fetchBackend();
            console.log(test);
        } catch (e) {
            console.log(e);
        }
    }
    handleCategoryChange = async (e) =>{
        const category = e.target.value,
                name = e.nativeEvent.srcElement.innerText;
        if(category === 'test') {
            try{
                const data =await fetchTestData();
                console.log(data);
                this.setState({
                    region : data,
                    category : name,
                })
            }catch(e){
                
            }
        }else{
        try{
            const data = await fetchBackend(category);
            this.setState({
                region : data,
                category :name,
            })
        }catch(error){
            console.log(error)
        }
        }
    };
    handleOneRegionData = async (e) =>{
        const regionCodeWithKR = e.target.value
        try{
            const oneRegionData = await fetchOneRegionData(regionCodeWithKR);
            this.setState({
                oneRegionData
            });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const { region, category, oneRegionData, drawData} = this.state; // this is better to use 

        return (
            <div className={styles.container} id='start-point'>
                <MainHeader/>
            {drawData ? (
                <React.Fragment>
                <Picker handlePickerFunction={this.handleCategoryChange}/>
                <UseSvg region={region} category={category} drawData={drawData} />
                <Chart regions={region} category={category} drawData={drawData} />
                <DrawTable region={region} category={category}/>
                <Picker regions={region} handlePickerFunction={this.handleOneRegionData}/>
                <RadarChart oneRegionData={oneRegionData}/>
                </React.Fragment>
                )
                : <Loading which="data"/>
                }
            </div>
        )
    }
}

export default App;