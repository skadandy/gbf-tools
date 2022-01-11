import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardMedia, Grid, IconButton, TextField} from "@material-ui/core";
import {AddBox, IndeterminateCheckBox} from "@material-ui/icons";

const itemImage = require.context("../../assets/item", true);

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

export default function ItemCounterComponent(props) {
    const [count, setCount] = useState(0);
    const dropImg = itemImage("./" + props.dropItem + ".jpg");

    useEffect(() => {
        // todo 分类记录
        let state = JSON.parse(localStorage.getItem(props.dropType + "DropAnalyze"));
        if (state !== null) {
            setCount(state.count);
        }
    }, []);

    useEffect(() => {
        let state = {
            count: count,
        };
        localStorage.setItem(props.dropType + "DropAnalyze", JSON.stringify(state));
    }, [count]);

    const classes = useStyles();

    return (<Card className={classes.card}>
        <CardMedia
            component="img"
            image={dropImg}
            className={classes.image}
            onClick={event => {
                setCount(count + 1)
            }}
        />
        <CardContent>
            <Grid container spacing={1} direction="row">
                <Grid item sx={4}>
                    <IconButton aria-label="增加">
                        <AddBox onClick={event => {
                            setCount(count + 1)
                        }}/>
                    </IconButton>
                </Grid>
                <Grid item sx={3}>
                    <TextField
                        className={classes.inputText}
                        name="coronationRing"
                        value={count}
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        onChange={e => {
                            setCount(Number(e.target.value));
                        }}
                    />
                </Grid>
                <Grid item sx={3}>
                    <IconButton aria-label="减少">
                        <IndeterminateCheckBox onClick={event => {
                            if (count > 0) setCount(count - 1)
                        }}/>
                    </IconButton>
                </Grid>
            </Grid>
        </CardContent>
    </Card>);
}
