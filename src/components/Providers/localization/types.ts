export type Locale = (
    'en-US' |
    'zh-CN' |
    'zh-TW' |
	'ja-JP'
)

export type Messages = {
    'main.localhostIsNull': string
    'main.downloadTitle': string
    'unlock.title': string
    'passcodeInput.incorrect.error': string
}

export type MessagesByLocale = Record<Locale, Messages>