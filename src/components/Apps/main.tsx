import { createTheme, ThemeProvider, makeStyles, rgbToHex } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import styledCom from "styled-components"
import CircularProgress from '@mui/material/CircularProgress'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { useIntl } from "react-intl"
import React, { HTMLAttributes, useState, useEffect } from "react"
import Button from '@mui/material/Button'
import red from '@mui/material/colors/red'
import SvgIcon from '@mui/material/SvgIcon'
import { US, CN, JP, TW } from 'country-flag-icons/react/3x2'
import { postPasscode, testLocalServer } from '../../API/index'
import type { WorkerCommand } from '../../API/index'
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
import { Locale } from "../Providers/localization/types"
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { logger } from '../../logger'

import windowsLogoWhite from '../../assets/icons/windows-logo.svg'
import linuxLogoWhite from '../../assets/icons/linux.svg'
import appleLogoWhite from '../../assets/icons/Apple.svg'
import powerOn from '../../assets/icons/power-on.svg'
import powerOff from '../../assets/icons/power-off.svg'

type action = {
    icon: JSX.Element
    name: Locale
}

const themeTopArea1 = createTheme({
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
    }
})

const HeadLogo = styledCom.img`
    width: 36px;
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
    backgroundColor: '#0D0D0D',
    overflow: "auto",
    minHeight: '100%',
    maxHeight: '100%',
    width: '100%'
}))

const actions: action[] = [
    { icon: <SvgIcon component={JP} inheritViewBox />, name: 'ja-JP' },
    { icon: <SvgIcon component={CN} inheritViewBox />, name: 'zh-CN' },
    { icon: <SvgIcon component={TW} inheritViewBox />, name: 'zh-TW' },
    { icon: <SvgIcon component={US} inheritViewBox />, name: 'en-US' }
]

const ItemTopArea1 = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    borderRadius: 0,
    textAlign: 'left',
    // background: 'linear-gradient(180deg,#080213 0%,hsl(253,79%,15%))',
    paddingBottom: '2rem',
    height: '8rem',
    background: '#0D0D0D'
}))

const ItemTopArea2 = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    borderRadius: 0,
    textAlign: 'center',
    paddingBottom: '2rem',
}))


const HeaderArea = (locale: any, setLocale: (k: any) => void) => {
    return (
        <ThemeProvider theme={themeTopArea1}>
            <Grid style={{ background: "#000" }} container spacing={0}>
                <Grid style={{ background: "#000" }} item xs={12}>
                    <ItemTopArea1 elevation={0}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '40px' }}>
                            <HeadLogo src={logo} />
                            <Typography color={'#fff'} fontSize={"12px"}>
                                Language
                            </Typography>
                        </Box>
                        <Box style={{ display: "flex", marginTop: '16px' }} gap={1} justifyContent={'center'}>
                            <Typography variant="h5" sx={{ fontWeight: '900', textAlign: 'center', color: grey[200] }}>
                                Silent
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: '900', textAlign: 'center', color: '#8DA8FF' }}>
                                Pass
                            </Typography>
                        </Box>
                    </ItemTopArea1>
                </Grid>
                <Grid item xs={12}>

                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

const downloadConet = ((event: React.SyntheticEvent<Element, Event>, newValue: any) => {
    console.log(newValue)
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
        <Paper sx={{ position: 'fixed', bottom: '8px', left: 0, right: 0, backgroundColor: '#0D0D0D' }} elevation={3}>
            <Typography sx={{ fontWeight: '400', fontSize: "16px", textAlign: 'center', color: '#f6f1f2', marginBottom: '16px' }}>Download and start it</Typography>

            <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'4px'}>
                <Box onClick={(e) => downloadConet(e, 0)} sx={{ border: '1px solid #4C4C4C', backgroundColor: "#191919", borderRadius: '8px', width: '93px', height: '68px', padding: '8px', cursor: 'pointer' }}>
                    <img src={windowsLogoWhite} alt='logo' width={'24px'} />
                    <Typography color={'#fff'} fontSize={'14px'} fontWeight={500} marginTop={'8px'}>Windows</Typography>
                </Box>
                <Box onClick={(e) => downloadConet(e, 1)} sx={{ border: '1px solid #4C4C4C', backgroundColor: "#191919", borderRadius: '8px', width: '93px', height: '68px', padding: '8px', cursor: 'pointer' }}>
                    <img src={appleLogoWhite} alt='logo' width={'24px'} />
                    <Typography color={'#fff'} fontSize={'14px'} fontWeight={500} marginTop={'8px'}>Apple</Typography>
                </Box>
                <Box onClick={(e) => downloadConet(e, 2)} sx={{ border: '1px solid #4C4C4C', backgroundColor: "#191919", borderRadius: '8px', width: '93px', height: '68px', padding: '8px', cursor: 'pointer' }}>
                    <img src={linuxLogoWhite} alt='logo' width={'24px'} />
                    <Typography color={'#fff'} fontSize={'14px'} fontWeight={500} marginTop={'8px'}>Linux amd</Typography>
                </Box>
                <Box onClick={(e) => downloadConet(e, 2)} sx={{ border: '1px solid #4C4C4C', backgroundColor: "#191919", borderRadius: '8px', width: '93px', height: '68px', padding: '8px', cursor: 'pointer' }}>
                    <img src={linuxLogoWhite} alt='logo' width={'24px'} />
                    <Typography color={'#fff'} fontSize={'14px'} fontWeight={500} marginTop={'8px'}>Linux arm</Typography>
                </Box>
            </Stack>
        </Paper>
    )

}

const InputCom = styledCom.input`
    width: 100%
