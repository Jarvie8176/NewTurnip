export interface TranslationStrings {
  title: string;
  introMessage: string;
  buttons: {
    latestPriceRecords: string;
    historicalPriceRecords: string;
    candlestickGraph: string;
    pricePrediction: string;
    pricePredictionWIPTooltip: string;
    addPriceRecords: string;
    refresh: string;
    profileSettings: string;
    login: string;
    logout: string;
    register: string;
  };
  priceRecordsTable: {
    columns: {
      playerName: string;
      islandName: string;
      contactInfo: string;
      price: string;
      localTimeWhenRecorded: string;
      validUntil: string;
    };
    expired: string;
  };
  candlestickGraph: {
    myPriceTag: string;
    yAxisTitle: string;
  };
  addPriceRecordForm: {
    playerName: string;
    islandName: string;
    fcCode: string;
    price: string;
    recordTime: string;
    inputFieldPlaceholder: string;
  };
  profilesForm: {
    playerName: string;
    islandName: string;
    currentTime: string;
    fcCode: string;
    dodoCode: string;
  };
}
