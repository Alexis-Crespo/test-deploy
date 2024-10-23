export enum COLORS {
  transparent = 'transparent',
  white = 'white',
  black = 'black',
  primary50 = 'primary-50',
  primary100 = 'primary-100',
  primary200 = 'primary-200',
  primary300 = 'primary-300',
  primary400 = 'primary-400',
  primary500 = 'primary-500',
  primary550 = 'primary-550',
  primary600 = 'primary-600',
  primary700 = 'primary-700',
  primary800 = 'primary-800',
  primary900 = 'primary-900',
  grey50 = 'grey-50',
  grey100 = 'grey-100',
  grey200 = 'grey-200',
  grey300 = 'grey-300',
  grey400 = 'grey-400',
  grey500 = 'grey-500',
  grey600 = 'grey-600',
  grey700 = 'grey-700',
  danger300 = 'danger-300',
  danger500 = 'danger-500',
  success300 = 'success-300',
  success500 = 'success-500',
  warning500 = 'warning-500',
  accentDark = 'accent-dark',
  primaryAccentBar = 'primary-accent-bar',
  onSurfaceText = 'on-surface-text',
  lightBlue500 = 'light-blue-500',
  violet500 = 'violet-500',
  violet200 = 'violet-200',
  violet600 = 'violet-600',
  red300 = 'red-300',
  red800 = 'red-800',
  blue500 = 'blue-500',
  blue600 = 'blue-600',
  lightBlue600 = 'light-blue-600',
  violet300 = 'violet-300',
  info500 = 'info-500',
  disabled = 'disabled'
}

export enum ICON_POSITION {
  left = 'left',
  right = 'right'
}

export enum TOOLTIP_POSITIONS {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right'
}

export enum TOOLTIP_VARIANTS {
  success = 'success',
  default = 'default'
}

export enum BG_PILL_VARIANTS {
  primary200 = COLORS.primary200,
  primary300 = COLORS.primary300,
  primary400 = COLORS.primary400,
  primary500 = COLORS.primary500,
  primary600 = COLORS.primary600,
  primary700 = COLORS.primary700,
  primary800 = COLORS.primary800,
  primary900 = COLORS.primary900,
  lightBlue500 = COLORS.lightBlue500,
  success500 = COLORS.success500,
  warning500 = COLORS.warning500,
  danger500 = COLORS.danger500,
  violet500 = COLORS.violet500,
  violet200 = COLORS.violet200,
  violet300 = COLORS.violet300,
  violet600 = COLORS.violet600,
  red300 = COLORS.red300,
  red800 = COLORS.red800,
  onSurfaceText = COLORS.onSurfaceText,
  blue500 = COLORS.blue500,
  lightBlue600 = COLORS.lightBlue600,
  blue600 = COLORS.blue600
}

// Values are the same that comes from back service
export enum TAB_NAMES {
  all = 'Todos',
  // ARG
  funds = 'Fondos',
  cautions = 'Cauciones',
  bonds = 'Bonos',
  cedears = 'Cedears',
  actions = 'Acciones',
  ons = 'ONs',
  options = 'Opciones',
  letters = 'Letras',
  checks = 'Cheques',
  currencies = 'Monedas', // This one also applies for USA
  // USA
  actionsUsa = 'Acciones USA',
  adrs = 'ADRs',
  etfs = 'Etfs',
  mutualFunds = 'Fondos Mutuos'
}

