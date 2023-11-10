import {useTypedSelector} from '../store'
import {useDispatch} from 'react-redux'
import {
    createClientProfile as createClientProfileActionCreator,
    deleteClientDevice as deleteClientDeviceActionCreator,
    setActiveProfile as setActiveProfileActionCreator,
    setClientDevices as setClientDevicesActionCreator,
    setClientProfiles as setClientProfilesActionCreator,
    setHasContainer as setHasContainerActionCreator,
    setHasNotification as setHasNoticationActionCreator,
    setHasUpdateAvailable as setHasUpdateAvailableActionCreator,
    setIsDrawerOpen as setIsDrawerOpenActionCreator,
    setIsModalOpen as setIsModalOpenActionCreator,
    setIsPlatformLoading as setIsPlatformLoadingActionCreator,
    setIsTouchDevice as setIsTouchDeviceActionCreator,
    setIsUnlocked as setIsUnlockedActionCreator,
    setLocale as setLocaleActionCreator,
    setNetworkState as setNetworkStateActionCreator,
    setNetworkStrength as setNetworkStrengthActionCreator,
    setShowOverlay as setShowOverlayActionCreator,
    setWindowInnerSize as setWindowInnerSizeActionCreator,
    setWorkerServiceIsInitialized,
    updateClientDevice as updateClientDeviceActionCreator,
    updateClientProfile as updateClientProfileActionCreator,
	setShowGuide as _setShowGuide,
	setShowAppStore as _setShowAppStore,
    setShowBlockScan as _setShowBlockScan
} from './appStateActions'

import {Locale} from '../../components/Providers/localization/types'

import {
    ClientProfiles,
    DeviceData,
    ModalNames,
    NetworkStates,
    NetworkStrength,
    PlatformLoadingTypes,
    ProfileData
} from "./appStateReducer"

export type WindowInnerSize = {
    width: number,
    height: number
}

const useAppState = () => {
    const dispatch = useDispatch()


	const showGuide = useTypedSelector(state => state.appState.showGuide)


	const setShowGuide = (showguide: boolean ) => {
		dispatch (_setShowGuide(showguide))
	}

    const showBlockScan = useTypedSelector(state => state.appState.showBlockScan)
    
	const setShowBlockScan = (showBlockScan: boolean ) => {
		dispatch (_setShowBlockScan(showBlockScan))
	}

	const showAppStore = useTypedSelector(state => state.appState.showAppStore)
    
	const setShowAppStore = (showAppStore: boolean ) => {
		dispatch (_setShowAppStore(showAppStore))
	}

    const isInitialized = useTypedSelector(state => state.appState.workerServiceIsInitialized)
    const isInitializing = !isInitialized

    const isPlatformLoading = useTypedSelector(state => state.appState.isPlatformLoading)
    const setIsPlatformLoading = (type: PlatformLoadingTypes) => {
        dispatch(setIsPlatformLoadingActionCreator(type))
    }

    const isUnlocked = useTypedSelector(state => state.appState.isUnlocked)
    const isLocked = !isUnlocked

    const setIsUnlocked = (isUnlocked: boolean) => {
        dispatch(setIsUnlockedActionCreator(isUnlocked))
    }

    const hasContainer = useTypedSelector(state => state.appState.hasContainer)
    const noContainer = !hasContainer

    const setHasContainer = (hasContainer: boolean) => {
        dispatch(setHasContainerActionCreator(hasContainer))
    }


    const hasNotification = useTypedSelector(state => state.appState.hasNotification)
    const setHasNotification = (hasNotification: boolean) => {
        dispatch(setHasNoticationActionCreator(hasNotification))
    }

    // TESTING PURPOSES ONLY
    const setInitialized = (initialized: boolean) => {
        dispatch(setWorkerServiceIsInitialized(initialized))
    }

    // TESTING PURPOSES ONLY

    const networkState = useTypedSelector(state => state.appState.networkState)
    const setNetworkState = (networkState: NetworkStates) => {
        dispatch(setNetworkStateActionCreator(networkState))
    }

    const networkStrength = useTypedSelector(state => state.appState.networkStrength)
    const setNetworkStrength = (networkStrength: NetworkStrength) => {
        dispatch(setNetworkStrengthActionCreator(networkStrength))
    }

    const activeProfile = useTypedSelector(state => state.appState.activeProfile)
	
    const setActiveProfile = (profile: ProfileData) => {
        dispatch(setActiveProfileActionCreator(profile))
    }

    const clientProfiles = useTypedSelector(state => state.appState.clientProfiles)
	
    const setClientProfiles = (clientProfiles: ClientProfiles) => {
        const primaryProfile = Object.values(clientProfiles).filter(profile => profile.isPrimary)
        if (primaryProfile.length) {
            setActiveProfile(primaryProfile[0])
        }
        dispatch(setClientProfilesActionCreator(clientProfiles))
    }

    const clientDevices = useTypedSelector(state => state.appState.clientDevices)
    const setClientDevices = (clientDevices: { [deviceId: string]: DeviceData }) => {
        dispatch(setClientDevicesActionCreator(clientDevices))
    }

    const updateClientDevice = (deviceId: string, deviceData: DeviceData) => {
        dispatch(updateClientDeviceActionCreator(deviceId, deviceData))
    }

    const deleteClientDevice = (deviceId: string) => {
        dispatch(deleteClientDeviceActionCreator(deviceId))
    }


    const locale = useTypedSelector(state => state.appState.locale)

    const setLocale = (locale: Locale) => {
        dispatch(setLocaleActionCreator(locale))
    }

    const isTouchDevice = useTypedSelector(state => state.appState.isTouchDevice)
    const setIsTouchDevice = (isTouchDevice: boolean) => {
        dispatch(setIsTouchDeviceActionCreator(isTouchDevice))
    }

    const isModalOpen = useTypedSelector(state => state.appState.isModalOpen)





    const isDrawerOpen = useTypedSelector(state => state.appState.isDrawerOpen)
    const setIsDrawerOpen = (openDrawer: boolean) => {
        dispatch(setIsDrawerOpenActionCreator(openDrawer))
    }

    const hasUpdateAvailable = useTypedSelector(state => state.appState.hasUpdateAvailable)
    const setHasUpdateAvailable = (hasUpdateAvailable: boolean) => {
        dispatch(setHasUpdateAvailableActionCreator(hasUpdateAvailable))
    }

    return {
		showGuide,
		showAppStore,
        showBlockScan,
        isInitialized,
        isInitializing,
        isPlatformLoading,
        setIsPlatformLoading,
        hasContainer,
        noContainer,
        setHasContainer,
        hasNotification,
        setHasNotification,
        networkStrength,
        setNetworkStrength,
        setInitialized,
        isUnlocked,
        isLocked,
        setIsUnlocked,
        networkState,
        setNetworkState,
        locale,
        setLocale,
        isTouchDevice,
        setIsTouchDevice,
        isDrawerOpen,
        setIsDrawerOpen,
        hasUpdateAvailable,
        setHasUpdateAvailable,
        isModalOpen,
        clientProfiles,
        setClientProfiles,
        activeProfile,
        setActiveProfile,
        clientDevices,
        setClientDevices,
        updateClientDevice,
        deleteClientDevice,
		setShowGuide,
		setShowAppStore,
        setShowBlockScan
    }
}

export default useAppState