`
const ShowArea = (result: null | boolean) => {
    const intl = useIntl()
    return (
        <Grid container spacing={0} sx={{ padding: '1rem', textAlign: 'center' }}>

            {
                result === null &&
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '24px', textAlign: 'center', paddingTop: '2rem', color: '#FFB4AB' }}>
                        {intl.formatMessage({ id: 'main.localhostIsNull' })}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: '400', fontSize: '14px', textAlign: 'center', color: '#fff' }}>
                        {intl.formatMessage({ id: 'main.downloadTitle' })}
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
    const [passcodeInput, setPasscodeInput] = useState('')
    const [process, SetProcess] = useState(false)
    const [passcodeInputError, setPasscodeInputError] = useState(false)
    const [passcodePass, setPasscodePass] = useState(false)
    const [success, setSuccess] = useState(false)
    const [testLocalHost, setTestLocalHost] = useState<null | boolean>(null)
    const [testLocalLoading, setTestLocalLoading] = useState(false)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(3600)
    const [logged, setLogged] = useState<boolean>(false)

    const fetchData = async () => {
        setTestLocalLoading(true)
        const test = await testLocalServer()
        setTestLocalLoading(false)
        setTestLocalHost(test)
        if (test === true) {
            if (typeof chrome.proxy?.settings?.set === 'function') {
                chrome.proxy.settings.set(
                    { value: configProxyRelease, scope: 'regular' }
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

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const passcode = (async () => {

        SetProcess(true)
        const result = await postPasscode(passcodeInput)
        SetProcess(false)
        if (result === null) {
            return setPasscodeInputError(true)
        }
        if (typeof result === 'boolean') {
            if (!result) {
                return setPasscodeInputError(true)
            }
            setTestLocalHost(true)
            return setPasscodePass(true)
        }
        const uu: WorkerCommand = result

        if (uu.err) {
            console.log(`Passcode Error!`, uu)
            return setPasscodeInputError(true)
        }
        setTestLocalHost(true)
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
                        { value: configProxyRelease, scope: 'regular' }
                    )
                } else {
                    chrome.proxy.settings.set(
                        { value: configProxy, scope: 'regular' }
                    )
                }
                setSuccess(!success)
                SetProcess(false)
            }, 500)
        }
    }

    const showLocationIcon = () => {
        switch (locale) {
            default:
            case 'en-US': {
                return (
                    <SvgIcon component={US} inheritViewBox />
                )
            }
            case 'ja-JP': {
                return (
                    <SvgIcon component={JP} inheritViewBox />
                )
            }
            case 'zh-CN': {
                return (
                    <SvgIcon component={CN} inheritViewBox />
                )
            }
            case 'zh-TW': {
                return (
                    <SvgIcon component={TW} inheritViewBox />
                )
            }
        }
    }


    // const showLocationIcon = () => {
    //     switch(locale) {
    //         default:
    //         case 'en-US': {
    //             return US
    //         }
    //         case 'ja-JP': {
    //             return JP
    //         }
    //         case 'zh-CN': {
    //             return CN
    //         }
    //         case 'zh-TW': {
    //             return TW
    //         }
    //     }
    // }

    const powerButton = (show: null | boolean) => {

        const formatTime = (secs: number) => {
            const getHours = Math.floor(secs / 3600);
            const getMinutes = Math.floor((secs % 3600) / 60);
            const getSeconds = secs % 60;

            const hours = String(getHours).padStart(2, '0');
            const minutes = String(getMinutes).padStart(2, '0');
            const secondsStr = String(getSeconds).padStart(2, '0');

            return `${hours}:${minutes}:${secondsStr}`;
        };

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>

                <Box sx={{ m: 1, position: 'relative', }}>
                    <img
                        src={isActive ? powerOn : powerOff}
                        width={'104px'}
                        alt='on-off-button'
                        onClick={() => {
                            if (seconds > 0) {
                                setIsActive(!isActive);
                            }
                        }}
                        style={{
                            cursor: seconds > 0 ? 'pointer' : 'not-allowed',
                        }}
                    />
                    <Typography marginTop={'24px'} color={isActive ? '#79F8FF' : '#F6F1F2'} fontSize={'24px'} fontWeight={700}>{isActive ? 'Connected' : 'Not connected'}</Typography>
                    <Stack marginTop={'16px'}>
                        <Typography color={isActive ? '#fff' : '#F6F1F2'} fontWeight={400} fontSize={'28px'}>{seconds > 0 ? formatTime(seconds) : 'Time expired'}</Typography>
                        <Typography color={'#F6F1F2'} fontSize={'12px'} fontWeight={500}>{isActive ? 'Time Left' : seconds > 0 ? 'not started' : ''}</Typography>
                    </Stack>
                    <Typography marginTop={'24px'} color={'#fff'} fontSize={'16px'} fontWeight={400}>{isActive ? 'You can buy more time on the platform' : 'Start connection on the platform'}</Typography>
                    {/*                         <Fab
                            aria-label="save"
                            color={success ? 'primary' : 'default'}
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? <CheckIcon fontSize='large' /> : <SettingsEthernetIcon fontSize='large' />}
                        </Fab> */}
                    {process && (
                        <>
                            <img src={isActive ? powerOn : powerOff} alt='on-off-button' />
                        </>

                        /*                             <CircularProgress
                                                        size={113}
                                                        sx={{
                                                            color: green[50],
                                                            position: 'absolute',
                                                            top: -6,
                                                            left: -6,
                                                            zIndex: 1,
                                                        }}
                                                    /> */
                    )}
                </Box>


            </Box>
        )
    }
    return (

        <ThemeProvider theme={themeTopArea1}>
            <Box style={{ backgroundColor: '#0D0D0D' }}>
                <ItemContainer style={{ backgroundColor: "#0D0D0D" }}>
                    <Box sx={{ position: 'absolute', mt: 0, top: '14px', right: '8px', display: "flex", flexDirection: 'row' }}>
                        <SpeedDial
                            ariaLabel="Language"
                            sx={{
                                backgroundColor: 'transparent', // Ensure the background is transparent
                                padding: 0, // Remove any padding
                                width: 'auto', // Adjust width as necessary
                                height: 'auto', // Adjust height as necessary
                                boxShadow: 'none', // Remove any box shadow
                                borderRadius: "50%",
                                '& .MuiSpeedDialAction-staticTooltipLabel': {
                                    margin: 0, // Remove margin from tooltip labels
                                },
                                '& .MuiSpeedDialAction-staticTooltip': {
                                    margin: 0, // Remove margin from the action tooltips
                                },
                                '& svg': {
                                    borderRadius: "50%"
                                },
                                '& .Language-actions': {
                                    paddingTop: '24px'
                                }
                            }}
                            icon={showLocationIcon()}
                            direction="down"
                            FabProps={{
                                size: 'small',
                                sx: {
                                    background: 'transparent',
                                    '&:hover': {
                                        background: 'transparent',
                                        scale: 1.1
                                    },
                                    fontSize: '32px',
                                    margin: '0px'
                                }
                            }}
                        >
                            {actions.map(action => (

                                locale !== action.name &&
                                <SpeedDialAction
                                    sx={{ backgroundColor: '#0D0D0D' }}
                                    key={action.name}
                                    icon={action.icon}

                                    onClick={(n) => setLocale(action.name)}
                                    tooltipTitle={action.name}
                                    FabProps={{
                                        sx: {
                                            margin: '0px',
                                            background: 'transparent',
                                            '&:hover': {
                                                background: 'transparent',
                                                scale: 1.1
                                            },
                                        }
                                    }}
                                />

                            ))}
                        </SpeedDial>
                    </Box>

                    {HeaderArea(locale, setLocale)}
                    {ShowArea(testLocalHost)}
                    {/*
                        testLocalHost === false &&
                        <Grid container spacing={0} sx={{ padding: '4rem 1rem 3rem 1rem', textAlign: 'center' }}>
                            <Grid item xs={12}>
                                {
                                    !passcodePass &&
                                    <TextField
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': {
                                                color: '#FFF',
                                                '&:placeholder': {

                                                    color: '#FFF',
                                                },
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#4C4C4C',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#4C4C4C',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#8DA8FF',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#FF0000',
                                                },
                                            },
                                        }}
                                        type="password"
                                        label={intl.formatMessage({ id: 'unlock.title' })}
                                        placeholder='Enter CONET Platform Passcode'
                                        onChange={(e) => {
                                            setPasscodeInputError(false);
                                            setPasscodeInput(e.target.value);
                                        }}
                                        error={passcodeInputError}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                passcode();
                                            }
                                        }}
                                    />

                                }

                                {
                                    !passcodePass && process &&
                                    <Box sx={{ display: 'block', textAlign: 'center', width: '100%' }}>
                                        <CircularProgress disableShrink />
                                    </Box>
                                }

                            </Grid>

                        </Grid>
                            */}

                    {/*                     <Button onClick={fetchData}>
                        fetchData
                    </Button> */}
                    {testLocalHost === null ? < DownloadArea /> : powerButton(testLocalHost)}
                </ItemContainer>
            </Box>
        </ThemeProvider>
    )
}

export default Main