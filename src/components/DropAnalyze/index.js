import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CardMedia, Grid, IconButton, TextField} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import {makeStyles} from "@material-ui/core/styles";
import ReactECharts from 'echarts-for-react';

import { getVirtulData } from './utils';

import coronationRingImg from '../../assets/item/coronationRing.jpg';
import intricacyRingImg from '../../assets/item/intricacyRing.jpg';
import lineageRingImg from '../../assets/item/lineageRing.jpg';
import goldBrickImg from '../../assets/item/goldBrick.jpg';

const PROTO_BAHAMUT = 0; // 大巴
const AKASHA = 1; // akx
const GRAND_ORDER = 2; // 大公

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        padding: 10
    },
    card: {
        display: "flex",
        padding: 10,

        margin: "auto",
        [theme.breakpoints.up("sm")]: {
            flex: 1,
            margin: 5
        }
    },
    image: {
        width: "auto",
        height: "auto",
        margin: "auto",
        maxWidth: "25%",
        maxHeight: 86.776
    }
}));

export default function DropAnalyze(props) {
    const [coronationRing, setCoronationRing] = useState(0);
    const [lineageRing, setLineageRing] = useState(0);
    const [intricacyRing, setIntricacyRing] = useState(0);
    const [goldBrick, setGoldBrick] = useState(0);

    useEffect(() => {
        // todo 分类记录
        let state = JSON.parse(localStorage.getItem("DropAnalyze"));
        if (state !== null) {
            setCoronationRing(state.coronationRing);
            setLineageRing(state.lineageRing);
            setIntricacyRing(state.intricacyRing);
            setGoldBrick(state.goldBrick);
        }
    }, []);

    useEffect(() => {
        let state = {
            coronationRing: coronationRing, // 普通戒指
            lineageRing: lineageRing, // 黑戒指
            intricacyRing: intricacyRing, // 红戒指
            goldBrick: goldBrick // 金
        };
        localStorage.setItem("DropAnalyze", JSON.stringify(state));
    }, [coronationRing, lineageRing, intricacyRing, goldBrick]);

    const classes = useStyles();

    const options = {
        title: {
            top: 30,
            left: 'center',
            text: 'Daily Step Count'
        },
        tooltip: {},
        visualMap: {
            min: 0,
            max: 20,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2016',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getVirtulData('2022')
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={coronationRingImg}
                        className={classes.image}
                    />
                    <CardContent>
                        <Grid container spacing={1} direction="row">
                            <Grid item sx={4}>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            <Grid item sx={4}>
                                <TextField
                                    name="coronationRing"
                                    helperText="普通戒指"
                                    value={coronationRing}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={e => {
                                        setCoronationRing(Number(e.target.value));
                                    }}
                                />
                            </Grid>
                            <Grid item sx={4}>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={lineageRingImg}
                        className={classes.image}
                    />
                    <CardContent>
                        <TextField
                            name="lineageRing"
                            label="黑戒指"
                            variant="standard"
                            value={lineageRing}
                            onChange={e => {
                                setLineageRing(Number(e.target.value));
                            }}
                        />
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={intricacyRingImg}
                        className={classes.image}
                    />
                    <CardContent>
                        <TextField
                            name="intricacyRing"
                            label="红戒指"
                            variant="standard"
                            value={intricacyRing}
                            onChange={e => {
                                setIntricacyRing(Number(e.target.value));
                            }}
                        />
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={goldBrickImg}
                        className={classes.image}
                    />
                    <CardContent>
                        <TextField
                            name="goldBrick"
                            label="FFJ"
                            variant="standard"
                            value={goldBrick}
                            onChange={e => {
                                setGoldBrick(Number(e.target.value));
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <ReactECharts option={options}/>
            </Grid>
        </Grid>
    );
}
