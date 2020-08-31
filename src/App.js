import React, { createRef } from 'react';
import { UseSvg,Picker, DrawTable, Chart, Header
        ,RadarChart, Footer, News, Loading } from './components';


import { fetchCategoryData, fetchOneRegionData, fetchRegionDrawData
        ,fetchNewsData } from './api';

import { Typography } from '@material-ui/core';
import styles from './App.module.css';

class App extends React.Component{
    constructor(props){
        super(props)
        this.firstPickerSection = createRef()
        this.secondPickerSection = createRef()
        this.newsSection = createRef()
        this.scrollToContent = this.scrollToContent.bind(this)
    }
    state = {
        loading : false,
        regions : [],
        category :'',
        regionDatasets : [],
        drawData : [],
        newsData : [],
    };
    async componentDidMount(){
        this.setState({loading :true})
        try{
            const regions = await fetchCategoryData('population');
            const drawData = await fetchRegionDrawData();
            const newsData = await fetchNewsData();
            this.setState({
                loading : false,
                regions : regions,
                category : '거주 인구 수', // default
                drawData,
                newsData,
            })
        }catch(e){

        }
    }

    handleCategoryChange = async (e) =>{
        const category = e.target.value,
                name = e.nativeEvent.srcElement.innerText;
        this.setState({loading :true})
        try{
            const data = await fetchCategoryData(category);
            this.setState({
                loading : false,
                regions : data,
                category :name,
            })
        }catch(error){
            console.log(error)
        }
    }

    handleOneRegionData = async (e) =>{
        const regionCodeWithKR = e.target.value
        this.setState({loading :true})
        try{
            const regionDataset = await fetchOneRegionData(regionCodeWithKR);
            this.setState({
                loading : false,
                regionDatasets : this.state.regionDatasets.concat(regionDataset)
            });
        } catch (error) {
            console.log(error);
        }
    }
    scrollToContent = (content) =>{
        switch(content){
            case 0:
                this.firstPickerSection.current.scrollIntoView({block:"end", behavior:'smooth'})
                break;
            case 1:
                this.secondPickerSection.current.scrollIntoView({block:"center", behavior:'smooth'})
                break;
            case 2:
                this.newsSection.current.scrollIntoView({block:'end', behavior:'smooth'})
                break;
        }
    }
    render() {
        const { loading, regions, category, regionDatasets, drawData, newsData } = this.state; // this is better to use 

        return (
            <>
            <div className={styles.container}>
                <Header scrollToContent={this.scrollToContent}/>
                <Picker handlePickerFunction={this.handleCategoryChange} ref={this.firstPickerSection}/>
                {loading
                    ?   <Loading/>
                    :   <Typography variant="h3" align='justify'>{category}</Typography>}
                {regions.length 
                    ?
                    <>
                    <UseSvg regions={regions} category={category} drawData={drawData} />
                    <Chart regions={regions} category={category} drawData={drawData} />
                    <DrawTable regions={regions} category={category} />
                    <Picker regions={regions} handlePickerFunction={this.handleOneRegionData} />
                    </>
                    : <Loading/>
                }
                {loading
                    ?   <Loading/>
                    :   <Typography variant="h3" align='justify'>구별</Typography>}
                <RadarChart regionDatasets={regionDatasets} drawData={drawData} ref={this.secondPickerSection}/>
                <News newsData={newsData} ref={this.newsSection} />
                <Footer/>
            </div>
            </>
        )
    }
}

export default App;