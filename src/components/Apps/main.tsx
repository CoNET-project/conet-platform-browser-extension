import { createTheme, ThemeProvider, makeStyles, rgbToHex } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import styledCom from "styled-components"
import CircularProgress from '@mui/material/CircularProgress'
import Typography, {TypographyProps} from '@mui/material/Typography'
import { useIntl } from "react-intl"
import React, {HTMLAttributes, useState, useEffect} from "react"
import Button from '@mui/material/Button'
import red from '@mui/material/colors/red'
import SvgIcon from '@mui/material/SvgIcon'
import {US, CN, JP, TW} from 'country-flag-icons/react/3x2'
import { postPasscode, testLocalServer } from '../../API/index'
import type {WorkerCommand} from '../../API/index'
import useAppState from '../../store/appState/useAppState'
import logo from '../../assets/icons/CoNET_logoV41500.png'
import Collapse from '@mui/material/Collapse'
import WindowSharpIcon from '@mui/icons-material/WindowSharp'
import TextField from '@mui/material/TextField'
import AppleIcon from '@mui/icons-material/Apple'
import grey from '@mui/material/colors/grey'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import BottomNavigation from '@mui/material/BottomNavigation'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@mui/material/colors'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import Icon from '@mdi/react'
import { mdiOpenSourceInitiative } from '@mdi/js'
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial'
import {Locale} from "../Providers/localization/types"
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { logger } from '../../logger'

type action = {
    icon: JSX.Element
    name: Locale
}

const themeTopArea1 = createTheme ({
    typography: {
        h3: {
            'fontWeight': '600'
        },
        h4: {
            'fontWeight': '600'
        },
        h6: {
            color: 'rgba(0,0,0,0.6)'
        },
        fontFamily: [
            'Inter',
            '"Inter Placeholder"',
            'sans-serif',
        ].join(','),
    },
})

const HeadLogo = styledCom.img`
    width: 3rem;
`
const DownloadIconSpan = styledCom.span`
    color: #e0e0e0;
    cursor: pointer;
`
const LanguageFlag = styledCom.div`
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
`
const ItemContainer = styled(Box)(({ theme }) => ({
    paddingBottom: '1rem',
    overflow: "auto",
    maxHeight: '100%',
    width: '100%'
}))

const actions: action[] = [
    { icon: <SvgIcon component={JP} inheritViewBox/>, name: 'ja-JP' },
    { icon: <SvgIcon component={CN} inheritViewBox/>, name: 'zh-CN' },
    { icon: <SvgIcon component={TW} inheritViewBox/>, name: 'zh-TW' },
    { icon: <SvgIcon component={US} inheritViewBox/>, name: 'en-US' }
]

const ItemTopArea1 = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    borderRadius: 0,
    textAlign: 'left',
    background: 'linear-gradient(180deg,#080213 0%,hsl(253,79%,15%))',
    paddingBottom: '2rem',
    height: '8rem'
}))

const ItemTopArea2 = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    borderRadius: 0,
    textAlign: 'center',
    paddingBottom: '2rem',
}))


const HeaderArea = (locale: any, setLocale: (k:any)=> void) => {
    return (
        <ThemeProvider theme={themeTopArea1}>
             <Grid container spacing={0} >
                <Grid item xs={12}>
                    <ItemTopArea1 elevation={0}>
                        <HeadLogo src={logo} />
                        
                        <Typography variant="h5" sx={{ fontWeight: '900', textAlign:'center', color: grey[200]}}>
                            CONET
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: '700', textAlign:'center', letterSpacing: '0.2rem', color: grey[200]}}>
                            PROXY
                        </Typography>
                    </ItemTopArea1>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>

             </Grid>
        </ThemeProvider>
    )
}