export enum ALERT_VARIANTS {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

export enum TEXT_PILL_VARIANTS {
  white = COLORS.white,
  black = COLORS.black
}

export enum TYPOGRAPHY_COLOR_VARIANTS {
  onSurfaceText = COLORS.onSurfaceText, // ex primary
  white = COLORS.white,
  black = COLORS.black,
  primary500 = COLORS.primary500,
  primary900 = COLORS.primary900,
  grey500 = COLORS.grey500,
  grey600 = COLORS.grey600,
  grey700 = COLORS.grey700,
  success300 = COLORS.success300,
  success500 = COLORS.success500,
  danger500 = COLORS.danger500,
  violet500 = COLORS.violet500,
  info500 = COLORS.info500
}

export enum DIVIDER_ORIENTATIONS {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

// Values as number for calculating the chevron direction
export enum CHEVRON_DIRECTIONS {
  up = 0,
  right = 1,
  down = 2,
  left = 3
}

export enum DRAWER_PLACEMENTS {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left'
}

export enum SELECT_VARIANTS {
  default = 'default',
  filter = 'filter'
}

export enum FIELD_LABEL_VARIANTS {
  sm = 'sm',
  md = 'md',
  sideSm = 'sideSm',
  sideMd = 'sideMd'
}

export enum ASSET_VARIANTS {
  table = 'table',
  detail = 'detail'
}

export enum BUTTON_VARIANTS {
  primary = 'primary',
  secondary = 'secondary',
  link = 'link',
  unstyled = 'unstyled',
  outline = 'outline'
}

export enum MONEY_FORMATS {
  inline = 'inline',
  semiInline = 'semiInline',
  nonInline = 'nonInline'
}

export enum CURRENCIES {
  ars = 'AR$',
  usd = 'US$'
}

export enum ORDER_TAB_KEYS {
  buy = 'buy',
  sell = 'sell'
}

export enum ORDER_TAB_MEP_KEYS {
  buy = 'mep',
  sell = 'mep_inverso'
}

export enum HOME_TAB_KEYS {
  pesos = 'Pesos',
  dollars = 'Dólares'
}

export enum ELEMENT_IDS {
  navbar = 'navbar',
  sidebar = 'sidebar',
  drawer = 'drawer',
  investorTest = 'investorTest',
  hasDeposit = 'depositMoney',
  mainLayoutFlexContainer = 'main-layout-flex-container',
  modal = 'customModal',
  orderFlowCalendar = 'orderFlowCalendar',
  orderFlowDrawer = 'orderFlowDrawer',
  sidebarDrawer = 'sidebarDrawer',
  investHomeTable = 'investHomeTable',
  investHomeFilters = 'investHomeFilters'
}

export enum INPUT_TYPES {
  text = 'text',
  email = 'email',
  password = 'password',
  number = 'number',
  money = 'money'
}

export enum CHANGED_PASSWORD_STATES {
  success = '1',
  error = '0'
}

export enum MOVEMENTS_TYPES {
  iniciada = 'Iniciada',
  enProceso = 'En proceso',
  terminada = 'Terminada',
  cancelada = 'Cancelada'
}

export enum MONEY_TAB_KEYS {
  arsAccount = 'arsAccount',
  usdAccount = 'usdAccount'
}

export enum INSTRUMENTS_FILTER_VARIANTS {
  investmentOptions = 'investmentOptions',
  funds = 'funds'
}

export enum INVESTMENT_STATES {
  profit = 'profit',
  loss = 'loss',
  neutral = 'neutral'
}

// TODO: check if back has enums, now using BANK_ACCOUNT_STATUS - [AnS - 11/12/2023]
export enum ACCOUNT_STATUS {
  enabled = 'enabled',
  disabled = 'disabled',
  pending = 'pending'
}

export enum BANK_ACCOUNT_STATUS {
  accepted = 'aceptada',
  declined = 'baja',
  rejected = 'rechazada',
  pending = 'pendienteDeVerificacion'
}

export enum BANK_ACCOUNT_TYPE {
  savingsAccount = 'cajaAhorro',
  checkingAccount = 'cuentaCorriente'
}

export enum CALENDAR_INPUT_VARIANTS {
  default = 'default',
  filter = 'filter',
  caution = 'caution'
}

export enum PILL_BUTTONS_SWITCH_VARIANTS {
  default = 'default',
  riskLevel = 'riskLevel' // Used in Funds filters
}

export enum FUNDS_CONTENT_VARIANTS {
  grid = 'grid',
  table = 'table'
}

export enum FUNDS_RISK_LEVELS {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export enum INVESTMENTS_TERMS {
  short = 'Corto plazo',
  medium = 'Mediano plazo',
  long = 'Largo plazo'
}

export enum GLOBAL_DRAWERS {
  withdrawMoney = 'withdrawMoney',
  depositMoney = 'depositMoney',
  withdrawAccounts = 'withdrawAccounts',
  deleteAccount = 'deleteAccount',
  navigateToApp = 'navigateToApp',
  personalDataParticularPhone = 'personalDataParticularPhone',
  personalDataMobilePhone = 'personalDataMobilePhone',
  personalDataCivilStatus = 'personalDataCivilStatus',
  personalDataJob = 'personalDataJob',
  mobileMenu = 'mobileMenu',
  changePassword = 'changePassword'
}

export enum INVESTOR_TEST_STEPS {
  intro = 'intro',
  exit = 'exit',
  success = 'success',
  error = 'error',
  question = 'question'
}

export enum INVESTOR_TEST_QUESTION_TYPE {
  radio = 'radio',
  checkbox = 'checkbox',
  pills = 'pills'
}

export enum TOKEN_ERRORS {
  RefreshAccessTokenError = 'RefreshAccessTokenError'
}
export enum BAR_CHART_OPTIONS {
  CI = 'Contado Inmediato',
  h24 = '24 hs',
  h48 = '48 hs',
  h72 = '72 hs'
}

export enum ORDER_FLOW_DRAWERS {
  estimatedValues = 'estimatedValues',
  investorProfileUnmatched = 'investorProfileUnmatched',
  investorProfileExpired = 'investorProfileExpired',
  closedMarket = 'closedMarket',
  hourWarning = 'hourWarning'
}

export enum SESSION_STORAGE_KEYS {
  unsavedChanges = 'unsavedChanges'
}

export enum COUNTRY {
  arg = 'ARG',
  eeuu = 'EEUU'
}
