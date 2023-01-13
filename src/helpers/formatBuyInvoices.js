export const formatBuyInvoices = ( data ) => {
    if ( data.oils ) {
        return data.oils;
    }else if ( data.fuels ) {
        return data.fuels
    }else{
        return []
    }
}