const downloadConet = ((event: React.SyntheticEvent<Element, Event>, newValue: any) =>{
    console.log (newValue)
    switch (newValue) {
        case 0: {
            return window.open(`https://github.com/CoNET-project/seguro-platform/releases/download/0.0.1/CONET-0.61.0.exe`)
        }
        case 1: {
            return window.open(`https://github.com/CoNET-project/seguro-platform/releases/download/0.0.1/CONET-0.61.0-Apple-M-Series-cpu.dmg`)
        }
        default: {
            return window.open(`https://github.com/CoNET-project/seguro-platform/releases/download/0.0.1/CONET-0.61.0-Inter-CPU.dmg`)
        }
    }
})

const DownloadArea = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                onChange = {downloadConet}
            >
                <BottomNavigationAction label="Windows" icon={<WindowSharpIcon />} />
                <BottomNavigationAction label="Apple M" icon={<AppleIcon />} />
                <BottomNavigationAction label="Apple" icon={<AppleIcon />} />
            </BottomNavigation>

        </Paper>
    )
    
}

const InputCom = styledCom.input`
    width: 100%
`
const ShowArea = (result: null|boolean) => {
    const intl = useIntl()
    return (
        <Grid container spacing={0} sx={{ padding: '1rem', textAlign: 'center'}}>
            
                {
                    result === null &&
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: '500', textAlign:'center', paddingTop: '2rem', color: red[900]}}>
                            {intl.formatMessage({id: 'main.localhostIsNull'})}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: '500', fontSize: '1rem', textAlign:'center', color: grey[600]}}>
                            {intl.formatMessage({id: 'main.downloadTitle'})}
                        </Typography>
                        
                     </Grid>
                    
                }
                
                

        </Grid>
    )
}

const configProxy = {
    mode: "fixed_servers",
    rules: {
        
        singleProxy: {
            scheme: "socks5",
            host: "localhost",
            port: 3003
        },
    //   bypassList: [
    //     "<local>",
    //     "<-loopback>",
    //     "*.localhost",
    //     "localhost",
    //     "127.0.0.1/8",
    //     "169.254/16"
    // ]
    }
}

const configProxyRelease = {
    mode: "direct"
}

