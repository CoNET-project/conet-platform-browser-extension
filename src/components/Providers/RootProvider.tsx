import { ReactNode  } from 'react'
import ProviderProps from './ProviderProps'
import LocalizationProvider from './localization/LocalizationProvider'
import StoreProvider from './StoreProvider'

const RootProvider = ({
    children
}: ProviderProps) => {
    return (
        <StoreProvider>
            <LocalizationProvider>
                {children}
            </LocalizationProvider>
        </StoreProvider>
        
    )
}

export default RootProvider