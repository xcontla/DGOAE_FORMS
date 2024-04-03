import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import QuestionForm from './QuestionForm'
import PropTypes from 'prop-types';
import Responses from './Responses'
import Summary from './Summary'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    tab: {
        fontSize: 12,
        color: '#5f6368',
        textTransform: 'capitalize',
        height: 10,
        fontWeight: "600",
        fontFamily: "Arial, Helvetica, sans-serif"
    },
    tabs: {
        height: 10
    }
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div>{children}</div>

            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function CenteredTabs() {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Paper className={classes.root}>
            <Tabs value={value} onChange={handleChange}
                textColor='primary' indicatorColor='primary' centered
                className={classes.tabs}>

                <Tab label="Edita Preguntas" className={classes.tab} {...a11yProps(0)}>

                </Tab>
                <Tab label="Respuestas" className={classes.tab} {...a11yProps(1)}>

                </Tab>
                <Tab label="Resumen de respuestas" className={classes.tab} {...a11yProps(2)}>

                </Tab>
            </Tabs>

            <TabPanel value={value} index={0}>
                <QuestionForm />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Responses />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Summary />
            </TabPanel>

        </Paper>
    )
}

export default CenteredTabs

/*
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import QuestionForm from './QuestionForm'
import PropTypes from 'prop-types';
import Responses from './Responses'
import Summary from './Summary'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    tab: {
        fontSize: 12,
        color: '#5f6368',
        textTransform: 'capitalize',
        height: 10,
        fontWeight: "600",
        fontFamily: "Arial, Helvetica, sans-serif"
    },
    tabs: {
        height: 10
    }
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div>{children}</div>

            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function CenteredTabs() {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Paper className={classes.root}>
            <Tabs value={value} onChange={handleChange}
                textColor='primary' indicatorColor='primary' centered
                className={classes.tabs}>

                <Tab label="Edita Preguntas" className={classes.tab} {...a11yProps(0)}>

                </Tab>
                <Tab label="Respuestas" className={classes.tab} {...a11yProps(1)}>

                </Tab>
                <Tab label="Resumen de respuestas" className={classes.tab} {...a11yProps(2)}>

                </Tab>
            </Tabs>

            <TabPanel value={value} index={0}>
                <QuestionForm />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Responses />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Summary />
            </TabPanel>

        </Paper>
    )
}

export default CenteredTabs;

*/