const Main = () => {

    const { locale, setLocale } = useAppState()
    const [passcodeInput, setPasscodeInput] = useState ('')
    const [process, SetProcess] = useState (false)
    const [passcodeInputError, setPasscodeInputError] = useState (false)
    const [passcodePass, setPasscodePass] = useState (false)
    const [success, setSuccess] = useState (false)
    const [testLocalHost, setTestLocalHost] = useState<null|boolean>(null)
    const [testLocalLoading, setTestLocalLoading] = useState(false)
    const fetchData = async () => {
        setTestLocalLoading(true)
        const test = await testLocalServer()
        setTestLocalLoading (false)
        setTestLocalHost (test)
        if (test=== true) {
            if (typeof chrome.proxy?.settings?.set === 'function') {
                chrome.proxy.settings.set(
                    {value: configProxyRelease, scope: 'regular'}
                )
            } else {
                logger(`chrome.proxy.settings is undefine!`)
            }
                
        }
        
    }
    useEffect(() => {
        fetchData()
    }, [])
    const timer = React.useRef<number>()
    const buttonSx = {
        ...(process && {
          bgcolor: grey[400],
          '&:hover': {
            bgcolor: grey[600],
          }
        }),
        
        width: '100px',
        height: '100px'
        
    }

    const passcode = ( async () => {

        SetProcess(true)
        const result = await postPasscode(passcodeInput)
        SetProcess(false)
        if (result === null ) {
            return setPasscodeInputError(true)
        }
        if (typeof result === 'boolean') {
            if (!result) {
                return setPasscodeInputError(true)
            }
            setTestLocalHost (true)
            return setPasscodePass(true)
        }
        const uu: WorkerCommand = result

        if (uu.err) {
            console.log (`Passcode Error!`, uu)
            return setPasscodeInputError(true)
        }
        setTestLocalHost (true)
        return setPasscodePass(true)
    })

    const intl = useIntl()

    const handleButtonClick = () => {

    }
    const toggleProxy = () => {
        if (!process) {
            
            SetProcess(true)
            timer.current = window.setTimeout(() => {
                
                if (success) {
                    chrome.proxy.settings.set(
                        {value: configProxyRelease, scope: 'regular'}
                    )
                } else {
                    chrome.proxy.settings.set(
                        {value: configProxy, scope: 'regular'}
                    )
                }
                setSuccess(!success)
                SetProcess(false)
            }, 500)
        }
    }

    const showLocationIcon = () => {
        switch(locale) {
            default:
            case 'en-US': {
                return (
                    <SvgIcon component={US} inheritViewBox/>
                )
            }
            case 'ja-JP': {
                return (
                    <SvgIcon component={JP} inheritViewBox/>
                )
            }
            case 'zh-CN': {
                return (
                    <SvgIcon component={CN} inheritViewBox/>
                )
            }
            case 'zh-TW': {
                return (
                    <SvgIcon component={TW} inheritViewBox/>
                )
            }
        }
    }

    const powerButton = (show: null|boolean) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                {
                    show &&
                    <Box sx={{ m: 1, position: 'relative',  }}>
                        <Fab
                            aria-label="save"
                            color={success? 'primary': 'default'}
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? <CheckIcon fontSize='large' /> : <SettingsEthernetIcon fontSize='large'/>}
                        </Fab>
                        { process && (
                            <CircularProgress
                                size={113}
                                sx={{
                                color: green[50],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                                }}
                            />
                        )}
                    </Box>
                }
                
            </Box>
        )
    }

    return (
        
        <ThemeProvider theme={themeTopArea1} >
            
            <ItemContainer>
                <Box sx={{ position: 'absolute', mt: 0, top: '18rem', right: '1rem'}}>
                    <SpeedDial
                        ariaLabel="Language"
                        sx={{ position: 'absolute', bottom: 16, right: 16 , backgroundColor: 'rgba(0,0,0,0)'}}
                        icon={showLocationIcon()}
                        direction='down'
                        
                    >
                        {actions.map(action => (
                            
                            locale !== action.name &&
                                <SpeedDialAction
                                    sx={{backgroundColor: 'rgba(0,0,0,0)'}}
                                    key={action.name}
                                    icon={action.icon}
                                    onClick={(n) => setLocale (action.name)}
                                    tooltipTitle={action.name}/>
                                    
                        ))}
                    </SpeedDial>
                </Box>
                {HeaderArea(locale, setLocale)}
                {ShowArea(testLocalHost)}
                {
                    testLocalHost === false &&
                        <Grid container spacing={0} sx={{ padding: '4rem 1rem 3rem 1rem', textAlign: 'center'}}>
                            <Grid item xs={12}>
                               {
                                    !passcodePass &&
                                    <TextField sx={{width: '100%'}} type="password" label={passcodeInputError ? intl.formatMessage({id: 'unlock.title'}) :intl.formatMessage({id: 'unlock.title'})} 
                                        onChange= {
                                            e => {
                                                setPasscodeInputError(false)
                                                setPasscodeInput (e.target.value)
                                            }
                                        }
                                        error = {passcodeInputError}

                                        onKeyDown={ e=> {
                                            if (e.key === 'Enter') {
                                                passcode()
                                            }
                                        }}
                                    />
                                    
                                }
                                
                                {
                                    !passcodePass && process &&
                                        <Box sx={{ display: 'block', textAlign: 'center', width: '100%' }}>
                                            <CircularProgress disableShrink/>
                                        </Box>
                                }
                                
                            </Grid>
                            
                        </Grid>
                }
                {powerButton(testLocalHost)}
                
                {/* <Button onClick={fetchData}>
                    fetchData
                </Button> */}
                            
                <DownloadArea/>
            </ItemContainer>
        </ThemeProvider>
    )
}

export default Main