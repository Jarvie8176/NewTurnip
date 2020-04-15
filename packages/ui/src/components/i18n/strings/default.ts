import { TranslationStrings } from "../i18n.interface";

export const GetDefaultTranslations = (): TranslationStrings => ({
  title: "title_label",
  introMessage: "introMessage_label",
  buttons: {
    latestPriceRecords: "latestPriceRecords_label",
    historicalPriceRecords: "historicalPriceRecords_label",
    candlestickGraph: "candlestickGraph_label",
    pricePrediction: "pricePrediction_label",
    pricePredictionWIPTooltip: "pricePredictionWIPTooltip_label",
    addPriceRecords: "addPriceRecords_label",
    refresh: "refresh_label",
    profileSettings: "profileSettings_label",
    login: "login_label",
    logout: "logout_label",
    register: "register_label",
  },
  priceRecordsTable: {
    columns: {
      playerName: "playerName_label",
      islandName: "islandName_label",
      contactInfo: "contactInfo_label",
      price: "price_label",
      localTimeWhenRecorded: "localTimeWhenRecorded_label",
      validUntil: "validUntil_label",
    },
    expired: "expired_label",
  },
  candlestickGraph: {
    myPriceTag: "myPriceTag_label",
    yAxisTitle: "Price_label",
  },
  addPriceRecordForm: {
    playerName: "playerName_label",
    islandName: "islandName_label",
    fcCode: "fcCode_label",
    price: "price_label",
    recordTime: "recordTime_label",
    inputFieldPlaceholder: `Please update in "settings"`,
  },
  profilesForm: {
    playerName: "playerName_label",
    islandName: "islandName_label",
    currentTime: "currentTime_label",
    fcCode: "fcCode_label",
    dodoCode: "dodoCode_label",
  },
});
