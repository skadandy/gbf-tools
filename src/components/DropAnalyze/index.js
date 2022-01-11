import * as React from 'react';
import {useEffect, useState} from "react";
import ReactECharts from 'echarts-for-react';

import {getVirtulData} from './utils';

import ItemCounterComponent from "./itemCounterComponent";
import {RaidList} from "./dropItems"
import {Grid, makeStyles, Tab, Tabs} from "@material-ui/core";
import {TabPanel} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex", flexWrap: "wrap", padding: 10
    }, card: {
        display: "flex", padding: 10,

        margin: "auto", [theme.breakpoints.up("sm")]: {
            flex: 1, margin: 5
        }
    }, image: {
        width: "auto", height: "auto", margin: "auto", maxWidth: "25%", maxHeight: 86.776
    }, inputText: {
        width: 60
    }
}));

export default function DropAnalyze(props) {
    const raidList = RaidList;
    const raidNameList = Object.keys(RaidList);
    const tabList = [];
    const tabPanel = [];
    let itemList = [];
    const [raidName, setRaidName] = useState(""); // todo 默认打开

    useEffect(() => {
        // todo 分类记录
        let state = JSON.parse(localStorage.getItem("DropAnalyze"));
        if (state !== null) {
        }
    }, []);

    useEffect(() => {
        let state = {};
        localStorage.setItem("DropAnalyze", JSON.stringify(state));
    }, []);

    const classes = useStyles();

    raidNameList.map((raidName) => {
        tabList.push(<Tab key={raidName} label={raidName} value={raidName}/>)
        itemList = []
        raidList[raidName].forEach((itemName) => {
            console.log(raidName, itemName);
            itemList.push(<Grid item xs={3}><ItemCounterComponent key={raidName + itemName} dropType={raidName} dropItem={itemName}/></Grid>)
        })
        tabPanel.push(<TabPanel key={raidName} value={raidName} >{itemList}</TabPanel>)
    })

    const options = {
        title: {
            top: 30, left: 'center', text: 'Daily Step Count'
        }, tooltip: {}, visualMap: {
            min: 0, max: 20, type: 'piecewise', orient: 'horizontal', left: 'center', top: 65
        }, calendar: {
            top: 120, left: 30, right: 30, cellSize: ['auto', 13], range: '2016', itemStyle: {
                borderWidth: 0.5
            }, yearLabel: {show: false}
        }, series: {
            type: 'heatmap', coordinateSystem: 'calendar', data: getVirtulData('2022')
        }
    }

    return (<Grid container spacing={1}>
        <Grid item xs={12} className={classes.root}>
            <Tabs onChange={(event, newValue) => {
                setRaidName(newValue);
            }} aria-label="basic tabs example">
                    {tabList}
            </Tabs>
            <Grid container spacing={1} alignItems="center">
                {tabPanel}
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <ReactECharts option={options}/>
        </Grid>
    </Grid>);
}
